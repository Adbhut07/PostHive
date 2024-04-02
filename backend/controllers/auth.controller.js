import zod from 'zod';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

const signupBody = zod.object({
    username: zod.string(),
    email: zod.string().email(),
	password: zod.string(),
    confirmPassword: zod.string(),
});

export const signup = async (req,res)=>{
    try{
        const { success } = signupBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message: "Incorrect inputs",
            }) 
        }
        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({
                error: "Password don't match"
            })
        }
        const user = await User.findOne({
            username: req.body.username
        });
        if(user){
            return res.status(400).json({error: "Username already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        if (newUser) {
            //generating jwt
          generateTokenAndSetCookie(newUser._id, res);

          await newUser.save();

          res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
          });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
    } catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}