import { cleanCanvas } from "../Main.js";
import { BrilloFilter } from "../filters/simple/BrilloFilter.js";
import { GrisFilter } from "../filters/simple/GrisFilter.js";
import { SepiaFilter } from "../filters/simple/SepiaFilter.js";
import { NegativoFilter } from "../filters/simple/NegativoFilter.js";
import { BinarioFilter } from "../filters/simple/BinarioFilter.js";
import { Filter } from "../filters/Filter.js";
import { kernels } from "../filters/kernels.js";
import { ConvultionFilter } from "../filters/complex/ColvultionFilter.js";
import { SaturationFilter } from "../filters/complex/SaturationFilter.js";

export class ImageController{
    /** 
     * @param {Object} ctx - Contexto del canvas (CanvasRenderingContext2D).
     * 
     * @description
     * Inicializa el controller y atributos de clase. Asigna el ctx y crea una nueva instancia de Imagen para utilizar.
     */
    constructor(ctx){
        this.ctx = ctx;
        this.image = new Image();
        this.originalImageData = null;
        this.copiaImageData = null; //modifico la copia
    }

    //--------------------------------------------------------------
    //             CARGA DE IMAGENES Y BOTONES DE FILTRO
    //---------------------------------------------------------------

     /** 
     * @param {File} img - Archivo de imagen cargado por el usuario
     * 
     * @description
     * Asigna la URL del archivo a la imagen, limpia el canvas,
     * y al cargar la imagen: la dibuja, guarda sus píxeles originales,
     * crea una copia de trabajo y genera los controles de filtros.
     */
    loadImage(img){ 
        this.image.src = URL.createObjectURL(img);

        cleanCanvas();//limpio el canvas antes de dibujar la imagen (en caso de cambiarla)

        this.image.onload = () => {  //cuando carga, la dibujo y me guardo el arreglo de pixeles.
            this.ctx.drawImage(this.image, 0, 0);
            this.originalImageData = this.ctx.getImageData(0,0, this.image.width, this.image.height);
            this.setCopiaImageData();
            this.putButtons();
        }
    }

     /** 
     * @description
     * Crea dinámicamente un selector de filtros (select) y un botón "Aplicar".
     * Se ejecuta automáticamente al cargar una imagen.
     */
    putButtons(){ 
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
            { value: "binario", texto: "Blanco y negro" },
            { value: "blur", texto: "Blur" },
            { value: "saturation", texto: "Saturacion" },
            { value: "borderD", texto: "Deteccion de bordes" },
            { value: "sharpen", texto: "Nitidez" },
            { value: "relieve", texto: "Bajorrelieve" }

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


    //----------------------------------------------------------------
    //                 APLICACION DE FILTROS
    //----------------------------------------------------------------

     /** 
     * @description
     * Escucha el clic en el botón "Aplicar filtro", obtiene el filtro seleccionado
     * y ejecuta aplicarFiltro() con ese valor.
     */
    waitButton(){
        let select = document.querySelector("#filtroSelect");
        let boton = document.querySelector("#aplicarFiltro");
    
        boton.addEventListener('click', () => {
            let filtroSeleccionado = select.value;
            this.aplicarFiltro(filtroSeleccionado);
        });
    }   

     /** 
     * @description
     * Crea una copia independiente del ImageData original usando Uint8ClampedArray.
     * Permite aplicar filtros sin modificar el original.
     */
    setCopiaImageData(){
        this.copiaImageData = new ImageData(
        new Uint8ClampedArray(this.originalImageData.data),  // copia del arreglo
        this.originalImageData.width,
        this.originalImageData.height);;
    }


     /** 
     * @param {string} tipo - Nombre del filtro a aplicar.
     * 
     * @description
     * Instancia el filtro correspondiente, lo aplica sobre la copia del ImageData,
     * redibuja el resultado en el canvas y actualiza la copia para futuros filtros.
     */
    aplicarFiltro(tipo){
        let filtro;

        switch(tipo){
            case "grises": filtro = new GrisFilter();break;
            case "sepia": filtro = new SepiaFilter();break;
            case "brillo": filtro = new BrilloFilter();break;
            case "negativo": filtro = new NegativoFilter();break;
            case "binario": filtro = new BinarioFilter();break;
            case "blur": filtro = new ConvultionFilter(kernels.blur.matriz, kernels.blur.factor,
                                                       kernels.blur.width, kernels.blur.height);break;
            case "saturation": filtro = new SaturationFilter;break;
            case "borderD": filtro = new ConvultionFilter(kernels.bordes.matriz, kernels.bordes.factor,
                                                          kernels.bordes.width, kernels.bordes.height);break;
            case "sharpen": filtro = new ConvultionFilter(kernels.sharpen.matriz, kernels.sharpen.factor,
                                                          kernels.sharpen.width, kernels.sharpen.height);break;
            case "relieve": filtro = new ConvultionFilter(kernels.relieve.matriz, kernels.relieve.factor,
                                                          kernels.relieve.width, kernels.relieve.height);break;
            default: break;
        }

        let nuevoImageData = filtro.aplicar(this.copiaImageData);
        this.ctx.putImageData(nuevoImageData, 0, 0);
        this.setCopiaImageData();
    }
}