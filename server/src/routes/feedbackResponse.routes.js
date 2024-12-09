import {Router} from "express";
import{
    submitFeedback
} from "../controller/feedbackResponse.controller.js";

const router = Router();

router.route("/submit-response/:linkId").post(submitFeedback);

export default router;