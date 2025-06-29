# 🛍️ Storix — Ecommerce Admin Platform

**Storix** is a powerful and extensible admin dashboard that enables users to create and manage multiple ecommerce stores. It provides robust tools for managing products, categories, billboards, sizes, colors, and detailed analytics on sales and orders. It also includes a complete checkout system and exposes APIs that can be integrated with custom storefronts.

> 🚀 Coming Soon: AI-powered inventory optimization, sales prediction, and deep analytics for smarter ecommerce decisions.

---

## ✨ Features

- 🔧 Multi-store support
- 🧩 Product, category, size, color, and billboard management
- 🛒 Checkout system integration
- 📊 Detailed analytics for orders and sales
- 📦 Cloudinary-based image uploads
- 🔐 Secure authentication with Clerk
- 🔗 Public APIs to power custom storefronts
- 🤖 Planned AI features: inventory optimization, sales prediction

---

## ⚙️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **UI**: [ShadCN UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)

---

## 🚀 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/sk226/storix-admin.git
cd storix-admin
```
 
### Install Dependencies

```bash
npm install
```

### 📁 Set Up Environment Variables
-- Create a .env file in the root directory and add the following:


#### Clerk
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
- CLERK_SECRET_KEY=your-clerk-secret-key
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
- NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home
- NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/home

#### Database
- DATABASE_URL=postgresql://user:password@localhost:5432/storix

#### Cloudinary
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

## 🛠️ Setup the Database
- If this is your first time:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 🏁 Start the Development Server

```bash

npm run dev
```

- Visit http://localhost:3000 to start using Storix.

# 📈 Roadmap (Upcoming Features)
 - 🧠 AI-driven sales prediction and demand forecasting

 - 📦 Smart inventory management

 - 🧾 Enhanced reporting & downloadable insights

 - 🌐 Multilingual support

 - 🔌 3rd-party integrations (shipping, taxes, etc.)

## 🤝 Contributing
- Have ideas or want to improve the platform? Contributions are welcome! Please open issues or submit PRs.

# 🛡️ License
- MIT License © 2025 Sahil Kansal


