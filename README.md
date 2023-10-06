This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



静止画はsupabase(1G)/firabase storage(5G)
動画はcloudflare R2 (10G)
でいけるかな






## planetScale

```bash
$ brew install planetscale/tap/pscale
$ brew install mysql-client
$ pscale auth login
```

PlanetScale CLI を使って、ローカルマシンの 3309ポート(任意) に PlanetSclae への接続をプロキシし、ローカルマシンの 3309番ポートから PlanetScale に接続できるようにします
```bash
$ pscale connect {DB_NAME} main --port 3309
```


next/me-yo/prisma/schema.prisma を編集してmodel作成
その後、以下を実行してPrisma のスキーマを PlanetScale に反映します

```bash
$ npx prisma db push
```


psclae shell コマンドでPlanetScale上で動作中のデータベースにアクセスし、スキーマが反映されたのを確認します

```bash
$ pscale shell {DB_NAME} main
```