# RestoBook - Modern Restaurant Website

A modern, fully responsive restaurant website built with React (frontend) and MongoDB (backend). Features a visually stunning, minimalist, and professional UI with smooth animations, elegant typography, and authentic color combinations.

## 🌟 Features

### Frontend Features
- **Modern UI/UX**: Elegant design with black, white, gold color palette
- **Responsive Design**: Fully mobile-friendly using Flexbox and Grid
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Smooth Animations**: Framer Motion and AOS animations
- **Dynamic Cart**: localStorage-based cart with real-time updates
- **Interactive Gallery**: Grid-based gallery with lightbox effect
- **Table Booking**: Online reservation system
- **Testimonials**: Customer reviews with carousel slider

### Backend Features
- **RESTful API**: Express.js with MongoDB integration
- **Menu Management**: CRUD operations for menu items
- **Booking System**: Table reservation management
- **Testimonials**: Customer review system with approval workflow
- **Contact Form**: Message handling system

## 🚀 Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- AOS (Animate On Scroll)
- React Icons
- React Toastify
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## 📁 Project Structure

```
restaurant/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── menuRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── testimonialRoutes.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   ├── Booking.js
│   │   └── Testimonial.js
│   └── config/
│       └── db.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── styles/
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/restobook
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎨 Design Features

- **Elegant Typography**: Playfair Display for headings, Poppins for body text
- **Smooth Transitions**: Hover effects and micro-interactions
- **Gradient Overlays**: Sophisticated visual effects
- **Card Animations**: 3D tilt effects and hover animations
- **Parallax Scrolling**: Engaging scroll effects
- **Glass Morphism**: Modern UI elements with backdrop blur

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images and performance

## 🔧 API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category=Dinner` - Filter by category
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `PUT /api/testimonials/:id/approve` - Approve testimonial

### Contact
- `POST /api/contact` - Send contact message

## 🎯 Key Components

### Frontend Components
- **Navbar**: Responsive navigation with dark mode toggle
- **HeroSection**: Animated hero with call-to-action buttons
- **MenuCard**: Interactive menu item cards with cart functionality
- **Cart**: Shopping cart with localStorage persistence
- **Gallery**: Image gallery with lightbox
- **Footer**: Contact information and social links

### Backend Models
- **MenuItem**: Menu item schema with categories and availability
- **Booking**: Table reservation schema with validation
- **Testimonial**: Customer review schema with approval system

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy with MongoDB Atlas connection

## 🔮 Future Enhancements

- Payment integration for online ordering
- Admin dashboard for content management
- Email notifications for bookings
- Social media integration
- Multi-language support
- PWA capabilities

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email support@restobook.com or create an issue in the repository.