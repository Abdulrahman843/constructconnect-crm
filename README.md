# ConstructConnect CRM

A powerful, responsive CRM web application built specifically for construction companies. Manage clients, projects, subscriptions, team communication, and more — all from one streamlined interface.

[Live Demo](https://constructconnect-crm.vercel.app)

## Features

- Authentication with session-based routing
- Client management (add, view, edit, delete)
- Project tracking and assignment
- Stripe-based subscription system
- Built-in AI chat assistant for customer support
- Admin dashboard to view analytics and chat logs
- Responsive design for desktop and mobile
- Deployed with Vercel for production-ready performance

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, Tailwind CSS
- **Backend**: Node.js, MongoDB, Mongoose, Stripe API
- **AI Integration**: OpenAI GPT-3.5
- **Deployment**: Vercel (Frontend), MongoDB Atlas (Database)
- **Others**: TypeScript, Toastify, Form validation, RESTful API structure

## Screenshots

| ![Home](public/screenshots/home.jpg) | ![Dashboard](public/screenshots/dashboard.jpg) | ![Clients](public/screenshots/clients.jpg) | ![Chatbot](public/screenshots/chat.jpg) |

## 🛠️ Local Development
git clone https://github.com/Abdulrahman843/constructconnect-crm.git
cd constructconnect-crm
npm install
npm run dev
### Create a .env.local file with:
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
### AI Chatbot Behavior
The AI assistant is designed to:
- Respond politely and helpfully
- Guide users through client/project management
- Recommend next steps and answer CRM-specific queries

## License
This project is licensed under the MIT License.

## Author
Abdulrahman Laoye – https://www.linkedin.com/in/abdulrahman-adewale-laoye-0bb28b105/

## Show Your Support
Give a ⭐️ if you like this project!
