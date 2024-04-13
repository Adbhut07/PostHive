import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,user,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    const {password, ...rest} = user._doc;

    res.status(200).cookie("jwt", token,{
        maxAge: 15*24*60*1000, //in ,milliSeconds
        httpOnly: true,  // prevent xss attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attack
    }).json(rest);
}

export default generateTokenAndSetCookie;