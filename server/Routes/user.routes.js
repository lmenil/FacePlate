// import express from 'express'
// import userCtrl from '../Controllers/user.controller.js'
// import authCtrl from '../Controllers/auth.controller.js'
// const router = express.Router()
// router.route('/api/users').post(userCtrl.create)
// router.route('/api/users').get(userCtrl.list)
// router.route('/api/users/:userId')
// .get(authCtrl.requireSignin, userCtrl.read)
// .put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
// userCtrl.update)
// .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
// userCtrl.remove)
// router.param('userId', userCtrl.userByID)
// router.route('/api/users/:userId').get(userCtrl.read)
// router.route('/api/users/:userId').put(userCtrl.update)
// router.route('/api/users/:userId').delete(userCtrl.remove)
// export default router

import express from 'express'
import cors from 'cors'
import userCtrl from '../Controllers/user.controller.js'
import authCtrl from '../Controllers/auth.controller.js'

const router = express.Router()

const corsOptions = {
  origin: 'https://faceplate.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}

// Apply CORS middleware to all routes
router.use('/api/users', cors(corsOptions))

// Handle preflight requests for all routes
router.options('/api/users', cors(corsOptions))
router.options('/api/users/:userId', cors(corsOptions))

router.route('/api/users')
  .post(cors(corsOptions), userCtrl.create)
  .get(cors(corsOptions), userCtrl.list)

router.route('/api/users/:userId')
  .get(cors(corsOptions), authCtrl.requireSignin, userCtrl.read)
  .put(cors(corsOptions), authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(cors(corsOptions), authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// These routes seem redundant, but I'm keeping them as per your original file
router.route('/api/users/:userId')
  .get(cors(corsOptions), userCtrl.read)
  .put(cors(corsOptions), userCtrl.update)
  .delete(cors(corsOptions), userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router

