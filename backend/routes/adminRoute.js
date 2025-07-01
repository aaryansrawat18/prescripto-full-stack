import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard, deleteDoctor, deleteAppointment } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.post("/delete-doctor", authAdmin, deleteDoctor)
adminRouter.post("/delete-appointment", authAdmin, deleteAppointment)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;