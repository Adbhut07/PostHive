import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,user,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.status(200).cookie("jwt", token,{
        maxAge: 15*24*60*1000, //in ,milliSeconds
        httpOnly: true,  // prevent xss attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attack
    }).json({
        _id: user._id,
        username: user.username,
        email: user.email,
    });
}

export default generateTokenAndSetCookie;