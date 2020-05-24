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

## Install app

After executing command `npm install`, create a `config.env` file into `/config` with inside:<br />
KEY | VALUE
--- | ---
`NODE_ENV` | `development` or `production`
`PORT` | `YOUR_PORT` (3000 by default)
`DATABASE_URL` | `YOUR_MONGODB_URL`
`USER_TOKEN` | `YOUR_AUTHENTICATION_PASSPHRASE`