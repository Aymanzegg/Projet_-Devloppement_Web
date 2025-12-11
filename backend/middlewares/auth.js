const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'mon_secret_temporaire_etudiant'; 


const checkAuth = (req, res, next) => {
    
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ error: "Accès interdit. Connectez-vous." });
    }

    const token = header.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(401).json({ error: "Token invalide ou expiré." });
    }
};


const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: "Accès réservé aux administrateurs." });
    }
};

module.exports = { checkAuth, checkAdmin };