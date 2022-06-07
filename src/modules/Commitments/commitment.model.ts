import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";
import { IProjectPhase } from "../projectPhases/projectPhase.model";
import { IAttachment, AttachmentSchema } from "../projects/project.model";

export interface ICommitment extends Document {
  actor: string;
  status: string;
  endDate: Date;
  onModel: string;
  startDate: Date;
  activity: string;
  completedOn?: Date;
  comments: Array<Object>;
  project: IProject["_id"];
  attachments: Array<IAttachment>;
  projectPhase: IProjectPhase["_id"];
}

const CommitmentSchema = new Schema<ICommitment>(
  {
    actor: {
      index: true,
      required: true,
      refPath: "onModel",
      type: Schema.Types.ObjectId,
    },

    onModel: {
      type: String,
      required: true,
      enum: ["Stakeholder", "User"],
    },

    endDate: {
      type: Date,
      index: true,
      required: [true, "End date is required!."],
    },

    startDate: {
      type: Date,
      index: true,
      required: [true, "Start date is required!."],
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "inprogress", "delivered"],
    },

    project: {
      index: true,
      ref: "Project",
      type: Schema.Types.ObjectId,
      required: [true, "Project id is required!."],
    },

    projectPhase: {
      index: true,
      ref: "ProjectPhase",
      type: Schema.Types.ObjectId,
      required: [true, "Project phase is required!."],
    },

    comments: [
      {
        message: { type: String, required: true },
        authorName: { type: String, require: true },
      },
    ],

    completedOn: Date,
    attachments: [AttachmentSchema],
    activity: { type: String, required: true },
  },
  { timestamps: true }
);

export const Commitment = model<ICommitment>("Commitment", CommitmentSchema);
