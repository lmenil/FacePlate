import express from 'express'
import cors from 'cors'
import authCtrl from '../Controllers/auth.controller.js'

const router = express.Router()

const corsOptions = {
  origin: 'https://faceplate.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}

// Apply CORS middleware specifically for auth routes
router.use('/auth', cors(corsOptions))

// Handle preflight requests for auth routes
router.options('/auth/signin', cors(corsOptions))
router.options('/auth/signout', cors(corsOptions))

// Signin route with CORS enabled
router.route('/auth/signin')
  .options(cors(corsOptions))
  .post(cors(corsOptions), authCtrl.signin)

// Signout route with CORS enabled
router.route('/auth/signout')
  .options(cors(corsOptions))
  .get(cors(corsOptions), authCtrl.signout)

export default router
