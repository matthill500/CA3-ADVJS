import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message: "User not found."});

        const passwordCheck = await bcrypt.compare(password, existingUser.password);

        if(!passwordCheck) return res.status(400).json({message: "password incorrect."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token });
    }catch(err){
        res.status(500).json({message: 'something went wrong.'});
    }
}

export const register = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(404).json({message: "User exists."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result, token });

    }catch(err){
        res.status(500).json({message: 'something went wrong.'});
    }
}

