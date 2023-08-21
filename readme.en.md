# GooseTrack project backend repository

This project contains the backend for the
[GooseTrack task planner application](https://svrphoenix.github.io/project-group3fe).
It provides user registration, authentication, management of reviews, and user
tasks.

### Application Links

- [GooseTrack Task Planner Frontend](https://github.com/svrphoenix/project-group3fe)
- The backend part is deployed on the Render.com server and is accessible at:
  [https://goose-backend.onrender.com/](https://goose-backend.onrender.com/).

  ### Installation and Usage

  Make sure you have the LTS version of [Node.js](https://nodejs.org/en) and
  [npm](https://www.npmjs.com/) installed. To obtain and run this project
  locally, follow these steps:

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

### Documentation

For working with the project, documentation of endpoints has been created using
Swagger UI. You can find it at this
[link](https://goose-backend.onrender.com/docs/).
