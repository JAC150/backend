const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Validación de la URL de YouTube
                return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(v);
            },
            message: props => `${props.value} no es una URL válida de YouTube!`
        }
    },
    title: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
/*
// middleware/auth.js
// https://github.com/
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' });
    }
};
*/
module.exports = mongoose.model('Video', videoSchema);

//module.exports = auth;