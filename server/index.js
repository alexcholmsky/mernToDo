//importing
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js'

//creating app object with express constructor
const app = express();

dotenv.config();
/*automatically loads environment variables from a .env file into the process.env object
env vars are key value pairs such as domain names, auth keys, etc. 
common feature is their data values change infrequently and the application logic treats them like constants */

app.use(express.json());
/*the app object has a middleware stack
 - to set up the middleware, you envoke app.use()
 - this adds the middleware layer you pass into the stack
express.json() is a method in express to recognize the incoming Request Object as a JSON Object.
*/

//{ limit: "30mb", extended: true }

//MIDDLEWARE

/*Express is simply a library of middleware functions

Express middleware are functions that execute during the lifecycle of a request 
to the Express server. Each middleware has access to the HTTP request and response 
for each route (or path) it’s attached to.

Example: Consider app.get()
    app.get('/', (req, res, next) => {
        res.send('Welcome Home');
    });

   req: incoming request 
   res: the response being written
   next: method to call to pass the call to the next 
   middleware function once the current middleware is finished

   Now consider app.use()

    app.use((req, res, next) => {
        console.log(req);
        next();
    });
*/


app.use(express.urlencoded({ limit: "30mb", extended: true }))
/*
express.urlencoded() is a method built in express to recognize 
the incoming Request Object as strings or arrays.
*/

app.use(cors());

/*
“CORS” stands for Cross-Origin Resource Sharing. It allows you to 
make requests from one website to another website in the browser, 
which is normally prohibited by another browser policy called 
the Same-Origin Policy (SOP, which means requests from one website to
another are not readable). 

- CORS allows servers to specify certain trusted ‘origins’ they are willing to permit requests from.

Link : https://medium.com/@electra_chong/what-is-cors-what-is-it-used-for-308cafa4df1a
*/
app.use('/todos', todosRoutes);



const mongodb = 'mongodb+srv://AlexCho:heyy1358heyy@sideprojects.nmi2d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.get('/', (req, res) => {
res.send('Welcome to server')
})
const PORT = process.env.PORT || 5000;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT} `)))
.catch((error) => console.log(error));

/*The then() method returns a Promise.
It takes up to two arguments: 
    -callback functions for the success and failure cases of the Promise 
*/