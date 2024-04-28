import express from 'express'
import { usuarios } from './db/usuarios.data.js';


const app = express();

const __dirname = import.meta.dirname;
app.use(express.static("assets"));


const userExistMiddleware = (req, res, next) => {
    if (usuarios.find((user) => user === req.params.usuario)) {
        next();
    } else {
        res.sendFile(__dirname + "/assets/who.jpeg");
    }
  };
  
const randomMiddleware = (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    if (parseInt(req.params.n) === randomNumber){
        next();
    } else {
        res.sendFile(__dirname + "/assets/voldemort.jpg");
    }   
};




  
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.get('/abracadabra/usuarios', (req,res) => {
    res.json({
        usuarios
    })
})

app.get('/abracadabra/juego/:usuario' , userExistMiddleware ,(req,res) => {
    res.send('Usuario válido')
})


app.get('/abracadabra/conejo/:n' , randomMiddleware ,(req,res) => {
    res.sendFile(__dirname + "/assets/conejito.jpg");
})


app.all('*', (req, res) => {
    res.status(404).send('Esta página no existe...');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});