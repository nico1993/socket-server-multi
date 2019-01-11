import { Marcador } from "./marcador";

export class Mapa {
    
    public marcadores: Marcador[] = [];
    
    constructor() {}

    getMarcadores() {
        return this.marcadores;
    }

    addMarcador(marcador: Marcador) {
        this.marcadores.push(marcador);
    }

    deleteMarcador(id: string) {
        this.marcadores = this.marcadores.filter(marcador => marcador.id !== id);
    }

    moveMarcador(marcador:Marcador) {
        for (const i in this.marcadores) {
            if(this.marcadores[i].id === marcador.id)
            {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }
    
}