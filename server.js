const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = 3000;

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

app.use(express.static(PUBLIC_DIR));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/api/files', (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            return res.status(500).json({ error: 'Failed to list files.' });
        }
        res.json(files);
    });
});


app.post('/upload', upload.single('fileToUpload'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    res.json({ message: 'File uploaded successfully!', filename: req.file.originalname });
});


app.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(UPLOADS_DIR, filename);

    res.download(filePath, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).send('File not found.');
            }
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    const localUrl = `http://localhost:${PORT}`;
    console.log(`\n✅ Server is running!`);
    console.log(`> Local:   ${localUrl}`);

    const TARGET_INTERFACE = 'Wi-Fi';
    const interfaces = os.networkInterfaces();

    if (interfaces[TARGET_INTERFACE]) {
        interfaces[TARGET_INTERFACE].forEach((iface) => {
            if (iface.family === 'IPv4' && !iface.internal) {
                // console.log(`Wi-Fi IP Address: ${iface.address}`);
                const networkUrl = `http://${iface.address}:${PORT}`;
                console.log(`> Network: ${networkUrl}`);
                console.log('\nScan the QR code below with your phone to access from your mobile device:');
                qrcode.generate(networkUrl, { small: true });
            }
        });
    } else {
        console.log(`Interface "${TARGET_INTERFACE}" not found.`);
    }
});