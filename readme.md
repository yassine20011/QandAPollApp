# QandAPollApp - README

## Installation

### Backend - Django & Django Rest Framework

Navigate to the backend directory with `cd backend`

1. Create a virtual environment with `python3 -m venv venv`
2. Activate the virtual environment on windows with `venv\Scripts\activate` or on linux with `source venv/bin/activate`
3. Install the requirements with `pip install -r requirements.txt`

Create a `.env file in the root directory of the backend and add the following variables change the values to your own values:

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=3306
```

4. Run the migrations with `python manage.py migrate`
5. Run the server with `python manage.py runserver`

### Frontend - React

Navigate to the frontend directory with `cd frontend`

1. Install the dependencies with `npm install`
2. Run the server with `npm start`
