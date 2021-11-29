import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes.js';
import connectDB from './database/connection.js';


const app = express();

try {
    //Connect to mongo atlas db
    
    await connectDB();
    
} catch (error) {
    console.log(error.message);
}

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res)=> {
    res.send("Welcome to express server");
});


app.use('/api', routes);



//Invalid routes

app.use('*', (req, res)=> (
    res.status(404).json({
        error: "Invalid route",
        message: `Could not find ${req.baseUrl} on this server or you might have supplied the wrong HTTP method, If you entered the URL manually please check your spelling and try again.`
    })
));

export default app;