import mongoose, { Document, Schema } from "mongoose";

export interface IAvailableSlot {
  day: string; // ISO date-time string
  slots: string; // ISO date-time string
}

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  specialization: string[];
  experience: number;
  qualifications: string[];
  bio?: string;
  gender?: string;
  languages?: string[];
  location: string;
  profileImage?: string;
  availableSlots: IAvailableSlot[];
  isAvailable: Boolean;
  isApproved:Boolean;
  status: "active" | "inactive";
  rating?: number;
  reviews?: string[];
}

const availableSlotSchema = new Schema<IAvailableSlot>(
  {
    day: { type: String, required: true },
    slots: [{ type: String, required: true }],
  },
  { _id: false }
);

const doctorSchema = new Schema<IDoctor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    specialization: [{ type: String, required: true, index: true }],
    experience: { type: Number, required: true },
    qualifications: [{ type: String, required: true }],
    bio: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    languages: [{ type: String }],
    location: { type: String, required: true, index: true },
    profileImage: { type: String }, // URL to cloudinary or local file
    availableSlots: [availableSlotSchema],
    isAvailable: { type: Boolean, default: true },
    isApproved:{type:Boolean,default:false},

    status: { type: String, enum: ["active", "inactive"], default: "active" },
    rating: { type: Number, default: 0 },
    reviews: [{ type: String }],
  },
  { timestamps: true }
);

export const DoctorModel = mongoose.model<IDoctor>("DoctorModel", doctorSchema);
