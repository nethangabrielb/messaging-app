import { body } from "express-validator";

export default body("confirmPassword")
  .exists()
  .withMessage("Password is required")
  .trim()
  .notEmpty()
  .withMessage("Password can't be empty")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .custom((value, { req }) => {
    return value === req.body.password;
  })
  .withMessage("Passwords do not match");
