import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets'

export default class Server {
    private static _intance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSocket();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private escucharSocket() {
        console.log('Escuchando conexiones');
        this.io.on('connection', client => {
            console.log("cliente conectado");

            // Desconectar
            socket.desconectar(client);

            socket.mensaje(client, this.io);
        });
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }

}
