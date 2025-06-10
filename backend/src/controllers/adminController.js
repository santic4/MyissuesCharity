import { JWT_SECRET } from "../config/config.js";
import { AdminUser } from "../models/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res, next) => {
    const { username, password, permissions } = req.body;
    try {
        if(!username || !password) throw new Error('Required fields are missing.');

        const existing = await AdminUser.findOne({ where: { username }});
        if(existing) throw new Error('Admin already exists.')

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const admin = await AdminUser.create({
            username,
            password_hash: hash,
            permissions
        })

        if(!admin) throw new Error('Error to create admin.')
        res.status(201).json({ message: "Adminstrator created.", admin: { id: admin.id, username: admin.username }});
    } catch (error) {
        next(error)
    }
}

export const loginAdmin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if(!username || !password) throw new Error('Required fields are missing.');

        const admin = await AdminUser.findOne({ where: { username }});

        if(!admin) throw new Error('Admin not found.')

        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if(!isMatch) throw new Error('Invalid credentials.');

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            JWT_SECRET,
            {expiresIn: "8h"}
        )

        res.json({ message: "Login.", token });
    } catch (error) {
        next(error)
    }
}