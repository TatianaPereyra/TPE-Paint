//Clase "abstracta" de herramientas para prevenir comportamiento similar
class Tool{
    constructor(posX, posY, color, style, type){
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.style = style;
        this.type = type;
    }

    //setter y getters 
    setStyle(boolean){
        this.style = boolean;
    }

    getStyle(){
        return this.style;
    }

    setColor(color){
        this.fill = color;
    }

    getColor(){
        return this.fill;
    }

    getType(){
        return this.type;
    }

    setPosX(x){
        this.x = x;
    }

    getPosX(){
        return this.posX;
    }

    setPosY(y){
        this.posY = y;
    }

    getPosY(){
        return this.posY;
    }


}