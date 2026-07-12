import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,verifyEsewaPayment, verifyKhaltiPayment } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()
// Auth and profile

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

// Appointments
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

// Payments
userRouter.post('/payment/esewa/verify', authUser, verifyEsewaPayment)
userRouter.post('/payment/khalti/verify', authUser, verifyKhaltiPayment)





export default userRouter
