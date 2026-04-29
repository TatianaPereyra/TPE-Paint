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
        this.filtroActivo = null;
        this.valorActual = -1;
        this.waitButton();
    }

    //--------------------------------------------------------------
    //             CARGA DE IMAGENES Y CONTROLES
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
            this.ctx.drawImage(this.image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.originalImageData = this.ctx.getImageData(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.setCopiaImageData();
        }
    }

    limpiarControles(){
        document.querySelector("#adicional").innerHTML = "";
        this.filtroActivo = null;
        this.valorActual = 1;
    }

    /**
     * @description
     * Crea dinamicamente un elemento slider para controlar la cantidad de filtro de brillo y saturacion.
     */

    crearSlider(){
        let min = -1;
        let max = 2;
        let step = 0.1;

        let contenedor = document.querySelector("#adicional");

        contenedor.innerHTML = `
            <input type="range"
                id="sliderFiltro"
                class="sizePicker"
                min="${min}"
                max="${max}"
                step="${step}"
                value="${this.valorActual}">
        `;

        document.querySelector("#sliderFiltro").addEventListener("input", (e)=>{
            this.valorActual = Number(e.target.value);
            this.aplicarFiltro(this.filtroActivo);
        });
    }

    verificarImagen(){
        return this.originalImageData === null; //devuelve true si es null
    }

    mostrarAviso(){
        alert("No se ha ingresado ninguna imagen");
    }
    //----------------------------------------------------------------
    //                 APLICACION DE FILTROS
    //----------------------------------------------------------------

     /** 
     * @description
     * Escucha el clic en el botón del filtro, obtiene el filtro seleccionado
     * y ejecuta aplicarFiltro() con ese valor. Verifica si hay un ingreso de imagen antes de tomar el valor del filtro. 
     * Si no hay una imagen subida, muestra un aviso.
     */
    waitButton(){
        //sin filtro --> muestro la imagen original
        document.querySelector("#original").addEventListener('click', (e) => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.ctx.putImageData(this.originalImageData, 0, 0);
        });
    
        //escala de grises
        document.querySelector("#grises").addEventListener('click', (e) => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("grises");
        });

         //sepia
        document.querySelector("#sepia").addEventListener('click', (e) => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("sepia");
        });

        document.querySelector("#binarizacion").addEventListener('click', (e) => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("binario");
        });
        
        //filtro de brillo, creo los controles necesarios
        document.querySelector("#brillo").addEventListener("click", () => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.filtroActivo = "brillo";
            this.crearSlider();
        });

        //negativo
        document.querySelector("#negativo").addEventListener('click', (e) => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("negativo");
        });

        //blur
        document.querySelector("#blur").addEventListener('click', (e) => {
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("blur");
        });

        //saturacion
        document.querySelector("#saturacion").addEventListener('click', (e) =>{
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.filtroActivo = "saturation";
           this.crearSlider();
        });

        //deteccion de bordes
        document.querySelector("#borderD").addEventListener('click', (e) =>{
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("borderD");
        });

        //sharpen
        document.querySelector("#sharpen").addEventListener('click', (e) =>{
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("sharpen");
        });

        //relieve
        document.querySelector("#relieve").addEventListener('click', (e) =>{
            if(this.verificarImagen()){
                this.mostrarAviso();
                return;
            }

            this.limpiarControles();
            this.aplicarFiltro("relieve");
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
     * Instancia el filtro correspondiente (pasando los datos necesarios para la implementacion del mismo),
     * lo aplica sobre la copia del ImageData,
     * redibuja el resultado en el canvas y actualiza la copia para futuros filtros.
     */
    aplicarFiltro(tipo){
        let filtro;

        switch(tipo){
            case "grises": filtro = new GrisFilter();break;

            case "sepia": filtro = new SepiaFilter();break;

            case "brillo": filtro = new BrilloFilter();
                            filtro.setValor(this.valorActual);break;

            case "negativo": filtro = new NegativoFilter();break;

            case "binario": filtro = new BinarioFilter();break;

            //A los filtros que utilizan Kernel, lo envia seleccionandolo del archivo kernels.js
            case "blur": filtro = new ConvultionFilter(kernels.blur.matriz, kernels.blur.factor,
                                                       kernels.blur.width, kernels.blur.height);break;

            case "saturation": filtro = new SaturationFilter();
                                filtro.setValor(this.valorActual);break;

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