# Mission21 Kakao Project

This is the service to manage the user profiles, kakao templates, Emailing, Text messages and user groups.

### Clone Repository

To begin, clone repository to local directory.

```
git clone git@bitbucket.org:digimantra/backend.git -b development
```

### Install Dependencies

Install node dependencies.

```
cd backend
npm install
```

### Setup Environment Variables

Use the included .envsample file to create your .env file to set environment variables needed by the service.

```
cp .envsample .env
vim .env
```

### Run Migrations and Seeders To Setup Database

After you complete your .env, run migrations to setup database tables. You can also seed the database tables with contents.

```
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
```

### Install Dependencies for Admin Panel
Before starting the server, install dependencies.

```
cd Admin
npm install
```

### Configuring environment variables:

Before building/starting the app, create a .env file to configure environment variables. Use Admin/.envsample as a reference.

List of environment to configure: NODE_PATH=./src, REACT_APP_APIPATH

### Starting a Simple Web Server

```
cd ..
npm run dev
```

### Credentials for Login to Kakao Admin Panel

```
Username - admin
password - admin
```
