# Mapplication Project

## Table Of Contents

  - [Description](#description)
  - [Stack](#stack)
  - [Final Product](#final-product)
  - [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Contributions](#contributions)

## Description
Mapplication is a single-page map based web application. It allows users to create thier own custom maps, or create maps collaboritivly by contributing to maps other users have made. Users have the ability to browse and view public maps made by other users as well as store them as 'favourites'.

## Stack
### Back-End
- Node.js
- Express
- Cookie Sessions
- Postgres SQL

### Front-End
- Google Maps JS API
- Google Maps Places API
- Javascript
- jQuery
- AJAX
- EJS
- CSS

## Final Product
 !["Intuitive interface to start creating custom maps"](public/docs/create-map.png)
  !["Place markers on custom locations!"](public/docs/map-markers.png)
  !["Access your maps later or discover other users maps!"](public/docs/my-maps.png)




## Getting Started
The project is deployed for use here [here](https://mappifyy.herokuapp.com/login/4)

This project requires the following dependencies on your development machine: 
```
~> node --version
v8.9.4
~> npm --version
6.13.4
~> psql --version
psql (PostgreSQL) 9.5.19
```

After you have installed the dependencies you can get started by:
1. Clone this repository.
2. Install node packages using the `npm install` command.
3. Connect to posgres using `psql` in the terminal. Create tables by running `\i db/schema/midterm.sql`  and create test users by running `\i db/seeds/01_users.sql`
    - Not sure how to set up a database ?  See, [postgres docs](https://www.postgresql.org/docs/)
   
4. Start the web server using the `npm run local` command.

5. The app will be served at <http://localhost:8080/> in your browser.

## Dependencies
    body-parser: ^1.19.0
    chalk: ^2.4.2
    cookie-session: ^1.3.3
    dotenv: ^2.0.0
    ejs: ^2.6.2
    express: ^4.17.1
    morgan: ^1.9.1
    node-sass-middleware: ^0.11.0
    pg: ^6.4.2
    pg-native: ^3.0.0

## Contributions
  This app was created by...

- https://github.com/umrude
- https://github.com/curriecode
- https://github.com/JacksonStark
