A full-stack web application that lets users search for movies, view detailed information, and manage a personal favorites list — built with the MERN stack and powered by the OMDB API.

✨ Features

🔍 Movie Search — Search any movie using the OMDB API with real-time results
🎬 Movie Detail — View full details including plot, cast, director, ratings, and box office
❤️ Favorites — Add and remove movies from a personal favorites list
🔐 Authentication — Secure register and login with JWT tokens
👤 User Sessions — Persistent login using localStorage
🔢 Favorites Counter — Live badge in navbar showing total saved movies
📱 Responsive Design — Works on desktop, tablet, and mobile
🦴 Skeleton Loaders — Shimmer loading cards while fetching data
🔔 Toast Notifications — Non-intrusive feedback on actions
🚫 404 Page — Custom not found page for unknown routes

🛠️ Tech Stack
Frontend
TechnologyPurposeReact 18 (Vite)UI frameworkReact Router v6Client-side routingAxiosHTTP requests + interceptorsBootstrap 5Responsive layout & componentsContext APIGlobal auth & favorites state
Backend
TechnologyPurposeNode.jsRuntime environmentExpress.jsWeb frameworkMongoDB AtlasCloud databaseMongooseODM for MongoDBJWTAuthentication tokensbcryptjsPassword hashingCORSCross-origin resource sharing
External
ServicePurposeOMDB APIMovie data sourceMongoDB AtlasCloud hosted database
