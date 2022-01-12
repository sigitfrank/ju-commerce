# Getting Started with Ju-Commerce App
This app splitted into two parts. The first part is Frontend for the client side and the other one is Backend for the server side.

## Client Side
To run client side. Open your project in your Code Editor.

### `npm install`
Run 'npm install' to install required packages before running application.

### `npm start`
After running 'npm install', you can run 'npm start' in your current directory to run the application. Wait until the process finished, it will automatically open your app in your default browser.


## Server Side
To run server side. Open your project in your Code Editor

### `npm install`
Run 'npm install' to install required packages before running application.

### Setting .env
Create and configure your env configuration based on your computer/server settings. There is a .env.example you can use if you want, which is my configuration.

### Setting config.json
Another to configure is config.json. There is a config/config.json file to be used for migration. But, it's not needed to change if your config.json setting is same with mine.

### `Run Migration For Database`
Before running the applocation, you have to run command 'npm run db' to automatically create database in your machine. It will create database based on your config/config.json configuration.

### `Run Migration For Tables`
After running migration for database, you have to run command 'npm run migarate' to automatically create tables in your database. It will create tables based on your config/config.json configuration.

### `npm run devStart | npm run start`
After all the configurations are ready. You have to run command 'npm run devStart' to run the application with nodemon or you can run command 'npm run start' to start it without autorestart the application.

## `Import Data from Elevenia API`
To import data product to your database, I provide endpoint BASE_URL_BACKEND/v1/import. Please kindly to access this endpoint to get data into your database. Thank you.

# All SET UP!
After backend is ready, you can use client side properly.











