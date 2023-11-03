This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Setup Database
Edit .env file to setup database address for prisma. 
```bash
DATABASE_URL="postgresql://{username}:{user_password}@{ip}:{port}/{db_name}?schema=public"
```

Pull database schema
```bash
npx prisma db pull
```

For details, please refer to the instruction in [prisma.io](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql)

If you want to use more than one database, please refer to [blog](https://www.kenaqshal.com/blog/connecting-to-multiple-databases-with-node-js-and-prisma#step-3:-defining-the-second-database-connection)