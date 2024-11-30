import config from './config/config.js' 
import app from '../server/express.js'
import mongoose from 'mongoose' 
import cors from 'cors'

const port = process.env.PORT || 3000;

	mongoose.Promise = global.Promise
	mongoose.connect(config.mongoUri, { 
  } 
  )
  .then(() => {
    console.log("Connected to the database!");
  })

	mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${config.mongoUri}`) 
	})


app.get("/", (req, res) => {
res.json({ message: "Welcome to User application." });
});
// app.options('*', cors());

// // Add a catch-all route for CORS preflight
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://faceplate.onrender.com');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})
