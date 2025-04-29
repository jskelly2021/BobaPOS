require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passportConfig');
const { ensureLoggedIn, requireRole } = require('./middleware/authMiddleware');

const itemsRouter = require('./routes/items');
const ingredientsRouter = require('./routes/ingredients');
const employeesRouter = require('./routes/employee');
const ordersRouter = require('./routes/orders');
const toppingsRouter = require('./routes/toppings');
const weatherRouter = require('./routes/weather');

const authRouter = require('./routes/auth');
const analyticsRouter = require('./routes/analytics');


const app = express();
const port = 4001;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}));
app.set('trust proxy', 1); // trust first proxy

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: 
        {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',   // ← allow cross-site in dev
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            //secure: false      // ← allow HTTP in dev
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

// both cashier & manager can read items; only manager can create/update/delete
app.use('/api/items', itemsRouter);

app.use('/api/ingredients', ingredientsRouter);

// manager only: employee Cridentials 
app.use(
    '/api/employees',
    ensureLoggedIn,
    requireRole('MANAGER'),
    employeesRouter
    );

// cashiers & managers can place orders
app.use('/api/orders', ordersRouter);

app.use('/api/toppings', toppingsRouter);

// analytics is manager-only
app.use(
    '/api/analytics',
    ensureLoggedIn,
    requireRole('MANAGER'),
    analyticsRouter
    );

// weather is manager-only
app.use('/api/weather', weatherRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
