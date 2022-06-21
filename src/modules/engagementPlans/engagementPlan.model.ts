import {
  IStakeholder,
  METHODS_OF_CONTACT,
} from "../stakeholders/stakeholder.model";
import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";
import { IProjectPhase } from "../projectPhases/projectPhase.model";

export interface IEngagementPlan extends Document {
  channel: string;
  activity: string;
  endingDate?: Date;
  frequency: string;
  startingDate: Date;
  project: IProject["_id"];
  stakeholder: IStakeholder["_id"];
  projectPhase: IProjectPhase["_id"];
}

const EngagementPlanSchema = new Schema<IEngagementPlan>(
  {
    projectPhase: {
      index: true,
      required: true,
      ref: "ProjectPhase",
      type: Schema.Types.ObjectId,
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
      enum: [
        "Only once",
        "Everyday",
        "Weekly",
        "Monthly",
        "Once every 2 months",
      ],
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

    endingDate: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true }
);

export const EngagementPlan = model<IEngagementPlan>(
  "EngagementPlan",
  EngagementPlanSchema
);
