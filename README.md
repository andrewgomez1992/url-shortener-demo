# 🔪 URL Shortener Demo

This project is a full-stack demo of the `@the-node-forge/url-shortener` npm package, showcasing:

- A frontend UI for shortening and resolving URLs
- A backend Express API powered by Redis (via Upstash)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-name/url-shortener-demo.git
cd url-shortener-demo
```

### 2. Setup Environment

#### Backend Environment

Go to the backend folder and copy the env file:

```bash
cd url-demo-api
cp .env.example .env
```

Then fill out the values from your Redis dashboard:

```dotenv
# .env
REDIS_USERNAME=your-username
REDIS_PASSWORD=your-password
REDIS_HOST=your-host.upstash.io
REDIS_PORT=12345
```

> **Note**: These variables are only used by the backend.

#### Frontend Environment

Go to the frontend folder and copy the env file:

```bash
cd url-shortener-demo-frontend
cp .env.example .env
```

Then update your `.env` with the backend API location:

```dotenv
# .env
VITE_API_BASE="http://localhost:3001"
```

> This tells the frontend where to send API requests.

---

### 3. Install Dependencies

**Backend:**

```bash
cd url-demo-api
npm install
```

**Frontend:**

```bash
cd url-shortener-demo-frontend
npm install
```

---

### 4. Start the App

**Backend:**

```bash
cd url-demo-api
npm start
```

**Frontend:**

```bash
cd url-shortener-demo-frontend
npm run dev
```

> The frontend will run at `http://localhost:5173`, and the backend at `http://localhost:3001`

---

## 💡 Features

- Custom aliases
- Optional expiration (`1h`, `1d`, etc.)
- View all aliases (active and expired)
- Resolve and delete URLs in real time

---

## 🔗 Package Used

[`@the-node-forge/url-shortener`](https://www.npmjs.com/package/@the-node-forge/url-shortener)

---

## 🛄 Clean Up

Redis entries will expire automatically based on their TTL. You can also delete them manually from the frontend UI.

---

## 📬 Feedback

Feel free to open an issue or submit a PR — all contributions welcome!

---

Made with 💻 by The Node Forge — Andrew Gomez
