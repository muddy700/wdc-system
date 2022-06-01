import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";

export interface ISubProject extends Document {
  name: string;
  description?: string;
  parentProject: IProject["_id"];
}

const SubProjectSchema = new Schema<ISubProject>(
  {
    parentProject: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    description: { type: String },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const SubProject = model<ISubProject>("SubProject", SubProjectSchema);
