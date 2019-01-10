import {Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';

const router = Router();

const grafica = new GraficaData();

router.get('/grafica', (request:Request, response:Response) => {
    response.json(grafica.getDataGrafica());
});

router.get('/grafica2', (request:Request, response:Response) => {
    response.json(grafica.getBarData());
});

router.post('/grafica', (request:Request, response:Response) => {

    const mes = request.body.mes;
    const valor = Number(request.body.valor); 

    grafica.incrementarValor(mes, valor);
    response.json(grafica.getDataGrafica());

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
});

router.post('/grafica2', (request:Request, response:Response) => {

    const pregunta = Number(request.body.pregunta);
    const cantidad = Number(request.body.cantidad); 

    grafica.responder(pregunta, cantidad);
    response.json(grafica.getBarData());

    const server = Server.instance;
    server.io.emit('cambio-grafica-2', grafica.getBarData());
});

router.post('/mensajes/:id', (request:Request, response:Response) => {

    const cuerpo = request.body.cuerpo; 
    const de = request.body.de; 
    const id = request.params.id;

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado-nuevo', {de, cuerpo});

    response.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

//Servicio para obtener todos los ids de los usuarios
router.get('/usuarios', (request:Request, response:Response) => {
    const server = Server.instance;
    server.io.clients((err: any, clientes:string[]) => {
        if(err)
        {
            return response.json({
                ok: false,
                err
            });
        }
        response.json({
            ok: true,
            clientes
        });
    })
});

//Servicio para obtener todos los usuarios con sus nombres
router.get('/usuarios/detalle', (request:Request, response:Response) => {
    response.json({
        ok: true,
        clientes: usuariosConectados.getLista() 
    });
});


export default router;