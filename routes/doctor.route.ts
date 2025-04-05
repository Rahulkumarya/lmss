import express, {Response,Request, NextFunction } from 'express'
import { createDoctorProfile,updateDoctorProfile,getDoctorProfile,getAllDoctors,searchDoctors,toggleAvailability,deleteDoctorProfile, approveDoctor } from '../controllers/doctor.controller';
import { DoctorModel } from '../modals/doctor.model';
import { isAuthneticated,authorizeRoles } from '../middleware/auth';

const doctorRoute=express.Router();






//create doctor profile 

doctorRoute.post('/d-create-profile',createDoctorProfile);


//updateDotorProfile 
doctorRoute.put("/d-update-profile/:id", updateDoctorProfile);

//get doctor profile (individually)
doctorRoute.get('/d-getSingle-profile/:id',getDoctorProfile);

//get all doctor profile 
doctorRoute.get('/d-allDoctor-profile',getAllDoctors);

//doctor search by name and specilization or any others keywords
doctorRoute.get('/d-searchDoctor-profile',searchDoctors);


//doctor toogle (means available or not )
doctorRoute.patch('/d-toogle-profile/:id',toggleAvailability);

doctorRoute.patch(
  "/admin/approve-doctor/:id",
  isAuthneticated,
 authorizeRoles("admin"),
  approveDoctor
);

//doctor delete profile 
doctorRoute.delete('/d-delete-profile/:id',isAuthneticated,deleteDoctorProfile);



export default doctorRoute;