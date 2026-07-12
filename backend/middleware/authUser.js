import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // read Authorization header

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to req
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }
};

export default authUser;