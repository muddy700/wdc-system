import { Schema, Document, model } from "mongoose";
import { IStakeholder } from "../stakeholders/stakeholder.model";
import { IProjectPhase } from "../projectPhases/projectPhase.model";

export interface IEngagementLevel extends Document {
  desiredLevel: string;
  currentLevel: string;
  stakeholder: IStakeholder["_id"];
  projectPhase: IProjectPhase["_id"];
}

const EngagementLevelSchema = new Schema<IEngagementLevel>(
  {
    stakeholder: {
      index: true,
      required: true,
      ref: "Stakeholder",
      type: Schema.Types.ObjectId,
    },

    projectPhase: {
      index: true,
      required: true,
      ref: "ProjectPhase",
      type: Schema.Types.ObjectId,
    },

    desiredLevel: {
      type: String,
      required: true,
      enum: ["Leading", "Neutral", "Unaware", "Resistant", "Supportive"],
    },

    currentLevel: {
      type: String,
      required: true,
      enum: ["Leading", "Neutral", "Unaware", "Resistant", "Supportive"],
    },
  },
  { timestamps: true }
);

export const EngagementLevel = model<IEngagementLevel>(
  "EngagementLevel",
  EngagementLevelSchema
);
