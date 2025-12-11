const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'mon_secret_temporaire_etudiant';

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé ou mot de passe incorrect" });
        }

       
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: "Utilisateur non trouvé ou mot de passe incorrect" });
        }

       
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: user.id,
            token: token,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
       
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "Utilisateur créé !", userId: newUser.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};