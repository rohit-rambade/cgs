import { Request, Response } from "express";
import Student, { IStudent } from "../models/student";

export const addStudentData = async (req: Request, res: Response) => {
  const { name, email, courseName, dateOfApproval }: IStudent = req.body;

  try {
    if (!name || !email || !courseName || !dateOfApproval) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }
    const student: IStudent = new Student({
      name,
      email,
      courseName,
      dateOfApproval,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Student Added",
    });
  } catch (error) {
    res.status(400).json({ success: true, message: error });
  }
};
