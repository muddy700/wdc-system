import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";

export interface IProjectPhase extends Document {
  name: string;
  description?: string;
  project: IProject["_id"];
}

const ProjectPhaseSchema = new Schema<IProjectPhase>(
  {
    description: { type: String },
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

export const ProjectPhase = model<IProjectPhase>(
  "ProjectPhase",
  ProjectPhaseSchema
);
