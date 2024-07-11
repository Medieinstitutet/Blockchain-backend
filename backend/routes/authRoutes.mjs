import express from 'express';
import {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword,
} from '../controllers/authController.mjs';
import { protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.get('/getuser', protect, getUser);
router.put('/updateuser', protect, updateUserDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;
