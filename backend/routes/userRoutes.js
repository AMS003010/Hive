const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser,
} = require('../controllers/userControllers');

// Validation middleware
const validateUser = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (req.method === 'POST') {
        // Required fields for new user
        if (!email) errors.push('Email is required');
        if (!password) errors.push('Password is required');
    }

    if (email !== undefined) {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Invalid email format');
        }
        if (email.length > 255) {
            errors.push('Email is too long (maximum 255 characters)');
        }
    }

    if (password !== undefined) {
        // Password strength validation
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (password.length > 60) {
            errors.push('Password is too long (maximum 60 characters)');
        }
    }

    if (req.body.mem_count !== undefined) {
        const memCount = parseInt(req.body.mem_count);
        if (isNaN(memCount) || memCount < 0) {
            errors.push('Member count must be a non-negative number');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ 
            message: 'Validation failed',
            errors 
        });
    }

    next();
};

// ID validation middleware
const validateId = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ 
            message: 'Invalid ID format. ID must be a positive number',
            receivedId: req.params.id
        });
    }
    next();
};



// Routes
router.get('/', getAllUsers);

router.post('/', 
    validateUser, 
    addUser
);

router.delete('/:id', 
    validateId, 
    deleteUser
);

router.patch('/:id', 
    validateId,
    validateUser, 
    updateUser
);

module.exports = router;