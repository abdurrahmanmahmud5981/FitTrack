# 💪 FitTrack - Fitness Training Platform

Welcome to FitTrack, a comprehensive fitness tracking and training management platform built with the MERN stack. Our platform connects fitness enthusiasts with professional trainers while providing powerful tools for tracking progress and managing fitness goals.

## 🌐 Live Site
[FitTrack](https://fit-track-bd.web.app/)

## 🔑 Admin Credentials
```json
{
  "email": "admin@example.com",
  "password": "admin@exampleA!1"
}
```

## ⭐ Key Features

### 🔒 Authentication & Security
- Three-tier role system (Admin, Trainer, Member)
- JWT-based secure authentication
- Social login integration
- Role-based route protection
- Environment variable protection

### 💼 Training Management
- Dynamic class scheduling
- Professional trainer profiles
- Smart slot booking system
- Tiered membership packages
- Stripe payment integration

### 🤝 Community Engagement
- Interactive forum with voting
- Professional badge system
- Newsletter subscriptions
- Member testimonials
- Dynamic post management

### 👑 Admin Controls
- Subscriber management dashboard
- Trainer application system
- Financial analytics
- Class management
- User role administration

### 👨‍🏫 Trainer Portal
- Slot management
- Class scheduling
- Progress tracking
- Forum participation
- Profile customization

### 👤 Member Experience
- Activity logging
- Booking management
- Review system
- Profile customization
- Schedule tracking

### 🔍 Smart Features
- Intelligent search system
- Advanced filtering options
- Expertise matching
- Availability tracking

### 📱 Responsive Design
- Mobile-first approach
- Cross-device compatibility
- Consistent UX/UI
- Modern interface

### 📊 Analytics
- Progress visualization
- Financial tracking
- Membership analytics
- Booking trends

### 🛡️ Security
- JWT implementation
- Protected endpoints
- Secure payments
- Access control

## 🛠️ Tech Stack

### 🎨 Frontend
```javascript
{
  "core": ["React.js", "Tailwind CSS"],
  "state": ["TanStack Query"],
  "routing": ["React Router"],
  "networking": ["Axios"],
  "ui": ["React Select"],
  "payments": ["Stripe"],
  "misc": ["React Helmet"]
}
```

### ⚙️ Backend
```javascript
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MongoDB",
  "security": ["JWT", "Stripe API"],
  "config": "Environment Variables"
}
```


---

## 📂 Repository

📦 [GitHub Repo](https://github.com/abdurrahmanmahmud/Fittrack)

---

## 🚀 Setup & Installation

### Prerequisites

* Node.js & npm
* MongoDB Atlas account
* Stripe account for test keys

### Clone the Project

```bash
git clone https://github.com/your-username/Fittrack.git
cd fittrack
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
git clone https://github.com/your-username/Fittrack-server.git
cd ../server
npm install
```

### Environment Variables

#### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Run Backend

```bash
cd server
npm run dev
```

### Run Frontend

```bash
cd ../client
npm run dev
```

---


## 🙌 Contributions

Pull requests are welcome! If you’d like to add features, fix bugs, or improve documentation:

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to your branch
5. Open a pull request

---

## ⭐ Like this project?

Give it a star on GitHub! ⭐

---

## 🧑‍💻 Author

Made with ❤️ by [Abdur Rahman](https://abdurrahmanmahmud.vercel.app/)

```

