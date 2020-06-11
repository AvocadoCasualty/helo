require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;
const ctrl = require('./controller')

const app = express();

app.use(express.json());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
        secret: SESSION_SECRET
    })
);

//auth endpoints
app.post('/api/auth/register', ctrl.register)
app.post('/api/auth/login', ctrl.login)
app.delete('api/auth/logout', ctrl.logout)
app.get('api/auth/user', ctrl.getUser)

//endpoints
app.get('/api/dashboard/posts/', ctrl.getPosts)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db',db)
    console.log('You db is connected!')
    app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}).catch(error => console.log(error));