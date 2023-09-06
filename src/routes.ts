import { Request, Response, Router } from "express";
import { authenticationController } from "./useCases/Authentication";
import {getPhonesController} from "./useCases/GetPhones";
import { EnsureAuthenticated } from "./shared/middleware/EnsureAuthenticated";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "./shared/interfaces/StatusCodes";

const router = Router();
const ensureAuthenticated = new EnsureAuthenticated();

router.post('/auth', [
  body("email").notEmpty().withMessage("Please provide an email."),
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password").notEmpty().withMessage("Please provide a password.")
], (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
      return response.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  return authenticationController.handle(request, response);
})

router.get('/phones', ensureAuthenticated.isAutenticated, (request, response) => {
  return getPhonesController.handle(request, response);
})

export { router }