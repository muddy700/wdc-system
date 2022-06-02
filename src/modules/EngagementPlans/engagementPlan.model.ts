import {
  IStakeholder,
  METHODS_OF_CONTACT,
} from "../stakeholders/stakeholder.model";
import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";

export interface IEngagementPlan extends Document {
  channel: string;
  activity: string;
  frequency: string;
  startingDate: Date;
  projectPhase: string;
  project: IProject["_id"];
  stakeholder: IStakeholder["_id"];
}

const EngagementPlanSchema = new Schema<IEngagementPlan>(
  {
    projectPhase: {
      index: true,
      type: String,
      required: true,
    },

    channel: {
      type: String,
      required: true,
      enum: [METHODS_OF_CONTACT],
    },

    project: {
      index: true,
      ref: "Project",
      required: true,
      type: Schema.Types.ObjectId,
    },

    stakeholder: {
      index: true,
      required: true,
      ref: "Stakeholder",
      type: Schema.Types.ObjectId,
    },

    frequency: {
      type: String,
      required: true,
      enum: ["everyday", "weekly", "monthly"],
    },

    activity: {
      type: String,
      required: [true, "Activity is required!."],
    },

    startingDate: {
      type: Date,
      index: true,
      required: [true, "Starting date is required!."],
    },
  },
  { timestamps: true }
);

export const EngagementPlan = model<IEngagementPlan>(
  "EngagementPlan",
  EngagementPlanSchema
);
