
//TODO: If you would like to expose additional data from the handtracker component,
//extend this class with additional properties.

export class PredictionEvent {
    prediction: string = "None";
    xpos: number = 0;
    ypos: number = 0;

    constructor(prediction:string, xpos:number, ypos:number){
        this.prediction = prediction;
        this.xpos = xpos;
        this.ypos = ypos;
    }

    public getPrediction(){
        return this.prediction;
    }

    public getXPos() {
        return this.xpos;
    }

    public getYPos() {
        return this.ypos;
    }
}
