# Guide de test — KR Global Solutions LTD

## 1. Tester le paiement Stripe (mode test)

### Prérequis
- Avoir une clé Stripe **test** (`sk_test_...`) dans `.env.local`
- Stripe CLI installé : `npm install -g stripe` ou via [docs Stripe](https://stripe.com/docs/stripe-cli)

### Étapes

**Terminal 1 — démarrer le site**
```bash
npm run dev
```

**Terminal 2 — écouter les webhooks**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copier le `whsec_...` affiché et le mettre dans `STRIPE_WEBHOOK_SECRET` de `.env.local`.

**Déclencher un paiement test**
1. Ouvrir `http://localhost:3000`
2. Cliquer sur "Commander" → remplir le formulaire
3. Sur la page Stripe Checkout, utiliser la carte test : **4242 4242 4242 4242**
   - Date : n'importe quelle date future (ex. `12/26`)
   - CVC : n'importe quels 3 chiffres
   - ZIP : n'importe quels 5 chiffres

**Vérifications après paiement**
- [ ] Redirection vers `/succes`
- [ ] Dans le terminal Stripe CLI : `checkout.session.completed` reçu avec status 200
- [ ] Dans Supabase → table `order_records` : une ligne avec `status = 'paid'` et `order_number = 'KR-YYYY-NNNN'`
- [ ] Email 1 interne reçu sur `orders@krglobalsolutionsltd.com`
- [ ] Email 1 client reçu sur l'email de test saisi

### Tester un paiement refusé
Utiliser la carte **4000 0000 0000 0002** pour simuler un refus.

### Tester l'expiration de session
```bash
stripe trigger checkout.session.expired
```

---

## 2. Tester le formulaire de contact

### Via curl
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+33 6 12 34 56 78",
    "message": "Bonjour, je voudrais en savoir plus sur vos services.",
    "source": "site web"
  }'
```

**Réponse attendue**
```json
{ "success": true }
```

**Vérifications**
- [ ] Email de notification reçu sur `INTERNAL_NOTIFICATION_EMAIL` (avec reply-to = jean.dupont@example.com)
- [ ] Email de confirmation reçu sur jean.dupont@example.com

### Tester le honeypot anti-spam
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bot",
    "email": "bot@spam.com",
    "message": "Spam message here.",
    "website": "http://spam.com"
  }'
```
**Réponse attendue** : `{ "success": true }` (rejet silencieux, aucun email envoyé)

### Tester une validation invalide
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "A", "email": "not-an-email", "message": "trop court"}'
```
**Réponse attendue** : status 400 avec les détails des erreurs de validation.

---

## 3. Déclencher l'email de livraison (Email 2)

L'email de livraison est envoyé manuellement via `POST /api/admin/send-delivery`.

### Commande curl complète

```bash
curl -X POST https://TON_DOMAINE.com/api/admin/send-delivery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TON_ADMIN_SECRET" \
  -d '{
    "order_number": "KR-2026-0001",
    "customer_email": "client@exemple.com",
    "customer_name": "Marie Martin",
    "site_url": "https://marie-martin-coiffure.vercel.app"
  }'
```

Remplacer :
- `TON_DOMAINE.com` par l'URL de production (ou `localhost:3000` en local)
- `TON_ADMIN_SECRET` par la valeur de `ADMIN_SECRET` dans `.env.local`

### Réponse attendue
```json
{
  "success": true,
  "order_number": "KR-2026-0001",
  "customer_email": "client@exemple.com",
  "attachments_count": 2
}
```

**Vérifications**
- [ ] Email reçu avec objet "Votre site est prêt — commande KR-2026-0001"
- [ ] 2 pièces jointes présentes : `guide-client-kr-global-solutions.pdf` et `grille-tarifaire-evolutions-site.pdf`
- [ ] Bouton WhatsApp et bouton Calendly cliquables dans l'email
- [ ] Dans Supabase → `order_records` : `delivery_status = 'delivered'` pour cette commande

### Test en local (sans HTTPS)
```bash
curl -X POST http://localhost:3000/api/admin/send-delivery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TON_ADMIN_SECRET" \
  -d '{
    "order_number": "KR-2026-TEST",
    "customer_email": "TON_EMAIL@test.com",
    "customer_name": "Test Client",
    "site_url": "https://example.com"
  }'
```

---

## 4. Vérifier Supabase

### Accéder à Supabase
- Aller sur [supabase.com](https://supabase.com) → ton projet → **Table Editor**

### Après un paiement
Dans la table `order_records` :
- [ ] Une nouvelle ligne apparaît
- [ ] `status = 'paid'`
- [ ] `order_number = 'KR-2026-XXXX'` (séquentiel)
- [ ] `customer_email` rempli
- [ ] `paid_at` rempli (date/heure du paiement)
- [ ] `notifications` contient les clés `internalOrderEmail` et `customerOrderConfirmationEmail` après envoi des emails

### Après l'email de livraison
Dans la table `order_records` :
- [ ] `delivery_status = 'delivered'` pour la commande concernée

### Requêtes SQL utiles (via Supabase SQL Editor)
```sql
-- Dernières commandes payées
SELECT order_number, customer_email, business_name, paid_at, delivery_status
FROM order_records
WHERE status = 'paid'
ORDER BY paid_at DESC
LIMIT 20;

-- Commandes livrées
SELECT order_number, customer_email, delivery_status, paid_at
FROM order_records
WHERE delivery_status = 'delivered'
ORDER BY paid_at DESC;

-- Emails envoyés (notifications)
SELECT order_number, customer_email, notifications
FROM order_records
WHERE status = 'paid'
ORDER BY paid_at DESC;
```
