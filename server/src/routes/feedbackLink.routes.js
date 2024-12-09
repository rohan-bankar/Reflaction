import { Router } from "express";
import{
    createFeebbackLink, 
    deleteFeedbackLink, 
    getUserFeedbackLinks,
    viewFeedbackResponse
} from "../controller/feedbackLink.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-feedbacklink").post(verifyJWT,createFeebbackLink);
router.route("/get-user-feedbacklink").get(verifyJWT,getUserFeedbackLinks);
router.route("/feedback-links/:userId").delete(verifyJWT,deleteFeedbackLink);
router.route("/view-feedback-response/:userId").get(verifyJWT,viewFeedbackResponse);
export default router;