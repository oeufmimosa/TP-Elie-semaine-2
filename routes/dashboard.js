import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

export default router;