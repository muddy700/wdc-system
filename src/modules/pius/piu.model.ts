import { Schema, Document, model } from "mongoose";

export interface ILocation extends Document {
  name: string;
  latitude?: string;
  longitude?: string;
}

export interface IAddress extends Document {
  region: string;
  country: string;
  street?: string;
  district: string;
  postalCode?: string;
}

export interface IContactPerson extends Document {
  name: string;
  email: string;
  gender: string;
  position: string;
  disability?: string;
  phoneNumber?: string;
  description?: string;
  physicalAddress?: string;
}

export interface IPiu extends Document {
  logo?: string;
  email: string;
  vision?: string;
  address: object;
  mission?: string;
  location: object;
  yearFound?: number;
  phoneNumber: string;
  websiteLink?: string;
  abbreviation?: string;
  contactPerson: object;
  registeredName: string;
  sectors?: Array<string>;
  branches?: Array<object>;
  registrationNumber?: string;
  socialMedias?: Array<object>;
}

export const AddressSchema = new Schema<IAddress>(
  {
    street: String,
    postalCode: String,
    region: { type: String, required: true },
    country: { type: String, required: true },
    district: { type: String, required: true },
  },
  { timestamps: true }
);

export const LocationSchema = new Schema<ILocation>(
  {
    latitude: String,
    longitude: String,
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactPersonSchema = new Schema<IContactPerson>(
  {
    disability: String,
    description: String,
    phoneNumber: String,
    physicalAddress: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
  },
  { timestamps: true }
);

const PiuSchema = new Schema<IPiu>(
  {
    logo: String,
    vision: String,
    mission: String,
    yearFound: Number,
    websiteLink: String,
    abbreviation: String,
    registrationNumber: String,
    sectors: [{ type: String }],
    email: { type: String, required: true },
    branches: [{ LocationSchema, AddressSchema }],
    socialMedias: [{ name: String, url: String }],
    phoneNumber: { type: String, required: true },
    registeredName: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    location: { type: LocationSchema, required: true },
    contactPerson: { type: ContactPersonSchema, required: true },
  },
  { timestamps: true }
);

export const Piu = model<IPiu>("Piu", PiuSchema);
