import { FeedbackResponse } from "../module/feedbackResponse.model.js";
import { FeedbackLink } from "../module/form.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const submitFeedback = asyncHandler(async (req, res) => {
//     const { linkId, positiveResponses, improvementResponses, positiveFeedback, improvementFeedback } = req.body;

//     console.log("Received request with:", { linkId, positiveResponses, improvementResponses, positiveFeedback, improvementFeedback });

//     // Validate feedback link
//     const feedbackLink = await FeedbackLink.findOne({ linkId, isActive: true });
//     console.log("FeedbackLink query result:", feedbackLink);

//     if (!feedbackLink) {
//         throw new ApiError(404, `Feedback link not found or inactive. linkId: ${linkId}`);
//     }

//     // Ensure at least one response is provided (either positive or improvement)
//     if ((!positiveResponses || positiveResponses.length === 0) &&
//         (!improvementResponses || improvementResponses.length === 0)) {
//         throw new ApiError(400, "At least one response (positive or improvement) is required");
//     }

//     // Create feedback response
//     const newFeedbackResponse = new FeedbackResponse({
//         linkId: feedbackLink._id,
//         positiveResponses,
//         improvementResponses,
//         positiveFeedback, // Save the positive feedback
//         improvementFeedback, // Save the improvement feedback
//     });

//     await newFeedbackResponse.save();

//     return res
//         .status(201)
//         .json(
//             new ApiResponse(
//                 201,
//                 newFeedbackResponse,
//                 "Feedback submitted successfully"
//             )
//         );
// });

const submitFeedback = asyncHandler(async (req, res) => {
    const { linkId } = req.params; // Retrieve from URL
    const { positiveResponses, improvementResponses, positiveFeedback, improvementFeedback } = req.body;

    console.log("Received request with:", { linkId, positiveResponses, improvementResponses, positiveFeedback, improvementFeedback });

    // Validate feedback link
    const feedbackLink = await FeedbackLink.findOne({ linkId, isActive: true });
    console.log("FeedbackLink query result:", feedbackLink);

    if (!feedbackLink) {
        throw new ApiError(404, `Feedback link not found or inactive. linkId: ${linkId}`);
    }

    // Ensure at least one response is provided (either positive or improvement)
    if ((!positiveResponses || positiveResponses.length === 0) &&
        (!improvementResponses || improvementResponses.length === 0)) {
        throw new ApiError(400, "At least one response (positive or improvement) is required");
    }

    // Create feedback response
    const newFeedbackResponse = new FeedbackResponse({
        linkId: feedbackLink._id,
        positiveResponses,
        improvementResponses,
        positiveFeedback, // Save the positive feedback
        improvementFeedback, // Save the improvement feedback
    });

    await newFeedbackResponse.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                newFeedbackResponse,
                "Feedback submitted successfully"
            )
        );
});

export { submitFeedback };
