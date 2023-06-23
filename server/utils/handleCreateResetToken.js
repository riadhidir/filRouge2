import User from "../models/User.js";
import sendEmail from './email.js'
import {generatePasswordResetToken} from '../controllers/userController.js';
import PasswordResetToken from "../models/PasswordResetToken.js";
const handleCreateResetToken = async (email) => {
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser)
          throw new Error('email not found');
        const resetToken = await generatePasswordResetToken();

        await PasswordResetToken.create({ user: foundUser, token: resetToken });
        
      
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
        sendEmail(foundUser.email, `${resetLink}`);
        return 
    } catch (err) {
        throw err;
    }
}

export default handleCreateResetToken