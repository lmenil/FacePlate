import express from 'express' 
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from '../server/template.js'
import userRoutes from './Routes/user.routes.js'
import authRoutes from './Routes/auth.routes.js'
import recipeRoutes from './Routes/recipe.routes.js'
import contactRoutes from './Routes/contact.routes.js'
import path from 'path';

    const app = express()
    const CURRENT_WORKING_DIR = process.cwd();
    app.use(express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use('/', userRoutes)
   app.use('/', authRoutes)
   app.use('/', recipeRoutes)
   app.use('/', contactRoutes)
   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cookieParser())
   app.use(compress())
   app.use(helmet())
   // Configure and apply CORS
const corsOptions = {
  origin: 'https://faceplate.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions))
   app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })  
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message}) 
        }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message}) 
        console.log(err)
        } 
        })
          
   export default app
