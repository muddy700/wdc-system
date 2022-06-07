import { IPiu } from "../pius/piu.model";
import { Schema, Document, model } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  piu: IPiu["_id"];
  description?: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    description: String,

    piu: {
      ref: "Piu",
      index: true,
      required: true,
      type: Schema.Types.ObjectId,
    },

    name: {
      index: true,
      type: String,
      required: [true, "Department name is required!."],
    },
  },
  { timestamps: true }
);

export const Department = model<IDepartment>("Department", DepartmentSchema);
