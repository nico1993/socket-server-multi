import { Usuario } from './usuario';
export class UsuariosLista
{
    private lista:Usuario[] = [];

    constructor(){ }

    //Agregar un usuario
    public agregar(usuario:Usuario)
    {
        this.lista.push(usuario);
        return usuario;
    }

    //Actualizar nombre de usuario
    public actualizarNombre(id:string, nombre:string)
    {
        for(let usuario of this.lista)
        {
            if(usuario.id === id)
            {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log("============ Actualizando usuario ============");
        console.log(this.lista);
    }

    //Obtener lista de usuarios
    public getLista()
    {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    //Obtener un usuario
    public getUsuario(id:string)
    {
        return this.lista.find(usuario => usuario.id === id);
    }

    //Obtener usuarios de una sala en particular
    public getUsuariosEnSala(sala:string)
    {
        return this.lista.filter(usuarios => usuarios.sala === sala);
    }

    //Borrar usuario
    public borrarUsuario(id:string)
    {
        const usuarioTmp = this.getUsuario(id);
        this.lista = this.lista.filter(usuarios => usuarios.id !== id);
        return usuarioTmp;
    }
}