This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Formulaire contact → ton email

Le overlay « Prendre rendez-vous » envoie un `POST` vers `/api/contact`, qui transmet le message via [Resend](https://resend.com).

1. Compte Resend → **API Keys** → copie la clé `re_…`.
2. **Domains** → ajoute `akno.fr` et configure les enregistrements DNS proposés (SPF / DKIM).
3. Sur **Vercel** → projet → **Settings → Environment Variables** (Production) :
   - `RESEND_API_KEY` = ta clé
   - `CONTACT_TO_EMAIL` = l’adresse qui **reçoit** les messages (ex. ton Gmail ou `hello@akno.fr`)
   - `CONTACT_FROM_EMAIL` = expéditeur affiché (ex. `AKNO Contact <hello@akno.fr>`) — doit être un domaine vérifié chez Resend
4. Redéploie, puis teste depuis le site en prod.

En local : copie `.env.example` vers `.env.local` et remplis les mêmes variables.

Sans `RESEND_API_KEY`, le formulaire bascule sur un lien `mailto:` (secours).
