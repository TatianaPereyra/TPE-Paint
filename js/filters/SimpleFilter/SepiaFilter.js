import { Filter } from "../Filter.js";

export class SepiaFilter extends Filter{

    aplicar(imageData){
        let data = imageData.data;
        for(let i = 0; i < data.length; i+=4){
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];

            let nuevoR = (r * 0.393) + (g * 0.796) + (b * 0.189);
            let nuevoG = (r * 0.349) + (g * 0.686) + (b * 0.168);
            let nuevoB = (r * 0.272) + (g * 0.534) + (b * 0.131);

            data[i] = Math.min(255,nuevoR);
            data[i+1] = Math.min(255,nuevoG);
            data[i+2] = Math.min(255,nuevoB);
        }

        return imageData;
    }
}