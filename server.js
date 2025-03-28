const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    
    if (!url || !url.includes('tiktok.com')) {
        return res.status(400).json({ error: "Invalid TikTok URL" });
    }

    try {
        const response = await axios.get(`https://snaptik.app/api/download?url=${url}`);
        res.json({ video_url: response.data.video_url });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch video. Please try again later." });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));