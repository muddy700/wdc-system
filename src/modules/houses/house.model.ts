import { Schema, Document, model } from "mongoose";

export interface IHouse extends Document {
  owner: Object;
  identificationNumber: string;
}

const OwnerSchema = new Schema(
  {
    email: String,

    fullName: {
      type: String,
      required: [true, "Owner-Full name is required!"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Owner-Phone number  is required!"],
    },

    gender: {
      type: String,
      enum: ["M", "F"],
      required: [true, "Owner-Gender  is required!"],
    },
  },
  { timestamps: true }
);

const HouseSchema = new Schema<IHouse>(
  {
    owner: { type: OwnerSchema },

    identificationNumber: {
      type: String,
      required: [true, "House Identification Number is required!"],
    },
  },
  { timestamps: true }
);

export const House = model<IHouse>("House", HouseSchema);
