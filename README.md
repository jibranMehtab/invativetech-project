# InvativeTech Project

This is a full-stack application built with **Laravel** as the backend and **ReactJS** as the frontend. The backend serves as the API provider and manages the database with migrations, while the frontend handles user interaction and communication with the backend API.

## Project Setup

### Backend (Laravel) Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/jibranMehtab/invativetech-project.git
    cd invativetech-project
    ```

2. **Navigate to the backend folder (if it's in a separate directory):**
    ```bash
    cd backend
    ```

3. **Install Laravel dependencies:**
    ```bash
    composer install
    ```

4. **Copy the `.env.example` file to `.env`:**
    ```bash
    cp .env.example .env
    ```

5. **Generate the application key:**
    ```bash
    php artisan key:generate
    ```

6. **Configure your database connection:**
    - In the `.env` file, update your database credentials:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=notes
    DB_USERNAME=root
    DB_PASSWORD=
    ```

7. **Run the database migrations to set up the database schema:**
    ```bash
    php artisan migrate
    ```

8. **Start the Laravel development server:**
    ```bash
    php artisan serve
    ```
    - Your Laravel backend should now be accessible at `http://localhost:8000`.

---

### Frontend (React) Setup

1. **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2. **Install the frontend dependencies:**
    ```bash
    npm install
    ```

3. **Start the React development server:**
    ```bash
    npm start
    ```
    - Your React frontend should now be running at `http://localhost:3000`.

---

## API Endpoints

The Laravel backend exposes the following API routes:

- `GET /api/notes` - Retrieve all notes
- `POST /api/createNotes` - Create a new note
- `GET /api/notes/{id}` - Retrieve a specific note by ID
- `PUT /api/notes/{id}` - Update a specific note by ID
- `DELETE /api/notes/{id}` - Delete a specific note by ID

---

## Project Structure
/invativetech-project
    /backend                # Laravel Backend
        /app
        /database
        /routes
        /public
    /frontend               # React Frontend
        /src
        /public
        /node_modules

