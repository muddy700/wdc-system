import {
  AddressSchema,
  LocationSchema,
  ContactPersonSchema,
} from "../pius/piu.model";
import { Schema, Document, model } from "mongoose";
import { IProject } from "../projects/project.model";

export enum LEVELS {
  WEAK = "weak",
  MEDIUM = "medium",
  STRONG = "strong",
}

export enum METHODS_OF_CONTACT {
  EMAIL = "email",
  PHONE = "phone",
  PHYSICAL = "physical",
}

export enum STAKEHOLDER_ROLES {
  ADVISOR = "advisor",
  APPROVER = "approver",
  SUPPLIER = "supplier",
  CONTRACTOR = "contractor",
  BENEFICIARY = "beneficiary",
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
  address: object;
  company: object;
  concern: string;
  location: object;
  disability: string;
  phoneNumber: string;
  description: string;
  websiteLink: string;
  goals: Array<string>;
  contactPerson: object;
  sectors: Array<string>;
  levelOfInterest: string;
  levelOfInfluence: string;
  project: IProject["_id"];
  relationshipHolder: object;
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
      enum: ["internal", "external"],
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
      enum: ["individual", "organizational", "positional"],
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
