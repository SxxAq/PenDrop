# PenDrop

PenDrop is a a simple and responsive blogging platform where users can register, log in, create, edit, and delete blog posts. The platform is built with a modern JavaScript framework on the front end and a secure back end, providing a user-friendly experience.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete posts
- View user profiles
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React
- Vite
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/SxxAq/PenDrop.git
   cd pendrop
   ```

2. Install dependencies for both frontend and backend
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the backend server
   ```
   npm start
   ```

5. In a new terminal, start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Deployment

This project is set up for deployment on Render. For detailed deployment instructions, please refer to the [Deployment Guide](link-to-deployment-guide).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

