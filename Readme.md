# 💬 Real-Time Chat Application

A full-stack **real-time chat app** built with **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for instant messaging.  
Features include authentication, online/offline status, and smooth chat UI.

---

## ✨ Features

- 🔐 **Authentication** (Signup, Login, Logout) using JWT & cookies  
- 💬 **Real-time messaging** with Socket.IO  
- 🟢 **Online/Offline user status**  
- 🧑‍🤝‍🧑 **User list with last message preview**  
- 📜 **Chat history** with timestamps  
- 🎨 **Responsive UI** styled with Tailwind CSS  
- 🔔 **New message notifications** (sound + live updates)  

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite / CRA)
- Zustand (state management)
- Tailwind CSS
- Socket.IO Client
- Axios

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT for authentication
- bcrypt for password hashing
- cookie-parser & CORS middleware

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
```

Run backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` (adjust API URL if needed):

```env
VITE_API_URL=http://localhost:8000/api
```

Run frontend:

```bash
npm run dev
```

---

## ▶️ Usage

1. Open **[http://localhost:5173/](http://localhost:5173/)** (or the port shown in terminal).
2. Sign up or log in with an account.
3. Start chatting with other registered users.
4. Open another browser (or incognito) with a different user to test real-time chat.

---

## 📂 Project Structure

```
chat-app/
│
├── backend/               # Express.js + MongoDB + Socket.IO server
│   ├── controllers/       # User & Message controllers
│   ├── models/            # Mongoose models (User, Message, Conversation)
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── SocketIO/          # Socket.IO server setup
│   └── server.js          # Entry point
│
├── frontend/              # React.js client
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # Auth & Socket context, custom hooks
│   │   ├── home/          # Left/Right chat layout
│   │   └── statemanage/   # Zustand store
│   └── App.jsx            # Main app routes
│
└── README.md
```

---

## 🔒 Security Notes

* In production, **JWT tokens** should be stored in **httpOnly cookies**, not localStorage.
* Use **HTTPS** and set `secure: true` for cookies.
* Add input sanitization (to prevent XSS).
* Use `helmet` and rate limiting for extra backend protection.

---

## 🚀 Future Improvements

* ✅ Message search
* ✅ Group chats
* ✅ Message delivery/read receipts
* ✅ Dark mode UI
* ✅ Deploy on Vercel (Frontend) + Render/Heroku (Backend)

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Added feature X'`
4. Push the branch: `git push origin feature-name`
5. Open a Pull Request

---

## 👨‍💻 Author

**Aniket Singh**

* GitHub: [aniketsingh-214](https://github.com/aniketsingh-214)
* LinkedIn: [Aniket Singh](https://www.linkedin.com/in/aniketsingh214)

