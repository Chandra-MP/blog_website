import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

const port = 8800;
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        cb(null, Date.now() + file.originalname)
    }
})
const upload  = multer({ storage: storage })
 
app.use(cookieParser());
app.use(express.json());

// Add the CORS middleware and set the headers to set cookies through cross-origin ie localhost:8800 to localhost:3000 and vice versa
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Set the CORS headers for all routes ie for all the pages on the site
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

//upload the files to the client side folder client/public/uploads
app.post('/api/upload', upload.single('file'), function (req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.file
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', true);
    res.status(200).json(file.filename);
    next();
})

//add routes for auth, users and posts
app.use("/api/auth/", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);



app.listen(8800, () => {
    console.log("The server is running at port", port);
});