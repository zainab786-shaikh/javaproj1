# React Expense Tracker with Java API

This project is a full-stack expense tracker application with a React frontend and a Java Spring Boot backend, using PostgreSQL for data persistence.

## Running the Application

### Backend (Java API Server)

The backend is a Spring Boot application that provides a REST API for managing expenses. It is located in the `/server` directory.

**Prerequisites:**

*   Java 17 or later
*   Maven
*   PostgreSQL

**Database Setup:**

1.  Make sure you have PostgreSQL installed and running.
2.  Create a new database for this application. You can name it `expensedb`.
3.  Create a user and grant them privileges on the `expensedb` database.

**Configuration:**

1.  Open `server/src/main/resources/application.properties`.
2.  Update the following properties to match your PostgreSQL setup:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/expensedb
    spring.datasource.username=your_postgres_user
    spring.datasource.password=your_postgres_password
    ```

**Running the Server:**

1.  Navigate to the `/server` directory in your terminal.
2.  Run the following command to start the server:
    ```bash
    mvn spring-boot:run
    ```
3.  The server will start on `http://localhost:8080`. The API endpoints are available under `/api/expenses`. The application will create the `expenses` table automatically on the first run.

### Frontend (React App)

The frontend is a React application that communicates with the Java backend to manage expenses.

**Running the Frontend:**

1.  Ensure the Java API server is running.
2.  Open the web preview environment. The React application will start automatically.
3.  The application will connect to the backend API at `http://localhost:8080` to fetch and manage data. If you see an error, please ensure the backend server is running and accessible.
