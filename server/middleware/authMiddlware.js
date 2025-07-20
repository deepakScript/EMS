import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Token not provided or malformed' });
    }

    // ✅ Correctly extract token (split by space, not empty string)
    const token = authHeader.split(' ')[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    // ✅ Fetch user from DB (no need to wrap _id in object)
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ success: false, error: 'Server error during token verification' });
  }
};

export default verifyUser;
