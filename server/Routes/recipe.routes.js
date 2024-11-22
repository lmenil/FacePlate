import express from 'express'
import recipeCtrl from '../Controllers/recipe.controller.js'
import authCtrl from '../Controllers/auth.controller.js'


// console.log('recipeCtrl:', recipeCtrl);  // Add this log
// console.log('authCtrl:', authCtrl);  // Add this log

const router = express.Router()
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'client/public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({ storage: storage })

router.route('/api/recipes')
  .post(authCtrl.requireSignin, authCtrl.setUser, recipeCtrl.createRecipe)
  .get(recipeCtrl.getAllRecipes)
  .delete(authCtrl.requireSignin, recipeCtrl.deleteAll)

router.route('/api/recipes/:recipeId')
  .get(recipeCtrl.read)
  .put(authCtrl.requireSignin, recipeCtrl.isCreator, recipeCtrl.updateRecipe)
  .delete(authCtrl.requireSignin, recipeCtrl.isCreator, recipeCtrl.deleteRecipe)

router.param('recipeId', recipeCtrl.recipeByID)

export default router