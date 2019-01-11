import express from 'express';
import { SERVER_PORT } from '../global/environment ';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server
{
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io:socketIO.Server;
    private httpServer:http.Server;

    private constructor()
    {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSockets();
    }

    public static get instance()
    {
        return this._instance || (this._instance = new this());
    }

    private listenSockets()
    {
        console.log("Escuchando conexiones (sockets)");
        this.io.on('connection', cliente => {
            //Conectar cliente
            socket.conectarCliente(cliente, this.io);

            //Login usuarios
            socket.loginUsuario(cliente, this.io);
            //Mensajes
            socket.mensaje(cliente, this.io);
            //Desconectar
            socket.desconectar(cliente, this.io);

            //Obtener usuarios
            socket.obtenerUsuarios(cliente);

            //Mapas - nuevo marcador
            socket.nuevoMarcador(cliente, this.io);
            //Mapas - borrar marcador
            socket.borrarMarcador(cliente, this.io);
            //Mapas - mover marcador
            socket.moverMarcador(cliente, this.io);
        });
    }

    start(callback: Function)
    {
        this.httpServer.listen(this.port, callback);
    }
}