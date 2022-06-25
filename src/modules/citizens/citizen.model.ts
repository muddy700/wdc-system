import { Schema, Document, model } from "mongoose";

export interface ICitizen extends Document {
  dob: Date;
  house: string;
  email?: string;
  title?: string;
  gender: string;
  region: string;
  street: string;
  lastName: string;
  district: string;
  religion: string;
  firstName: string;
  disability: string;
  middleName?: string;
  phoneNumber?: string;
  maritalStatus?: string;
}

const CitizenSchema = new Schema<ICitizen>(
  {
    title: String,
    email: String,
    middleName: String,
    phoneNumber: String,
    maritalStatus: String,

    street: {
      type: String,
      required: [true, "Street is required!"],
    },

    region: {
      type: String,
      required: [true, "Region is required!"],
    },

    district: {
      type: String,
      required: [true, "District is required!"],
    },

    religion: {
      index: true,
      type: String,
      required: [true, "Religion is required!"],
    },

    disability: {
      index: true,
      type: String,
      required: [true, "Disability field is required!"],
    },

    house: {
      index: true,
      type: String,
      required: [true, "House is required!"],
    },

    dob: {
      index: true,
      type: Date,
      required: [true, "Date of birth is required!"],
    },

    firstName: {
      index: true,
      type: String,
      required: [true, "First name is required!"],
    },

    lastName: {
      index: true,
      type: String,
      required: [true, "Last name is required!"],
    },

    gender: {
      index: true,
      type: String,
      enum: ["M", "F"],
      required: [true, "Gender  is required!"],
    },
  },
  { timestamps: true }
);

export const Citizen = model<ICitizen>("Citizen", CitizenSchema);
