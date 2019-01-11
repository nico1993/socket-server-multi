import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Marcador } from '../classes/marcador';
import { mapa } from '../routes/router';

export const usuariosConectados = new UsuariosLista();

//Mapas

export const nuevoMarcador = (cliente:Socket, io: SocketIO.Server) => {
    cliente.on('nuevo-marcador', (marcador:Marcador) => {
        mapa.addMarcador(marcador);
        cliente.broadcast.emit('nuevo-marcador', marcador);
    });
}

export const borrarMarcador = (cliente:Socket, io: SocketIO.Server) => {
    cliente.on('borrar-marcador', (id:string) => {
        mapa.deleteMarcador(id);
        cliente.broadcast.emit('borrar-marcador', id);
    });
}

export const moverMarcador = (cliente:Socket, io: SocketIO.Server) => {
    cliente.on('mover-marcador', (marcador:Marcador) => {
        mapa.moveMarcador(marcador);
        cliente.broadcast.emit('mover-marcador', marcador);
    });
}

export const conectarCliente = (cliente:Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);    
}

export const desconectar = (cliente:Socket, io: SocketIO.Server) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista())
    });
};

//Obtener usuarios
export const obtenerUsuarios = (cliente:Socket) => {
    cliente.on('obtener-usuarios', () => {
        cliente.emit('usuarios-activos', usuariosConectados.getLista());
    })
};
//Escuchar mensajes
export const mensaje = (cliente:Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (data: {de:string, mensaje:string}) => {
        console.log('Mensaje recibido', data);
        io.emit('mensaje-nuevo', data);
    });
}

//Escuchar login de usuarios
export const loginUsuario = (cliente:Socket, io: SocketIO.Server) => {
    cliente.on('login-usuario', (data: {nombre: string}, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, data.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${data.nombre} logueado`
        });
    });
}