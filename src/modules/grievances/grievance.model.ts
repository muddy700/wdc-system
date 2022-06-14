import { IUser } from "../users/user.model";
import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";
import { IDepartment } from "../departments/department.model";
import { AttachmentSchema, IAttachment } from "../projects/project.model";

export interface IGrievance extends Document {
  nature: string;
  status: number;
  resolvedOn?: Date;
  complainer: Object;
  description: string;
  dateOfIncident?: Date;
  incidentCount?: number;
  reporter: IUser["_id"];
  project: IProject["_id"];
  estimatedResolveDate: Date;
  frequencyOfIncident?: number;
  complainerSuggestions?: string;
  department: IDepartment["_id"];
  attachments?: Array<IAttachment>;
}

export enum GRIEVANCE_STATUSES {
  RECEIVED = 0,
  RESOLVED = 3,
  INPROGRESS = 2,
  INVESTIGATION = 1,
}

export enum GRIEVANCE_INCIDENTS {
  ONETIME = 0,
  ONGOING = 1,
  REPEATEDLY = 2,
}

const ComplainerSchema = new Schema(
  {
    email: String,
    phoneNumber: String,
    fullName: { type: String, required: true },
  },
  { timestamps: true }
);

const GrievanceSchema = new Schema<IGrievance>(
  {
    resolvedOn: Date,
    dateOfIncident: Date,
    incidentCount: Number,
    estimatedResolveDate: Date,
    complainerSuggestions: String,
    attachments: [AttachmentSchema],

    description: {
      type: String,
      required: true,
    },

    reporter: {
      index: true,
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },

    project: {
      index: true,
      ref: "Project",
      required: true,
      type: Schema.Types.ObjectId,
    },

    department: {
      index: true,
      required: true,
      ref: "Department",
      type: Schema.Types.ObjectId,
    },

    frequencyOfIncident: {
      type: Number,
      requied: true,
      enum: [GRIEVANCE_INCIDENTS],
    },

    nature: {
      type: String,
      required: true,
      enum: [
        "Other",
        "Demotion",
        "Discipline",
        "Denial of benefits",
        "Classification Desputes",
      ],
    },

    status: {
      type: Number,
      enum: [GRIEVANCE_STATUSES],
      default: GRIEVANCE_STATUSES.RECEIVED,
    },

    complainer: { type: ComplainerSchema, required: true },
  },
  { timestamps: true }
);

export const Grievance = model<IGrievance>("Grievance", GrievanceSchema);
