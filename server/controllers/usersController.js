import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'FAILEd' });
        const isPasswordExist = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordExist) return res.status(404).json({ message: 'Invalid' });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })
        res.status(200).JSON({ result: existingUser, token });
    } catch (error) {
        res.status(400).JSON({ message: 'something went wrong' });
    }
}
export const signup = async (req, res) => {
    const { email, password, confirmPassowrd, firstName, lastName } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });
        if (password !== confirmPassowrd) return res.status(400).json({ message: "Doesent Match" });
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};