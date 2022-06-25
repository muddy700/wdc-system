import { Schema, Document, model } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    description: String,

    name: {
      index: true,
      type: String,
      required: [true, "Department name is required!."],
    },
  },
  { timestamps: true }
);

export const Department = model<IDepartment>("Department", DepartmentSchema);
