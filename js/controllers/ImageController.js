import { cleanCanvas } from "../Main.js";
import { BrilloFilter } from "../filters/SimpleFilter/BilloFilter.js";
import { GrisFilter } from "../filters/SimpleFilter/GrisFilter.js";
import { SepiaFilter } from "../filters/SimpleFilter/SepiaFilter.js";
import { NegativoFilter } from "../filters/SimpleFilter/NegativoFilter.js";
import { BinarioFilter } from "../filters/SimpleFilter/BinarioFilter.js";

export class ImageController{
    constructor(ctx){
        this.ctx = ctx;
        this.image = new Image();
        this.data = null;
    }

    loadImage(img){ 
        this.image.src = URL.createObjectURL(img);

        cleanCanvas();//limpio el canvas antes de dibujar la imagen (en caso de cambiarla)

        this.image.onload = () => {  //cuando carga, la dibujo y me guardo el arreglo de pixeles.
            this.ctx.drawImage(this.image, 0, 0);
            this.data = this.ctx.getImageData(0,0, this.image.width, this.image.height);
            this.putButtons();
        }
    }

    putButtons(){ //genero los elementos que necesito de forma dinamica
        let div = document.querySelector("#adicional");

        div.innerHTML = '';
        
        //Genero la estructyura de select-option para los filtros
        const select = document.createElement("select");
        select.id = "filtroSelect";

        let opciones = [
            { value: "ninguno", texto: "Sin filtro" },
            { value: "grises", texto: "Escala de grises" },
            { value: "sepia", texto: "Sepia" },
            { value: "brillo", texto: "Brillo" },
            { value: "negativo", texto: "Negativo" },
            { value: "binario", texto: "Blanco y negro" }
        ];

        opciones.forEach(op => {
            let option = document.createElement("option");
            option.value = op.value;
            option.textContent = op.texto;
            select.appendChild(option);
        });
        
        let boton = document.createElement("button");
        boton.textContent = "Aplicar filtro";
        boton.id = "aplicarFiltro";
        
        div.appendChild(select);
        div.appendChild(boton);

        this.waitButton();
    }

    waitButton(){
        let select = document.querySelector("#filtroSelect");
        let boton = document.querySelector("#aplicarFiltro");
    
        boton.addEventListener('click', () => {
            let filtroSeleccionado = select.value;
            this.aplicarFiltro(filtroSeleccionado);
        });
    }   

    aplicarFiltro(tipo){
        let filtro;

        switch(tipo){
            case "grises": filtro = new GrisFilter();break;
            case "sepia": filtro = new SepiaFilter();break;
            case "brillo": filtro = new BrilloFilter();break;
            case "negativo": filtro = new NegativoFilter();break;
            case "binario": filtro = new BinarioFilter();break;
        }

        let nuevoImageData = filtro.aplicar(this.data);
        this.ctx.putImageData(nuevoImageData, 0, 0);
    }
}