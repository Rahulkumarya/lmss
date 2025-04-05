import { Request, Response, NextFunction } from "express";
import { DoctorModel } from "../modals/doctor.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

// Create doctor profile
export const createDoctorProfile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
     try {
       const doctor = new DoctorModel(req.body);
       await doctor.save();
       res.status(201).json({ success: true, doctor });
     } catch (error: any) {
       return next(new ErrorHandler(error.message, 400));
     }
  }
);

//update doctor profile 

export const updateDoctorProfile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try{
    const doctorId = req.params.id;
    const updateData = req.body;

    const doctor = await DoctorModel.findByIdAndUpdate(doctorId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!doctor) return next(new ErrorHandler("Doctor not found", 404));

    res.status(200).json({ success: true, doctor });


  }
   catch(error:any){
      return next(new ErrorHandler(error.message,400));
    }
  }
);







// Get doctor profile
export const getDoctorProfile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try{
    const doctorId = req.params.id;
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) return next(new ErrorHandler("Doctor not found", 404));

    res.status(200).json({ success: true, doctor });

    }
     catch(error:any){
        return next(new ErrorHandler(error.message,400));
      }
  }
);


//get all doctors 
export const getAllDoctors = CatchAsyncError(
  async (req: Request, res: Response,next:NextFunction) => {

    try {
      const doctors = await DoctorModel.find();
      res.status(200).json({ success: true, doctors });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);



//search/filtter doctors by specalization or name 
export const searchDoctors = CatchAsyncError(
  async (req: Request, res: Response,next:NextFunction) => {

    try {
      const { specialization, name } = req.query;

      if (!specialization || !name) {
        return next(
          new ErrorHandler("please enter old and new password ", 400)
        );
      }

      const query: any = {};

      if (specialization) {
        query.specialization = { $in: [specialization] };
      }

      if (name) {
        query.$or = [
          { name: { $regex: name, $options: "i" } },
          { specialization: { $regex: name, $options: "i" } },
        ];
      }

      const doctors = await DoctorModel.find(query);
      res.status(200).json({ success: true, doctors });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//toogle for the active and inactive
export const toggleAvailability = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.params.id;
      const doctor = await DoctorModel.findById(doctorId);
      if (!doctor) return next(new ErrorHandler("Doctor not found", 404));

      doctor.isAvailable = !doctor.isAvailable;
      await doctor.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: `Doctor ${doctor.name} (${doctor._id}) is now ${
          doctor.isAvailable ? "available" : "unavailable"
        }`,
        doctorId: doctor._id,
        isAvailable: doctor.isAvailable,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//approve doctor by the admin
export const approveDoctor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctorId = req.params.id;

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) return next(new ErrorHandler("Doctor not found", 404));

    doctor.isApproved = true;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor approved successfully",
      doctor,
    });
  }
);




//delete doctor profile 
export const deleteDoctorProfile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const doctorId = req.params.id;

      const doctor = await DoctorModel.findByIdAndDelete(doctorId);
      if (!doctor) return next(new ErrorHandler("Doctor not found", 404));

      res
        .status(200)
        .json({
          success: true,
          message: "Doctor profile deleted successfully",
        });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);



