import { IPiu } from "../pius/piu.model";
import { Schema, Document, model } from "mongoose";

// TODO: Change piu from string into [piu-id]

export enum ATTACHMENT_TYPES {
  PDF = "pdf",
  AUDIO = "audio",
  VIDEO = "video",
  IMAGE = "image",
}

export interface IAttachment extends Document {
  url: string;
  type: string;
  title: string;
  description: string;
}

export interface IProject extends Document {
  name: string;
  endDate: Date;
  budget: number;
  progres: number;
  country: string;
  startDate: Date;
  piu: IPiu["_id"];
  continent: string;
  description: string;
  abbreviation: string;
  attachments: Array<IAttachment>;
}

const AttachmentSchema = new Schema<IAttachment>(
  {
    description: String,

    type: {
      type: String,
      require: [true, "Attachment type is required!."],
    },

    title: {
      type: String,
      require: [true, "Attachment title is required!."],
    },

    url: { type: String, require: [true, "Attachment url is required!."] },
  },
  { timestamps: true }
);

const ProjectSchema = new Schema<IProject>(
  {
    endDate: Date,
    budget: Number,
    startDate: Date,
    country: String,
    progress: Number,
    continent: String,
    description: String,
    abbreviation: String,
    attachments: [AttachmentSchema],

    piu: {
      ref: "Piu",
      index: true,
      required: true,
      type: Schema.Types.ObjectId,
    },

    name: { type: String, required: [true, "Project name is required!"] },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", ProjectSchema);
