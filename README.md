# 🛍️ Storix — Intelligent Ecommerce Admin Platform

**Storix** is a powerful, AI-augmented admin dashboard built for modern ecommerce. It enables store owners to manage inventory, process orders (POS and online), and preview live storefronts instantly. Built with extensibility and scalability in mind, Storix empowers retail businesses with real-time insights, public APIs, and automation to streamline inventory management and last-mile delivery.

---

## ✨ Features

### ✅ Core Features

- 🏪 **Multi-store Support** – Manage multiple stores from a single dashboard
- 📦 **Product Management** – Add/edit/delete products with variants (size, color, image, quantity)
- 🗂️ **Category & Billboard Management** – Organize and promote products effectively
- 🛍️ **POS Order Creation** – In-store order placement with tax calculation and payment status
- 📄 **Invoice Generation** – Auto-generate downloadable PDF invoices with product images
- 🔁 **Inventory Sync** – Automatically decrement stock during order placement
- 📤 **Cloudinary Image Uploads** – Upload and preview product and billboard images
- 🔐 **Secure Auth** – Powered by Clerk for robust authentication
- 🧾 **Admin-Only Access** – Per-store access control based on user ID
- 📊 **Sales & Orders Analytics** – Track revenue, order trends, and product performance

### 🧠 AI Features (Simulated)

- 📈 **AI Demand Forecasting**
  - Predict demand based on seasonality, weather, events, and trends
  - Adjustable forecast range: 7, 30, or 90 days
  - Confidence intervals to assess prediction certainty

- 🚨 **Risk Detection**
  - Detect and warn about stockouts or overstock risks
  - Color-coded warnings and AI-generated action recommendations

- 📚 **Product Insights**
  - AI-generated text summaries for demand drivers per product
  - Lead time + current stock visibility for smarter restocking

- 📊 **Interactive Visualization**
  - Forecast trends (line charts) and impact factors (bar charts)
  - Responsive UI built for mobile and desktop

### 🌐 API & Dev Tools

- 🔗 **Public Storefront API**
  - Every store has REST APIs to fetch products, categories, and banners
  - Build your own storefront or integrate with mobile apps

- 🐳 **Dynamic Storefront Previews**
  - On-demand Dockerized Next.js storefronts via `Preview` button
  - Automatically spins up container and maps to URL like `/preview/:storeId`
  - Preview auto-shuts down after 10 minutes

---

## ⚙️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [App Router API Routes], [Prisma ORM](https://www.prisma.io/), PostgreSQL
- **UI**: [TailwindCSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Auth**: [Clerk.dev](https://clerk.dev/)
- **PDF & Invoice**: `puppeteer`, dynamic HTML templates
- **AI Simulation**: Fake data + chart rendering (based on seasonal patterns & event mock data)
- **Containerization**: Docker + dynamic port allocation

---

## 🏁 Getting Started

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

---

## 🧠 AI Forecasting Component Demo

You can preview AI-powered dashboards under the `/demand-forecast` route. Forecasting simulates:

- 🌤️ **Weather/event demand impact**
- 🎄 **Holiday/event spikes** (Black Friday, Christmas, etc.)
- 📅 **Weekend vs. weekday trends**
- 🚨 **Stock risk detection & reorder recommendations**

---

## 🔌 Public Store API

Each store exposes REST APIs that can be used to power custom ecommerce storefronts:

- `GET /api/public/:storeId/products`
- `GET /api/public/:storeId/categories`
- `GET /api/public/:storeId/billboards`

---

## 📦 Dynamic Storefront Previews

Preview your store in real-time via containerized deployments:

1. Click the **Preview** button in the store settings or admin dashboard.
2. A backend API spins up a **Docker container** with your store and connects it to your store's API (`NEXT_PUBLIC_API_URL`).
3. A unique preview URL like `http://localhost:PORT/preview/:storeName` is generated.
4. 🔒 Auto shutdown after **10 minutes** to save resources.

---

## 📈 Roadmap

- 🤖 Real AI integration with **OpenAI**, **Vertex AI**, or **HuggingFace**
- 📱 Mobile **POS companion app**
- 🧾 **GST-compliant** invoice formatting
- 🗣️ **Multilingual** admin panel and storefronts
- 📦 Warehouse & **restock API automation**
- 📬 Real-time notifications via **email/SMS**

---

## 🤝 Contributing

Got ideas? Want to contribute? We'd love your input! Open an issue or submit a PR to help improve **Storix**.

---

## 🛡️ License

MIT License © 2025 [Sahil Kansal](https://github.com/sk226)


