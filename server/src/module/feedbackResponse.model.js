import mongoose, { Schema } from "mongoose";

const feedbackResponseSchema = new Schema(
    {
        linkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FeedbackLink",
            required: true,
        },
        positiveResponses: [
            {
                type: String,
                enum: ["adaptive", "flexible", "teamplayer"], 
            },
        ],
        improvementResponses: [
            {
                type: String,
                enum: ["arrogant", "lazy", "aggressive"], 
            },
        ],
        positiveFeedback: {
            type: String,
            trim: true, // Positive free-text feedback
        },
        improvementFeedback: {
            type: String,
            trim: true, // Improvement free-text feedback
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const FeedbackResponse = mongoose.model("FeedbackResponse",feedbackResponseSchema);
