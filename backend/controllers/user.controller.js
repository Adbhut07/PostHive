import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req,res)=>{
    res.json({message: "api is working"})
}

export const updateUser = async(req, res) =>{
    if(req.user.userId !== req.params.userId){
        return res.status(403).json({error: "you are not allowed to update this user"});
    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return res.status(400).json({error: "password must be atleast 6 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password =  await bcrypt.hash(req.body.password, salt);   
    }
    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 20) {
          return res.status(400).json({error: "Username must be between 7 and 20 characters"});
        }
        if (req.body.username.includes(' ')) {
            return res.status(400).json({error: "Username cannot contain spaces"});
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return res.status(400).json({error: 'Username must be lowercase'});
        }
        if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
            return res.status(400).json({error: 'Username can only contain letters and numbers'});
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              profilePicture: req.body.profilePicture,
              password: req.body.password,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"}); 
    }

}