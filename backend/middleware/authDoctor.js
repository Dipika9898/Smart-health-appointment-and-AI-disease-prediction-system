import jwt from 'jsonwebtoken';

const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Read Authorization header

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach doctor id to req
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }
};

export default authDoctor;