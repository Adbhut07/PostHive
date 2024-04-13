import zod from 'zod';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

const signupBody = zod.object({
    username: zod.string(),
    email: zod.string().email(),
	password: zod.string().min(6),
    confirmPassword: zod.string(),
});

const signinBody = zod.object({
    username: zod.string(),
	password: zod.string()
});

export const signup = async (req,res)=>{
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
    try{
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
            await newUser.save();
            //generating jwt
          generateTokenAndSetCookie(newUser._id, newUser, res);

          
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
    } catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const signin = async(req, res) =>{
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    try{
        const validUser = await User.findOne({username: req.body.username});
        if(!validUser){
            return res.status(400).json({error: "Invalid username or password"});
        }
        const validPassword = await bcrypt.compare(req.body.password, validUser?.password);
        if(!validPassword){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(validUser._id, validUser, res);
    } catch(error){
        console.log("Error in signin controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const google = async (req, res)=>{
    const {email, name, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({username: name});
        if(user){
            generateTokenAndSetCookie(user._id, user, res);
            return;
        }
        else{
            const generatedRandomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedRandomPassword, salt);

            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
              });
              await newUser.save();

              generateTokenAndSetCookie(newUser._id, newUser, res);
        }
    } catch(error) {
        console.log("Error in googleAuth controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}