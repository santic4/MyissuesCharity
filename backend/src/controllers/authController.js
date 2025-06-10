import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../services/user/userServices.js';
import { AdminUser } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '8h';

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User already exists.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser( name, email, passwordHash, role );

    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    next(err)
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    
    const user = await getUserByEmail(identifier);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    next(err)
  }
};

export const loginAdminAuth = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    
    const admin = await AdminUser.findOne({ where: { username: identifier }});

    if (!admin) return res.status(404).json({ error: 'Admin not found.' });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = jwt.sign(
      { sub: admin.id, role: 'admin' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    next(err)
  }
};