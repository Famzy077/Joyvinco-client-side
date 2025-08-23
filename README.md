# 🛍️ 💻📱 Joyvinco

**Joyvinco** is a modern, responsive e-commerce platform focused on delivering tech gadgets and accessories with a clean and intuitive shopping experience.

🔗 **Live Demo**: [https://joyvinco.com.ng](https://joyvinco.com.ng)

---

## ✨ Features

- 🏠 Home page showcasing trending and featured gadgets  
- 🔍 Real-time product search with suggestions  
- 📂 Product categories for easy filtering  
- ❤️ Wishlist functionality using `localStorage`  
- 👤 Account management page (with planned auth integration)  
- 🛒 Multi-step checkout & CRUD-ready cart (coming soon)  
- 📱 Responsive design for mobile and desktop  
- 🌐 SEO-friendly routing with Next.js  

---

## ⚙️ Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| **Next.js**    | React framework for SSR & routing |
| **React**      | UI component structure           |
| **JavaScript** | Strongly typed frontend logic    |
| **Tailwind CSS** | Utility-first responsive design |
| **Lucide Icons** | Icon set used for UI elements   |
| **Node.js (Planned)** | Backend API integration (auth, admin, etc.) |
| **MongoDB (Planned)** | Product & order database backend |
| **Vercel**     | Deployment platform              |

---

## 🚧 In Progress

- 🔐 Google authentication and email verification  
- 🧾 Order placement & payment integration  
- 🛒 Shopping cart with local + backend syncing  
- 🧩 Admin dashboard for inventory control  
- 📨 Newsletter & email marketing integration  

---

## 📁 Project Structure

```bash
📦 Joyvinco/
├── public/               # Images and static assets
├── src/
│   ├── app/              # Pages & routes (Next.js)
│   ├── components/       # Reusable UI components (Navbar, Header, etc.)
│   ├── data/             # Local JSON files for mock products
│   ├── styles/           # Tailwind CSS and global styles
│   └── hooks/            # Utilities (API, custom hooks, etc.)
├── package.json
└── README.md
