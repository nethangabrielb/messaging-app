import { validationResult } from "express-validator";
import username from "../rules/username.js";
import email from "../rules/email.js";
import password from "../rules/password.js";
import confirmPassword from "../rules/confirmPassword.js";

const registrationValidation = [email, username, password, confirmPassword];

const validateRegistration = [
  registrationValidation,
  (req, res, next) => {
    // Retrieve errors from express-validator on input fields
    const errors = validationResult(req);

    // Return errors if there are any
    if (!errors.isEmpty()) {
      const errorsArr = errors.array({ onlyFirstError: true });
      return res.status(400).json({
        code: "INVALID_INPUT",
        data: errorsArr.map((err) => err),
        status: 400,
      });
    } else {
      next();
    }
  },
];

export { validateRegistration };
