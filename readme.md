# GooseTrack project backend repository

This project contains the backend part of the web application
[GooseTrack Task Planner](https://svrphoenix.github.io/project-group3fe). It
provides user registration, authentication, management of reviews, and user
tasks.

### Installation and Usage

Make sure you have the LTS version of [Node.js](https://nodejs.org/en) and
[npm](https://www.npmjs.com/) installed. To obtain and run this project locally,
follow these steps:

1. **Clone the repository** Open your terminal and execute the command:

   ```sh
   git clone https://github.com/svrphoenix/project-group3be.git
   ```

2. **Navigate to the project folder** Change to the created repository folder:

   ```sh
   cd project-group3be
   ```

3. **Install dependencies** Use npm to install the necessary dependencies:

   ```sh
   npm install
   ```

4. **Start the server** Launch the server in development mode using the command:

   ```sh
   npm run dev
   ```

### Commands

- `npm start` &mdash; start the server in production mode
- `npm run dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run eslint code checking, execute before each PR and
  fix all lint errors
- `npm lint:fix` &mdash; run lint checking with automatic fixes for simple
  errors

### Backend Deployment

The backend component has been deployed on the Render.com server and is
accessible at:
[https://goose-backend.onrender.com/](https://goose-backend.onrender.com/).

### API Documentation

For working with the project, documentation of endpoints has been created using
Swagger UI. You can find it at this
[GooseTrack API Documentation](https://goose-backend.onrender.com/docs/)

### Backend Repository

Check out the frontend code at:
[GooseTrack Frontend Repository](https://github.com/svrphoenix/project-group3fe)
