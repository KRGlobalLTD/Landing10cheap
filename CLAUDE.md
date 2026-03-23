# CLAUDE.md — Instructions de développement

## 🚨 Règles absolues

### Workflow de code
- **Toujours coder directement dans les fichiers du projet** — jamais via git worktrees, jamais dans des branches isolées
- Les modifications doivent être visibles **immédiatement sur le localhost** (hot reload Next.js)
- Ne jamais créer de fichiers temporaires ou de copies de travail
- Modifier directement les fichiers source dans `src/` (ou `app/` selon la structure)

### Périmètre actuel
- **Frontend uniquement** — ne pas toucher au backend, aux routes API, à Supabase, aux variables d'environnement serveur, ou à la base de données
- Ne pas modifier : `supabase/`, `.env`, fichiers de config serveur, middlewares d'auth
- Focus exclusif : composants UI, pages, layouts, styles, animations

---

## 🧩 Composants UI — shadcn/ui + 21st.dev

### Source obligatoire
Tous les composants UI viennent de **deux sources uniquement**, dans cet ordre de priorité :

1. **[21st.dev](https://21st.dev/home)** — composants shadcn avancés, modernes et prêts à l'emploi
   - Chercher d'abord sur 21st.dev ce qui correspond au besoin
   - Copier le code du composant tel quel, l'adapter au contexte du projet
   - Respecter la DA du site lors de l'adaptation (couleurs, typo, espacements)

2. **shadcn/ui** (base) — pour les primitives non disponibles sur 21st.dev
   - Installer via `npx shadcn@latest add [component]`
   - Ne jamais réinventer un composant qui existe déjà dans shadcn

### Règles d'utilisation des composants
- **Ne jamais créer un composant from scratch** si un équivalent existe sur 21st.dev ou shadcn
- Adapter systématiquement le composant récupéré : tokens de couleur, typographie, espacement — en accord avec la DA
- Supprimer les props/styles inutiles pour garder le code propre
- Toujours vérifier que le composant est bien importé depuis le bon chemin (`@/components/ui/...`)

---

## 🎨 Direction artistique (DA)

Avant d'intégrer ou d'adapter un composant, vérifier et respecter :

- **Palette de couleurs** : utiliser uniquement les CSS variables définies dans `globals.css` (`--primary`, `--background`, `--foreground`, etc.)
- **Typographie** : respecter les fonts définies dans le projet, ne pas introduire de nouvelles fonts sans validation
- **Border radius** : cohérent avec le token `--radius` du projet
- **Espacements** : utiliser les classes Tailwind standards (`p-4`, `gap-6`, etc.), pas de valeurs arbitraires sauf exception justifiée
- **Ton visuel** : identifier si le site est plutôt minimal/épuré, éditorial, bold/contrasté — et rester dans ce registre pour tout nouveau composant

Si la DA n'est pas encore définie, demander avant de commencer.

---

## 📱 Responsive — règle non négociable

**Tout ce qui est codé doit être responsive.** Sans exception.

### Breakpoints Tailwind à respecter
```
mobile     : base (pas de préfixe) — < 640px
tablet     : sm: — 640px+
laptop     : md: — 768px+
desktop    : lg: — 1024px+
wide       : xl: — 1280px+
```

### Checklist responsive obligatoire
- [ ] Layout mobile-first (commencer par le mobile, ajouter les breakpoints au-dessus)
- [ ] Navigation : hamburger menu sur mobile, nav complète sur desktop
- [ ] Grilles : `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3` selon le contenu
- [ ] Typographie : taille de font adaptée par breakpoint (`text-2xl md:text-4xl lg:text-5xl`)
- [ ] Images : `w-full`, `object-cover`, proportions cohérentes sur tous les écrans
- [ ] Espacements : padding/margin réduits sur mobile (`p-4 md:p-8 lg:p-12`)
- [ ] Touches/boutons : minimum `44px` de zone cliquable sur mobile
- [ ] Pas de scroll horizontal sur aucun breakpoint

---

## 📁 Structure des fichiers

```
src/
├── app/                  # Pages Next.js (App Router)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # Composants shadcn/ui (auto-générés)
│   └── [feature]/        # Composants métier organisés par feature
├── lib/
│   └── utils.ts          # cn(), helpers
└── styles/
    └── globals.css       # Tokens CSS, variables, styles globaux
```

### Conventions de nommage
- Composants : `PascalCase.tsx`
- Hooks : `useNomDuHook.ts`
- Utils : `camelCase.ts`
- Pages : `page.tsx` (App Router convention)

---

## ✅ Checklist avant chaque modification

1. Le fichier ciblé est bien un fichier **frontend** (pas de logique serveur)
2. Le composant utilisé vient de **21st.dev ou shadcn** (pas from scratch)
3. Le composant respecte la **DA du projet** (couleurs, typo, radius)
4. Le code est **responsive** (mobile-first, tous les breakpoints couverts)
5. Les modifications sont dans les **fichiers source directs** (visible sur localhost)
6. Aucune import inutile, aucun `console.log` oublié, code propre

---

## ❌ Ce qu'il ne faut jamais faire

- Coder dans une branche worktree ou un répertoire isolé
- Créer des composants UI from scratch sans vérifier 21st.dev/shadcn d'abord
- Introduire une nouvelle librairie UI (MUI, Chakra, Mantine, etc.)
- Modifier des fichiers backend/API/Supabase
- Laisser du code non-responsive
- Utiliser des valeurs de style hardcodées qui cassent la cohérence de la DA (`color: #fff` au lieu de `text-foreground`)
- Créer des styles inline complexes — tout passe par Tailwind + CSS variables