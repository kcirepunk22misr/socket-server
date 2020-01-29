import Server from './classes/server';
import { router } from './routes/routes';
import bodyParser = require('body-parser');
import cors from 'cors';

const server = new Server();
// BobyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({origin: true, credentials: true}))

// Rutas de servicio
server.app.use('/', router);


server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`)
});