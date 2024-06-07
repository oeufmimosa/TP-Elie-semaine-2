import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('register', { errors: req.flash('errors') });
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    let errors = [];
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errors.push('All fields are required.');
    }
    if (password !== confirmPassword) {
        errors.push('Passwords do not match.');
    }
    if (errors.length > 0) {
        req.flash('errors', errors);
        return res.redirect('/register');
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        req.flash('errors', ['User already exists.']);
        return res.redirect('/register');
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: new User().encryptPassword(password)
    });

    await newUser.save();
    req.flash('flash_message', 'User registered successfully.');
    res.redirect('/login');
});

export default router;
