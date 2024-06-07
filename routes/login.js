import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { errors: req.flash('errors'), flash_message: req.flash('flash_message') });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== new User().encryptPassword(password)) {
        req.flash('errors', ['Invalid email or password.']);
        return res.redirect('/login');
    }

    req.session.user = user;
    res.redirect('/dashboard');
});

export default router;
