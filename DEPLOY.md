# Guide de déploiement Vercel — KR Global Solutions LTD

## Prérequis

- Compte [Vercel](https://vercel.com) connecté au repo GitHub
- Compte [Stripe](https://dashboard.stripe.com) en mode live
- Compte [Resend](https://resend.com) avec domaine `krglobalsolutionsltd.com` vérifié
- Projet [Supabase](https://supabase.com) configuré avec les migrations appliquées

---

## 1. Variables d'environnement sur Vercel

Dans **Vercel → ton projet → Settings → Environment Variables**, configurer :

| Variable | Valeur | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Dashboard Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Voir section Webhook ci-dessous |
| `RESEND_API_KEY` | `re_...` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | `KR Global Solutions LTD <orders@krglobalsolutionsltd.com>` | Domaine doit être vérifié dans Resend |
| `INTERNAL_NOTIFICATION_EMAIL` | `orders@krglobalsolutionsltd.com` | Email interne pour les nouvelles commandes |
| `CUSTOMER_SUPPORT_EMAIL` | `support@krglobalsolutionsltd.com` | Affiché dans les emails clients |
| `CUSTOMER_SUPPORT_WHATSAPP` | `https://wa.me/33743561304?text=...` | Lien WhatsApp Business |
| `CUSTOMER_SUPPORT_CALENDLY` | `https://calendly.com/krglobalsolutionsltd/30-minute-meeting-clone` | Lien prise de rendez-vous |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Settings → API → service_role (**ne jamais exposer**) |
| `NEXT_PUBLIC_APP_URL` | `https://ton-domaine.com` | Sans slash final |
| `ADMIN_SECRET` | (générer ci-dessous) | Protège `/api/admin/send-delivery` |

**Générer un ADMIN_SECRET sécurisé :**
```bash
openssl rand -hex 32
```

---

## 2. Configurer le webhook Stripe (production)

1. Aller sur [dashboard.stripe.com](https://dashboard.stripe.com) → **Developers → Webhooks**
2. Cliquer **Add endpoint**
3. URL : `https://ton-domaine.com/api/stripe/webhook`
4. Événements à écouter :
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
5. Cliquer **Add endpoint**
6. Copier le **Signing secret** (`whsec_...`) → le coller dans `STRIPE_WEBHOOK_SECRET` sur Vercel

---

## 3. Migrations Supabase

Les migrations suivantes doivent être appliquées avant le premier déploiement.

### Séquence order_number (si pas encore appliquée)
```sql
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

CREATE OR REPLACE FUNCTION nextval_order_number_seq()
RETURNS bigint
LANGUAGE sql
AS $$
  SELECT nextval('order_number_seq');
$$;
```

### Colonne delivery_status (si pas encore appliquée)
```sql
ALTER TABLE order_records
ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'pending';
```

Vérifier dans **Supabase → SQL Editor** que ces éléments existent.

---

## 4. Vérifications avant déploiement

### Build local sans erreur
```bash
npm run type-check
npm run lint
npm run build
```

Le build peut afficher des warnings sur les pages admin (elles utilisent Supabase côté serveur et ne peuvent pas être pre-rendues statiquement) — c'est normal. S'assurer qu'il n'y a aucune **erreur**.

### Checklist pré-déploiement
- [ ] Toutes les variables d'environnement configurées sur Vercel
- [ ] Webhook Stripe pointant vers l'URL de production
- [ ] Domaine email `krglobalsolutionsltd.com` vérifié dans Resend
- [ ] Migrations Supabase appliquées
- [ ] `NEXT_PUBLIC_APP_URL` = URL de production exacte (sans slash final)

---

## 5. Déploiement

### Via GitHub (recommandé)
```bash
git push origin main
```
Vercel détecte automatiquement le push et lance un déploiement.

### Manuellement via CLI
```bash
npx vercel --prod
```

---

## 6. Vérifications post-déploiement

Après le déploiement, tester dans l'ordre :

1. **Page d'accueil** : `https://ton-domaine.com` s'affiche correctement
2. **PDFs publics** :
   - `https://ton-domaine.com/api/pdfs/guide-client` → télécharge un PDF
   - `https://ton-domaine.com/api/pdfs/grille-tarifaire` → télécharge un PDF
3. **Formulaire de contact** :
   ```bash
   curl -X POST https://ton-domaine.com/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"ton@email.com","message":"Test de déploiement."}'
   ```
4. **Paiement Stripe** : faire un paiement test avec la carte `4242 4242 4242 4242`
5. **Email de livraison** :
   ```bash
   curl -X POST https://ton-domaine.com/api/admin/send-delivery \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TON_ADMIN_SECRET" \
     -d '{"order_number":"KR-TEST","customer_email":"ton@email.com","customer_name":"Test","site_url":"https://example.com"}'
   ```

---

## 7. Domaine personnalisé

Dans **Vercel → ton projet → Settings → Domains** :
1. Ajouter ton domaine
2. Configurer les DNS selon les instructions Vercel
3. Mettre à jour `NEXT_PUBLIC_APP_URL` avec le domaine final
4. Mettre à jour l'URL du webhook Stripe avec le domaine final

---

## Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| Webhook Stripe 400 | Mauvais `STRIPE_WEBHOOK_SECRET` | Recopier le signing secret depuis le dashboard |
| Email non reçu | Domaine non vérifié dans Resend | Vérifier le domaine dans resend.com → Domains |
| Build échoue | Variable d'env manquante | Vérifier que toutes les vars sont dans Vercel |
| `send-delivery` → 401 | Mauvais `ADMIN_SECRET` | Vérifier la valeur dans Vercel et dans le header `Authorization: Bearer ...` |
| Supabase erreur | `SUPABASE_SERVICE_ROLE_KEY` invalide | Régénérer depuis Supabase → Settings → API |
