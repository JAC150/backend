const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
//const auth = require('../middleware/auth'); // Middleware de autenticación

// Validación de URL y autenticación
const validateYouTubeUrl = (url) => {
    return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
};

// POST /api/videos
router.post('/', async (req, res) => {
    const { url, title } = req.body;

    if (!validateYouTubeUrl(url)) {
        return res.status(400).json({ message: 'La URL debe ser válida y pertenecer a YouTube.' });
    }

    try {
        const newVideo = new Video({
            url,
            title,
            userId: req.user.id
        });

        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find({});;
        res.json({
            
            video: videos // Enviando las tareas obtenidas
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/videos/:videoId
router.delete('/:videoId', async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (!video || video.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Video no encontrado o no autorizado.' });
        }

        await video.remove();
        res.json({ message: 'Video eliminado.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;