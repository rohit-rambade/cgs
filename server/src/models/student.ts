import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  courseName: string;
  dateOfApproval: Date;
  certificateLink: String;
}

const studentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courseName: { type: String, required: true },
  dateOfApproval: { type: Date, required: true },
  certificateLink: { type: String },
});

const Student: Model<IStudent> = mongoose.model<IStudent>(
  "Student",
  studentSchema
);

export default Student;
