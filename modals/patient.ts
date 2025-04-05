import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  age: number;
  gender: string;
  contactNumber: string;
  address: string;
  medicalHistory: string[];
  allergies?: string[];
}

const patientSchema = new Schema<IPatient>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    medicalHistory: [{ type: String }],
    allergies: [{ type: String }],
  },
  { timestamps: true }
);

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
