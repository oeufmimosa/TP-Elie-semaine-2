import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';
import dashboardRoute from './routes/dashboard.js';
import indexRouter from './routes/index.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(flash());

app.use((req, res, next) => {
    res.locals.flash_message = req.flash("flash_message");
    res.locals.errors = req.flash("errors");
    next();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use('/', indexRouter);
app.get('/index', (req, res) => {
    res.render('index');
});
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/dashboard', dashboardRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
