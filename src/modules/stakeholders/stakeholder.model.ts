import {
  AddressSchema,
  LocationSchema,
  ContactPersonSchema,
} from "../pius/piu.model";
import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";

export enum LEVELS {
  WEAK = "Weak",
  MEDIUM = "Medium",
  STRONG = "Strong",
}

export enum METHODS_OF_CONTACT {
  ZOOM = "Zoom",
  EMAIL = "Email",
  PHONE = "Phone",
  PHYSICAL = "Physical",
  WHATSAPP = "Whatsapp",
}

export enum STAKEHOLDER_ROLES {
  VENDOR = "Vendor",
  ADVISOR = "Advisor",
  APPROVER = "Approver",
  CONTRACTOR = "Contractor",
  BENEFICIARY = "Beneficiary",
}

export interface ICompany extends Document {
  name: string;
  logo: string;
  email: string;
  websiteLink: string;
  phoneNumber: string;
  stakeholderPosition: string;
}

export interface IStakeholder extends Document {
  name: string;
  role: string;
  type: string;
  logo: string;
  scope: string;
  email: string;
  gender: string;
  address: Object;
  company: Object;
  concern: string;
  location: Object;
  disability: string;
  phoneNumber: string;
  description: string;
  websiteLink: string;
  goals: Array<string>;
  contactPerson: Object;
  sectors: Array<string>;
  levelOfInterest: string;
  levelOfInfluence: string;
  project: IProject["_id"];
  relationshipHolder: Object;
  bestMethodOfContact: string;
}

export const CompanySchema = new Schema<ICompany>(
  {
    logo: String,
    websiteLink: String,
    stakeholderPosition: String,
    phoneNumber: { type: String },

    email: {
      type: String,
      required: [true, "Company email is required!."],
    },

    name: { type: String, required: [true, "Company name is required!."] },
  },
  { timestamps: true }
);

const StakeholderSchema = new Schema<IStakeholder>(
  {
    logo: String,
    gender: String,
    goals: [String],
    concern: String,
    sectors: [String],
    disability: String,
    websiteLink: String,
    description: String,
    company: { type: CompanySchema },
    name: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    location: { type: LocationSchema, required: true },
    contactPerson: { type: ContactPersonSchema, required: true },
    relationshipHolder: { type: ContactPersonSchema, required: true },

    levelOfInterest: {
      index: true,
      type: String,
      enum: [LEVELS],
      required: true,
    },

    levelOfInfluence: {
      index: true,
      type: String,
      enum: [LEVELS],
      required: true,
    },

    role: {
      index: true,
      type: String,
      required: true,
      enum: [STAKEHOLDER_ROLES],
    },

    bestMethodOfContact: {
      type: String,
      enum: [METHODS_OF_CONTACT],
    },

    scope: {
      index: true,
      type: String,
      required: true,
      enum: ["Internal", "External"],
    },

    project: {
      index: true,
      ref: "Project",
      type: Schema.Types.ObjectId,
      required: [true, "Project-id is required!."],
    },

    email: {
      index: true,
      type: String,
      required: [true, "Stakeholder email is required!."],
    },

    type: {
      index: true,
      type: String,
      required: true,
      enum: ["Individual", "Organizational", "Positional"],
    },

    phoneNumber: {
      index: true,
      type: String,
      required: [true, "Stakeholder phoneNumber is required!."],
    },
  },
  { timestamps: true }
);

export const Stakeholder = model<IStakeholder>(
  "Stakeholder",
  StakeholderSchema
);
