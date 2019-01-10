import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

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