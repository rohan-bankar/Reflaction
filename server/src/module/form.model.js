import  mongoose,{Schema}  from "mongoose";

const feedbackLinkSchema = new Schema(
    {
        linkId:{
            type:String,
            unique:true,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        },
        description: { 
            type: String 
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const FeedbackLink = mongoose.model("FeedbackLink",feedbackLinkSchema);