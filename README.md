This project is an expense tracker with an user authentication

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production mode.

### `npm run server`

Runs the app in the development mode.

### `npm run client`

Runs the client in the development mode.

### `npm run dev`

Runs app and client in the development mode.

## Available API routes

### `/api/v1/auth`

* `POST /signup`, sign up a user
* `POST /login`, log in user

### `/api/v1/transactions`

* `GET /:userId`, view a user's account
* `POST /`, add transaction at user's account
* `DELETE /:userId/:id`, delete transaction from user's account

## Install app

After executing command `npm install`, create a `config.env` file into `/config` with inside:<br />
KEY | VALUE
--- | ---
`NODE_ENV` | `development` or `production`
`PORT` | `YOUR_PORT` (3000 by default)
`DATABASE_URL` | `YOUR_MONGODB_URL`
`USER_TOKEN` | `YOUR_AUTHENTICATION_PASSPHRASE`
