const { validateFeedbackPayload } = require("../utils/queryValidation");
const { ValidationError } = require("../utils/errors");
const feedbackService = require("../services/feedback.service");

async function createFeedback(req, res, next) {
  try {
    const payload = validateFeedbackPayload(req.body);
    const request = await feedbackService.createFeedbackRequest(payload);
    return res.status(201).json(request);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}

module.exports = {
  createFeedback,
};
