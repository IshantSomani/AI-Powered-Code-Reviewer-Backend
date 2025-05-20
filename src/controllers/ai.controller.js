const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    const { code } = req.body;

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
        return res.status(400).json({ error: "Code is required and must be a non-empty string." });
    }

    try {
        const response = await aiService(code);
        if (response === null || response === undefined) {
            console.warn("aiService returned null or undefined.  Check its implementation.");
            return res.status(500).json({ error: "AI service returned an invalid response." });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getReview:", error);
        res.status(500).json({ error: "Failed to process code review. Please try again later." });
    }
}