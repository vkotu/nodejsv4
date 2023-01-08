import  express  from 'express';
import router from './router';
import cors from 'cors';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

const customMessage = (message) => (req,res,next) => {
    console.log(`hello from ${message}`);
    next();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(customMessage('Kotu\'s API'));
app.use((req, res, next) => {
    req.shhhSecret = "doggy";
    next();
})


app.get('/', (req, res) => {
    console.log('hello from express');
    res.status(200);
    res.json({message: req.shhhSecret});
})

app.use("/api", protect ,router);

app.post('/user', createNewUser);
app.post("/signin", signin);

export default app;