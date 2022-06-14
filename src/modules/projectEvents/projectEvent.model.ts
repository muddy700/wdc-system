import { Schema, Document, model } from "mongoose";
import { LocationSchema } from "../pius/piu.model";
import { METHODS_OF_CONTACT } from "../stakeholders/stakeholder.model";
import { IAttachment, AttachmentSchema } from "../projects/project.model";

export interface IProjectEvent extends Document {
  date: Date;
  type: string;
  title: string;
  channel: string;
  location: Object;
  extraTime?: number;
  mainAgenda: string;
  endingTime: number;
  description: string;
  startingTime: number;
  participants: Array<Object>;
  otherAgendas: Array<string>;
  attachments: Array<IAttachment>;
}

const ParticipantSchema = new Schema(
  {
    email: String,
    gender: String,
    phoneNumber: String,
    notify: { type: Boolean, default: true },
    reminder: { type: Boolean, default: true },
    fullName: { type: String, required: true },
    type: { type: String, enum: ["individual", "group"] },
  },
  { timestamps: true }
);

const ProjectEventSchema = new Schema<IProjectEvent>(
  {
    description: String,
    otherAgendas: [String],

    channel: {
      index: true,
      type: String,
      enum: [METHODS_OF_CONTACT],
    },

    attachments: [AttachmentSchema],

    type: {
      type: String,
      enum: ["Seminar", "Workshop", "Meeting"],
    },

    mainAgenda: {
      type: String,
      required: [true, "Main agenda is required!."],
    },

    title: {
      type: String,
      required: [true, "Event title is required!."],
    },

    extraTime: Number,
    participants: [ParticipantSchema],
    location: { type: LocationSchema },
    date: { type: Date, required: true, index: true },
    endingTime: { type: Number, required: true, index: true },
    startingTime: { type: Number, required: true, index: true },
  },
  { timestamps: true }
);

export const ProjectEvent = model<IProjectEvent>(
  "ProjectEvent",
  ProjectEventSchema
);
