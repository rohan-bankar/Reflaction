import { FeedbackLink } from "../module/form.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4} from "uuid";
import { FeedbackResponse } from "../module/feedbackResponse.model.js";

const createFeebbackLink = asyncHandler(async (req, res) => {
  const { userId, description } = req.body;

  if (!userId || !description) {
      throw new ApiError(400, "User ID and description are required.");
  }

  
  const linkId = uuidv4();
  
  const newFeedbackLink = new FeedbackLink({
      linkId,
      createdBy: userId,
      description,
  });

  await newFeedbackLink.save();
  console.log("New Feedback Link:", newFeedbackLink);

  
  const commonUrlPart = "http://localhost:5173/submit-feedback";
  const feedbackUrl = `${commonUrlPart}/${linkId}`;

  return res
      .status(201)
      .json(
          new ApiResponse(
              200,
              { ...newFeedbackLink.toObject(), feedbackUrl, message: "Use this link to submit feedback." },
              "Feedback link created successfully"
          )
      );
});

const getUserFeedbackLinks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const feedbackLinks = await FeedbackLink.find({ createdBy: userId });
  
    return res
    .status(200)
    .json(
        new ApiResponse(200,feedbackLinks,"Feedback link retrive successfully")
    );
  });

  const deleteFeedbackLink = asyncHandler(async (req, res) => {
    const linkId = req.params.userId.trim();

   const link = await FeedbackLink.findById(linkId);
   if(!link)
   {
    throw new ApiError(404,"link not found");
   }
   await FeedbackLink.findByIdAndDelete(linkId);

    
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Feedback link deleted successfully"
            )
        );
});


const viewFeedbackResponse = asyncHandler(async (req, res) => {
  const userId  = req.params.userId;  
  console.log(userId);
 
  const feedbackLinks = await FeedbackLink.find({ createdBy: userId });
  console.log(feedbackLinks);
  if (feedbackLinks.length === 0) {
      throw new ApiError(404, "No feedback links found for this user");
  }

  
  const feedbackResponses = await FeedbackResponse.find({
      linkId: { $in: feedbackLinks.map(link => link._id) }
  });
  console.log(feedbackResponses);
  if (feedbackResponses.length === 0) {
      throw new ApiError(404, "No feedback responses found for this user");
  }

  return res.status(200).json(
      new ApiResponse(200, feedbackResponses, "Feedback responses retrieved successfully")
  );
});



export{
    createFeebbackLink,
    getUserFeedbackLinks,
    deleteFeedbackLink,
    viewFeedbackResponse
}