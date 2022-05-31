import { Schema, Document, model } from "mongoose";

export interface ILocation extends Document {
  name: string;
  latitude: string;
  longitude: string;
}

export interface IAddress extends Document {
  street: string;
  region: string;
  country: string;
  district: string;
  postalCode: string;
}

export interface IContactPerson extends Document {
  name: string;
  email: string;
  gender: string;
  position: string;
  disability: string;
  phoneNumber: string;
  description: string;
  physicalAddress: string;
}

export interface IPiu extends Document {
  logo: string;
  email: string;
  vision: string;
  mission: string;
  address: object;
  location: object;
  yearFound: number;
  websiteLink: string;
  phoneNumber: string;
  abbreviation: string;
  contactPerson: object;
  sectors: Array<string>;
  registeredName: string;
  branches: Array<object>;
  registrationNumber: string;
  socialMedias: Array<object>;
}

export const AddressSchema = new Schema<IAddress>(
  {
    street: String,
    region: String,
    country: String,
    district: String,
    postalCode: String,
  },
  { timestamps: true }
);

export const LocationSchema = new Schema<ILocation>(
  {
    name: String,
    latitude: String,
    longitude: String,
  },
  { timestamps: true }
);

export const ContactPersonSchema = new Schema<IContactPerson>(
  {
    name: String,
    email: String,
    gender: String,
    position: String,
    disability: String,
    phoneNumber: String,
    description: String,
    physicalAddress: String,
  },
  { timestamps: true }
);

const PiuSchema = new Schema<IPiu>(
  {
    logo: String,
    email: String,
    vision: String,
    mission: String,
    yearFound: Number,
    websiteLink: String,
    phoneNumber: String,
    abbreviation: String,
    registeredName: String,
    address: AddressSchema,
    location: LocationSchema,
    registrationNumber: String,
    sectors: [{ type: String }],
    contactPerson: ContactPersonSchema,
    branches: [{ LocationSchema, AddressSchema }],
    socialMedias: [{ name: String, url: String }],
  },
  { timestamps: true }
);

export const Piu = model<IPiu>("Piu", PiuSchema);
