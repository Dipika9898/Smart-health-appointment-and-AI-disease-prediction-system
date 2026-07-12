import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js'

//  API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    //email format validating
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    //valiadating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    //user data save in database
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // use the ID from the middleware
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update the user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {name,phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // update user info
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address:JSON.parse(address), // store as string; removed JSON.parse
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// logic to book appointment by the user 
const bookAppointment = async (req,res) => {
  try {
    const { docId, slotDate, slotTime } = req.body
    const userId = req.userId  // <- this is from auth middleware

    if (!userId) return res.json({ success: false, message: "User not found" })

    const docData = await doctorModel.findById(docId).select('-password')
    if (!docData) return res.json({ success: false, message: "Doctor not found" })
    if (!docData.available) return res.json({ success: false, message: "Doctor not available" })

    let slots_booked = docData.slots_booked || {}

    // Check slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = [slotTime]
    }

    const userData = await userModel.findById(userId).select('-password')

    // Remove slot history before saving
    const docCopy = { ...docData._doc }
    delete docCopy.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docCopy,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Booked' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// api to get user appointment for frontend my-appointment page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });

    // sort by slotDate and slotTime
    appointments.sort((a, b) => {
      const [dayA, monthA, yearA] = a.slotDate.split('_').map(Number);
      const [dayB, monthB, yearB] = b.slotDate.split('_').map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA, ...a.slotTime.split(':').map(Number));
      const dateB = new Date(yearB, monthB - 1, dayB, ...b.slotTime.split(':').map(Number));

      return dateB - dateA; // descending: latest first
    });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// logic to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body; // only get appointmentId from frontend
    const userId = req.userId;           // from auth middleware

    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID missing" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // verify appointment user
    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked || {};
    slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//  payemnt 
// verify eSewa payment
const verifyEsewaPayment = async (req, res) => {
  try {
    const { amount, pid, token } = req.body; // token = refId from eSewa
    const merchantId = "EPAYTEST"; // your Merchant ID

    const response = await axios.post(
      "https://uat.esewa.com.np/epay/transrec",
      null,
      {
        params: {
          amt: amount,
          scd: merchantId,
          rid: token, // refId sent by eSewa
          pid: pid
        }
      }
    );

    if (response.data.includes("Success")) {
      await appointmentModel.findByIdAndUpdate(pid, { paid: true });
      res.json({ success: true, message: "Payment verified" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify Khalti payment
const verifyKhaltiPayment = async (req, res) => {
  try {
    const { token, amount, appointmentId } = req.body;

    const response = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      { token, amount }, // amount in paisa
      { headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` } }
    );

    if (response.data.state === 'Completed') {
      await appointmentModel.findByIdAndUpdate(appointmentId, { paid: true });
      res.json({ success: true, message: "Payment verified" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointment,cancelAppointment,verifyEsewaPayment, verifyKhaltiPayment};