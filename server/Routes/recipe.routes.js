// import express from 'express'
// import recipeCtrl from '../Controllers/recipe.controller.js'
// import authCtrl from '../Controllers/auth.controller.js'

// const router = express.Router()



// router.route('/api/recipes')
//   .post(authCtrl.requireSignin, authCtrl.setUser, recipeCtrl.createRecipe)
//   .get(recipeCtrl.getAllRecipes)
  
// router.route('/api/recipes/:recipeId')
//   .get(authCtrl.requireSignin, recipeCtrl.read)
//   .put(authCtrl.requireSignin, authCtrl.hasAuthorization, recipeCtrl.updateRecipe)
//   .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, recipeCtrl.deleteRecipe)

// router.param('recipeId', recipeCtrl.recipeByID)

// export default router

import express from 'express'
import cors from 'cors'
import recipeCtrl from '../Controllers/recipe.controller.js'
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
router.use('/api/recipes', cors(corsOptions))

// Handle preflight requests for all routes
router.options('/api/recipes', cors(corsOptions))
router.options('/api/recipes/:recipeId', cors(corsOptions))

router.route('/api/recipes')
  .post(cors(corsOptions), authCtrl.requireSignin, authCtrl.setUser, recipeCtrl.createRecipe)
  .get(cors(corsOptions), recipeCtrl.getAllRecipes)
  
router.route('/api/recipes/:recipeId')
  .get(cors(corsOptions), authCtrl.requireSignin, recipeCtrl.read)
  .put(cors(corsOptions), authCtrl.requireSignin, authCtrl.hasAuthorization, recipeCtrl.updateRecipe)
  .delete(cors(corsOptions), authCtrl.requireSignin, authCtrl.hasAuthorization, recipeCtrl.deleteRecipe)

router.param('recipeId', recipeCtrl.recipeByID)

export default router