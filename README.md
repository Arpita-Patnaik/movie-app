# 🎬 MovieApp — MERN Stack Movie Search & Favorites App

A full-stack web application that lets users search for movies, view detailed information, and manage a personal favorites list — built with the MERN stack and powered by the OMDB API.

---

## ✨ Features

- 🔍 **Movie Search** — Search any movie using the OMDB API with real-time results
- 🎬 **Movie Detail** — View full details including plot, cast, director, ratings, and box office
- ❤️ **Favorites** — Add and remove movies from a personal favorites list
- 🔐 **Authentication** — Secure register and login with JWT tokens
- 👤 **User Sessions** — Persistent login using localStorage
- 🔢 **Favorites Counter** — Live badge in navbar showing total saved movies
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- 🦴 **Skeleton Loaders** — Shimmer loading cards while fetching data
- 🔔 **Toast Notifications** — Non-intrusive feedback on actions
- 🚫 **404 Page** — Custom not found page for unknown routes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 (Vite) | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests + interceptors |
| Bootstrap 5 | Responsive layout & components |
| Context API | Global auth & favorites state |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |

### External
| Service | Purpose |
|---|---|
| OMDB API | Movie data source |
| MongoDB Atlas | Cloud hosted database |

---

## 📁 Project Structure

```
movie-app/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register & Login logic
│   │   └── favoriteController.js # Add, Get, Delete favorites
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Favorite.js           # Favorite schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   └── favoriteRoutes.js     # /api/favorites routes
│   ├── .env                      # Environment variables (not committed)
│   ├── .gitignore
│   ├── server.js                 # Entry point
│   └── package.json
│
├── frontend/
│   └── src/
│       ├── api/
│       │   └── axios.js          # Axios instance + interceptors
│       ├── context/
│       │   └── AuthContext.jsx   # Global auth + favorites count state
│       ├── components/
│       │   ├── Navbar.jsx        # Sticky navbar with badge
│       │   ├── MovieCard.jsx     # Reusable movie card
│       │   ├── SkeletonCard.jsx  # Shimmer loading card
│       │   ├── Toast.jsx         # Toast notification system
│       │   ├── Footer.jsx        # App footer
│       │   ├── ScrollToTop.jsx   # Auto scroll on route change
│       │   └── ProtectedRoute.jsx# Auth guard for private routes
│       ├── pages/
│       │   ├── Home.jsx          # Hero + popular movies grid
│       │   ├── Search.jsx        # Search + recent history
│       │   ├── Favorites.jsx     # User's saved movies
│       │   ├── MovieDetail.jsx   # Full movie information
│       │   ├── Login.jsx         # Login form
│       │   ├── Register.jsx      # Registration form
│       │   └── NotFound.jsx      # 404 page
│       ├── App.jsx               # Router + layout
│       ├── main.jsx              # Entry point
│       └── index.css             # Global styles (white & pink theme)
│
└── README.md
```

---

## 🔮 Future Enhancements

- [ ] Dark / Light mode toggle
- [ ] Movie recommendations based on favorites
- [ ] Watchlist feature (separate from favorites)
- [ ] User reviews and ratings
- [ ] Pagination for search results
- [ ] Social sharing of favorites
- [ ] AI-based movie suggestions

---
