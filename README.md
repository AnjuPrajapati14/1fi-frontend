
---

## 💻 **frontend/README.md**

```md
# 1Fi EMI Products Frontend

A React-based frontend for the **1Fi EMI Products Web Application**, displaying smartphones, product variants, and EMI plan options in an interactive and responsive UI.

---

## 🎨 Features

- Dynamic product listings from backend API  
- Product detail pages with variant and EMI selection  
- Real-time UI updates with React state  
- Responsive design (mobile + desktop)  
- Axios for REST API integration  
- TailwindCSS for modern UI styling

---

## 🛠️ Tech Stack

- **Framework**: React 18 (TypeScript)  
- **Routing**: React Router DOM  
- **Styling**: Tailwind CSS  
- **HTTP**: Axios  
- **Build Tool**: Vite or CRA (depending on setup)

---

## 📁 Folder Structure

frontend/
├── src/
│ ├── components/
│ │ ├── ProductCard.tsx
│ │ ├── EMIPlanCard.tsx
│ │ ├── LoadingSpinner.tsx
│ │ └── ErrorMessage.tsx
│ ├── pages/
│ │ ├── HomePage.tsx
│ │ └── ProductDetailPage.tsx
│ ├── services/
│ │ └── api.ts
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ ├── index.tsx
│ └── index.css
├── public/
├── tailwind.config.js
├── postcss.config.js
└── package.json


---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies
```bash
cd frontend
npm install

2️⃣ Set Backend API URL

If using environment variables:

REACT_APP_API_URL=http://localhost:5000/api

3️⃣ Start the Frontend
npm start

4️⃣ Build for Production
npm run build

🔗 API Integration

The frontend communicates with:

Backend URL: http://localhost:5000/api


Endpoints:

/products

/products/:slug

/products/:slug/variants

/products/:slug/emi-plans

All requests are handled via src/services/api.ts.

📱 UI Components Overview
Component	Description
ProductCard	Displays product info, price, colors, EMI summary
EMIPlanCard	Interactive plan selection with tenure, interest, cashback
LoadingSpinner	Shown during data fetching
ErrorMessage	Handles API and network errors
HomePage	Lists all available products
ProductDetailPage	Detailed product + EMI plan view
🧪 Commands
Command	Description
npm start	Start dev server
npm run build	Build for production
npm test	Run tests (if configured)
🌍 Deployment (Vercel / Netlify)

Run npm run build

Deploy /build folder

Set environment variable:

REACT_APP_API_URL=https://your-backend-url/api

🧩 Example .env
REACT_APP_API_URL=http://localhost:5000/api
