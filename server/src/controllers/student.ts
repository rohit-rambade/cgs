import { query, Request, Response } from "express";
import Student, { IStudent } from "../models/student";
import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
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

export const generateCertificate = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Get Student Data
    const student: IStudent | null = await Student.findById(id);

    if (!student) {
      res.status(404).json({
        status: false,
        message: "Student Not Found",
      });
    }

    // Certificate  Template Path
    const templatePath = path.join(__dirname, "../static/TDC.pdf");
    const templateBuffer = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBuffer);

    // Load Custom Font
    pdfDoc.registerFontkit(fontkit);
    const fontPath = path.join(__dirname, "../assets/Poppins-Bold.ttf");
    const fontBytes = fs.readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];

    const studentNameToDraw = student?.name || "FirstName LastName";
    page.setFont(customFont);
    page.drawText(studentNameToDraw, {
      x: 250,
      y: 380,
      size: 44,
      color: rgb(0.8627450980392157, 0.6784313725490196, 0.2823529411764706),
    });

    page.drawText(
      `For successfully completing the ${
        student?.courseName || "Course Name"
      } \n course on ${student?.dateOfApproval || "Date"}.`,
      {
        x: 180,
        y: 340,
        size: 18,

        color: rgb(0, 0, 0),
      }
    );

    page.drawText(`JFHSDFS-545`, {
      x: 650,
      y: 64.5,
      size: 14,

      color: rgb(0, 0, 0),
    });

    // Save Generated Certificate
    const outputPath = path.join(__dirname, "../static/certificate.pdf");
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    res.status(201).json({
      success: true,
      message: "Certificate generated and saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
