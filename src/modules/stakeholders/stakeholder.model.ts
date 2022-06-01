import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";

export interface IStakeholder extends Document {
  name: string;
  project: IProject["_id"];
}

const StakeholderSchema = new Schema<IStakeholder>(
  {
    name: { type: String, required: [true, "Stakeholder name is required!."] },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project-id is required!."],
      index: true,
    },
  },
  { timestamps: true }
);

export const Stakeholder = model<IStakeholder>(
  "Stakeholder",
  StakeholderSchema
);
