const express = require('express');
const sharp = require('sharp');

const app = express();
const PORT = 3000;

app.get('/initials', async (req, res) => {
    const { firstName, lastName } = req.query;

    if (!firstName || !lastName) {
        return res.status(400).send('Missing firstName or lastName');
    }

    const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    try {
        const svgImage = `
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#ffcc00" />
                <text x="50%" y="50%" font-family="Arial" font-size="100" text-anchor="middle" fill="#000000" dy=".3em">${initials}</text>
            </svg>`;

        const buffer = Buffer.from(svgImage);
        const image = await sharp(buffer).png().toBuffer();

        res.set('Content-Type', 'image/png');
        res.send(image);
    } catch (err) {
        res.status(500).send('Error generating image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
