export class GraficaData{
    private meses:string[] = ['enero', 'febrero', 'marzo', 'abril'];
    private valores: number[] = [1, 2, 3, 4];

    private preguntasLabel:number[] = [0, 1, 2, 3];    
    private preguntasData: number[] = [0, 0, 0, 0];

    constructor(){}

    getDataGrafica()
    {
        return [
            {
                data: this.valores,
                label: 'Ventas'
            }
        ]
    }

    getBarData()
    {
        return [
            {
                data: this.preguntasData,
                label: 'Preguntas'
            }
        ]
    }

    responder(pregunta:number, cantidad: number)
    {
        if(pregunta > this.preguntasData.length - 1)
            return;
        this.preguntasData[pregunta] += cantidad;
    }

    incrementarValor(mes:string, valor:number)
    {
        mes = mes.toLowerCase().trim();
        for(let i in this.meses)
        {
            if(this.meses[i] === mes)
            {
                this.valores[i] += valor;
                break;
            }
        }
        return this.getDataGrafica();
    }
    
}