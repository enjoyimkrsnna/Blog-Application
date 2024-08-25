## Dreams International Blog Application

### Description

This application is a full-featured blog management system built using **Express.js**. It includes user authentication, blog creation and management, commenting functionalities, file uploads for blog images, and email services for password resets. It uses **MongoDB** for data storage, **EJS** for server-side templating, and **Multer** for handling file uploads.

### Features

- **User Authentication**: Users can register, login, and logout.
- **Blog Management**: Users can create, edit, update, delete, and search for blogs.
- **Commenting**: Add comments to blog posts.
- **File Uploads**: Upload images associated with blog posts using Multer.
- **Email Services**: Handle password reset by sending an OTP to the user's email.
- **Templating with EJS**: Dynamic rendering of web pages.
- **Cookie and Session Management**: Cookies are used to store user authentication status.
  
---

## Installation

### 1. **Clone the Repository:**

```bash
git clone https://github.com/enjoyimkrsnna/Blog-Application
cd Blog-Application
```

### 2. **Install Dependencies:**

```bash
npm install
```

### 3. **Create a `.env` File:**

Create a `.env` file in the root directory with the following content:

```plaintext
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/dream_International
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_email
SENDER_PASSWORD=your_email_password
```

### 4. **Run the Application:**

```bash
npm start
```

The server will start running at `http://localhost:3000`.

---

## Environment Variables

- **`PORT`**: Specifies the port on which the server listens (default: 3000).
- **`MONGO_URI`**: Connection string for MongoDB (`mongodb://127.0.0.1:27017/dream_International`).
- **`JWT_SECRET`**: Secret key used to sign JSON Web Tokens (JWT) for user authentication.
- **`SENDER_EMAIL`**: Email address used for sending password reset emails.
- **`SENDER_PASSWORD`**: Password for the sender email account.

---

## Routes

### Authentication Routes

- `GET /auth/register`: Renders the registration form.
- `POST /auth/register`: Registers a new user.
- `GET /auth/login`: Renders the login form.
- `POST /auth/login`: Authenticates a user.
- `GET /auth/logout`: Logs out the user and clears the session.

### Blog Routes 

- `GET /blogs/new`: Renders a form for creating a new blog post.
- `POST /blogs/new`: Creates a new blog post (requires authentication).
- `GET /blogs`: Fetches all blog posts.
- `GET /blogs/:id`: Fetches a blog post by its ID (requires authentication).
- `GET /blogs/edit/:id`: Renders an edit form for an existing blog post (requires authentication).
- `POST /blogs/update/:id`: Updates a blog post by its ID (requires authentication).
- `DELETE /blogs/:id`: Deletes a blog post by its ID (requires authentication).
- `POST /blogs/search`: Allows users to search for blogs based on keywords.

### Comment Routes

- `POST /api/v1/comments/add/:id`: Adds a comment to a blog post by ID (requires authentication).

### Email Routes

- `GET /mail/forgot-password`: Renders the "forgot password" form.
- `POST /mail/forgot-password`: Submits the "forgot password" request and sends an email.
- `GET /mail/update-password`: Renders the "update password" form.
- `POST /mail/update-password`: Submits the "update password" request to reset the password.

---

## Authentication and Cookie Management

### Authentication

- The application uses **JWT (JSON Web Tokens)** to handle user authentication. Upon successful login, a JWT is generated and sent to the user's browser via cookies.
- This JWT token is required to access certain routes, such as creating, editing, or deleting blogs, and adding comments. The middleware `authMiddleware.js` verifies the token before granting access to these routes.

### Cookies

- The JWT is stored in a **HTTP-only cookie**, which prevents it from being accessed through JavaScript on the client side.
- The cookie stores the token to keep the user authenticated during the session. When the user logs out, the cookie is cleared, ending the session.
- The middleware `LoggedIn.middleware.js` is responsible for checking the presence of a valid token in the cookie, ensuring that users can access restricted routes only if they are logged in.

---

## Controllers

- **`authController.js`**: Handles user registration, login, and logout processes.
- **`blogController.js`**: Manages CRUD operations for blog posts, including fetching, creating, updating, and deleting posts.
- **`commentsController.js`**: Handles adding comments to blog posts.
- **`mailController.js`**: Manages password reset functionality, including sending OTPs and updating passwords.

---

## Views (EJS)

- **`home.ejs`**: Displays all blog posts on the homepage.
- **`register.ejs`**: Renders the user registration form.
- **`login.ejs`**: Renders the user login form.
- **`createBlog.ejs`**: Provides a form for users to create or edit blog posts.
- **`blogDetails.ejs`**: Displays single Blog and allow user to read and comment on it.
- **`forgot-password.ejs`**: view to allow user to send OTP to their email.
- **`update-password.ejs`**: Update the password using mail and otp.
- **`error.ejs`**: Displays errors like 404 (Page Not Found) or server-side issues.

---

## Middleware

- **`LoggedIn.middleware.js`**: This middleware ensures that certain routes are protected and only accessible to logged-in users. It checks the JWT stored in cookies.
- **`authMiddleware.js`**: This middleware checks the validity of JWT tokens in request headers or cookies. It is used to authenticate routes like blog creation, updating, or deleting.

---

## Screenshots

## Homepage:

## Without Login
   
![image](https://github.com/user-attachments/assets/fbad8392-3b7d-4359-beaa-6258954e4283)

## With Login 

![image](https://github.com/user-attachments/assets/7d23bb54-bd92-4d97-a8ca-30d1b051737e)

## Login , Registration and forgot Password:

![image](https://github.com/user-attachments/assets/7d98f948-909c-4cca-a9d4-3df8fecc9467)
![image](https://github.com/user-attachments/assets/41f7d387-84f7-4d0e-bf34-b454e96e76a6)
![image](https://github.com/user-attachments/assets/b6c4927f-33e2-4ed0-9846-b7fa5bc2a76f)
![image](https://github.com/user-attachments/assets/0c669c24-0d7b-488b-8c86-30f4204c872c)
![Simage](https://github.com/user-attachments/assets/2011252c-b769-4225-b962-4c4f98a55bdb)
![Screenshot](https://github.com/user-attachments/assets/d36ef99f-73b1-4d92-aef8-1a6907767a13)

## Blog Creation:
   
![image](https://github.com/user-attachments/assets/5f7f1eb1-e9d1-4fb8-a014-aa8817df4d16)

## Read Blog & Comments:
![image](https://github.com/user-attachments/assets/3cc31b4c-83f0-4e45-a79b-273b5f077869)
![image](https://github.com/user-attachments/assets/e4d80c19-5a39-4b28-9cbe-fc30d45592d8)

## Updating and deleting a blog
![image](https://github.com/user-attachments/assets/72d1dea0-bd00-4ddc-b2fe-5e8ec3f54ac8)
![image](https://github.com/user-attachments/assets/720f6642-9798-4e6a-aec7-82e68caef843)
 

