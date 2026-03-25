# KR Global Solutions LTD — Site vitrine + tunnel de commande

Site Next.js complet pour la vente d'un service de création de site web à 9,99€.
Tunnel complet : formulaire → paiement Stripe → emails automatiques → livraison manuelle.

---

## 1. Ce que fait ce projet

- **Landing page** de vente avec formulaire multi-étapes
- **Paiement sécurisé** via Stripe Checkout (9,99€)
- **Email automatique n°1** après paiement : confirmation au client + notification interne
- **Email manuel n°2** lors de la livraison : email client avec PDFs joints (guide + grille tarifaire)
- **Interface admin** pour consulter les commandes et briefs (`/admin/briefs`)
- **Formulaire de contact** avec anti-spam (honeypot)
- **Pages légales** : CGV, politique de confidentialité, mentions légales, politique de remboursement

---

## 2. Installation en local

```bash
git clone <url-du-repo>
cd Landing10cheap-main
npm install
cp .env.example .env.local
# Remplir .env.local avec tes valeurs (voir section ci-dessous)
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

---

## 3. Variables d'environnement

Copier `.env.example` en `.env.local` et remplir chaque valeur :

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_test_...` en dev, `sk_live_...` en prod) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature webhook Stripe (`whsec_...`) |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails |
| `RESEND_FROM_EMAIL` | Adresse expéditeur (doit utiliser un domaine vérifié dans Resend) |
| `INTERNAL_NOTIFICATION_EMAIL` | Email interne pour recevoir les nouvelles commandes |
| `CUSTOMER_SUPPORT_EMAIL` | Email support affiché aux clients |
| `CUSTOMER_SUPPORT_WHATSAPP` | Lien WhatsApp Business |
| `CUSTOMER_SUPPORT_CALENDLY` | Lien Calendly pour les rendez-vous |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service_role Supabase (**jamais côté client**) |
| `NEXT_PUBLIC_APP_URL` | URL publique du site (`http://localhost:3000` en dev) |
| `ADMIN_SECRET` | Secret pour protéger les endpoints admin |

---

## 4. Comment tester

Voir [TESTING.md](./TESTING.md) pour le guide complet.

**Résumé rapide :**

```bash
# 1. Démarrer le site
npm run dev

# 2. Écouter les webhooks Stripe (dans un autre terminal)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 3. Paiement test : carte 4242 4242 4242 4242

# 4. Formulaire de contact
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Message de test."}'
```

---

## 5. Envoyer l'email de livraison

Quand un site client est terminé, déclencher manuellement l'email de livraison :

```bash
curl -X POST https://ton-domaine.com/api/admin/send-delivery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TON_ADMIN_SECRET" \
  -d '{
    "order_number": "KR-2026-0001",
    "customer_email": "client@exemple.com",
    "customer_name": "Marie Martin",
    "site_url": "https://marie-martin.vercel.app"
  }'
```

L'email est envoyé avec 2 PDFs joints :
- **Guide client** — comment gérer et faire évoluer son site
- **Grille tarifaire** — tarifs pour les évolutions futures

Le champ `delivery_status` de la commande passe automatiquement à `'delivered'` dans Supabase.

---

## 6. Architecture des fichiers clés

```
app/
├── api/
│   ├── stripe/
│   │   ├── checkout/route.ts      # Crée la session Stripe Checkout
│   │   └── webhook/route.ts       # Reçoit les événements Stripe (paiement, expiration)
│   ├── admin/
│   │   └── send-delivery/route.ts # Déclenche l'email de livraison (protégé par ADMIN_SECRET)
│   ├── contact/route.ts           # Formulaire de contact (honeypot + Zod)
│   └── pdfs/
│       ├── guide-client/          # Sert le PDF guide client
│       └── grille-tarifaire/      # Sert le PDF grille tarifaire
├── admin/briefs/                  # Interface admin (liste des commandes/briefs)
├── formulaire/                    # Formulaire multi-étapes
└── succes/                        # Page de confirmation après paiement

lib/
├── stripe.ts                      # Client Stripe (singleton)
├── supabase.ts                    # Client Supabase server-side (singleton)
├── orders.ts                      # Repository orders_records (sauvegarde, idempotence)
├── briefs.ts                      # Repository briefs (Supabase)
├── email/
│   ├── resend.ts                  # Client Resend (HTTP API, avec pièces jointes)
│   ├── send-customer-order-confirmation.ts   # Email 1 client
│   ├── send-internal-order-email.ts          # Email 1 interne
│   ├── send-customer-delivery-email.ts       # Email 2 livraison
│   └── templates/                 # Templates HTML des emails
├── pdf/
│   └── documents/
│       ├── guide-client.ts        # PDF "Guide client" (pdf-lib)
│       └── grille-tarifaire.ts    # PDF "Grille tarifaire" (pdf-lib)
├── utils/
│   └── order-number.ts            # Génération des numéros de commande (KR-YYYY-NNNN)
└── monitoring/sentry.ts           # Capture d'erreurs Sentry

components/
├── sections/                      # Sections de la landing page
├── form/                          # Composants du formulaire multi-étapes
├── admin/                         # Interface admin
└── ui/                            # Composants UI (shadcn/ui)
```

### Flux de paiement

```
Client remplit formulaire
    ↓
POST /api/stripe/checkout  →  crée session Stripe  →  redirige vers Stripe
    ↓
Client paie sur Stripe
    ↓
Stripe envoie checkout.session.completed
    ↓
POST /api/stripe/webhook
    ├── Sauvegarde order_records (idempotent)
    ├── Génère numéro de commande KR-YYYY-NNNN
    ├── Met à jour le brief (paid)
    ├── Envoie email interne (notification)
    └── Envoie email client (confirmation + prochaines étapes)
    ↓
[Manuel] Site réalisé par l'équipe
    ↓
POST /api/admin/send-delivery
    ├── Envoie email de livraison avec 2 PDFs
    └── Met delivery_status = 'delivered'
```

---

## 7. Scripts disponibles

```bash
npm run dev          # Serveur de développement (hot reload)
npm run build        # Build de production
npm run start        # Démarrer en mode production
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

---

## Déploiement

Voir [DEPLOY.md](./DEPLOY.md) pour le guide complet de déploiement sur Vercel.
