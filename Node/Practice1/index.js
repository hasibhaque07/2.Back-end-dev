const express = require('express');

const app = express();
const multer = require('multer');
const path = require('path');

const UPLOADS_FOLDER = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') + "-" + Date.now();
        cb(null, fileName + fileExt);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000, // in byte; 1Mb = 10^6 byte
    },
    fileFilter: (req, file, cb) => {
        // cb - call back
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/png'
            ) {
                cb(null, true);
            } else {
                // cb(null, false);
                cb(new Error('only .jpg, .jpeg or .png format allowed'));
            }
        } else if (file.fieldname === 'doc') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('only .pdf file is allowed!'));
            }
        } else {
            cb(new Error('there was an unknown error'));
        }
    },
});

app.post(
    '/',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'doc', maxCount: 1 },
    ]),
    (req, res) => {
        res.send('hello world');
    },
);

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(err.message);
    } else {
        res.send('success');
    }
});

app.listen(3000, () => {
    console.log('listening on post 3000');
});
