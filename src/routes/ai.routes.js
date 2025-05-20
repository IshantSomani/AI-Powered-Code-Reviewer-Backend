const express = require('express');
const { getReview } = require('../controllers/ai.controller');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/get-review', [
    body('code').isString().notEmpty().withMessage('Code must be a non-empty string'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await getReview(req, res);
    } catch (error) {
        console.error("Error in /get-review route:", error);
        res.status(500).json({ error: 'Failed to get review', details: error.message });
    }
});

module.exports = router;