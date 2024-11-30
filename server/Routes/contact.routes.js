// import express from 'express'
// import userCtrl from '../Controllers/contact.controller.js'

// const router = express.Router()
// router.route('/api/contacts').post(userCtrl.create)
// router.route('/api/contacts').get(userCtrl.list)
// export default router

import express from 'express'
import cors from 'cors'
import contactCtrl from '../Controllers/contact.controller.js'

const router = express.Router()

const corsOptions = {
  origin: 'https://faceplate.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}

// Apply CORS middleware to all routes
router.use('/api/contacts', cors(corsOptions))

// Handle preflight requests for all routes
router.options('/api/contacts', cors(corsOptions))

router.route('/api/contacts')
  .post(cors(corsOptions), contactCtrl.create)
  .get(cors(corsOptions), contactCtrl.list)

export default router