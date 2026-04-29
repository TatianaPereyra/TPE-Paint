# TPE 2
## Paint y Filtros de Imagen

## Indice:
- [Descripción](#descripcion)
- [Bibliografía](#bibliografia)
- [Implementación](#implementacion)
- [Uso](#uso)
- [Prueba](#prueba)

## Descripcion:
Se ha propuesto implementar un paint que además permita la carga y modificacion de imagenes. 
Para esto se ha trabajado con la etiqueta <canvas> de HTML5, y JavaScript para la modificacion de esta.

## Bibliografia:
Para la implementacion del proyecto se consultaron los siguientes artículos y páginas:
- Kernel (Image processing): Uso y explicacion del funcionamiento de Kernels para modificar la imagen. https://en.wikipedia.org/wiki/Kernel_(image_processing)
- Image Kernels: Explicación visual de diferentes Kernels. https://setosa.io/ev/image-kernels/
- Códigos de color HTML: Diferentes modelos de color soportados por HTML, caracteristicas y diferencias. https://docs.aspose.com/html/es/net/tutorial/html-colors
- Colorfulness: Descripción de términos como saturación y chroma. https://en.wikipedia.org/wiki/Colorfulness
- HSL and HSV: Explicación de los sistemas HSL y HSV y su relación con RGB. De este enlace se obtuvieron las formulas aplicadas en el filtro de saturación. https://en.wikipedia.org/wiki/HSL_and_HSV

## Implementacion:
Algunos detalles importantes de la implementación fueron los siguientes:
Se trabajó utilizando clases y objetos para crear los diferentes filtros y herramientas. A su vez, se diseñaron dos controladores: uno para manejar los eventos de las herramientas (lápiz y goma) y otro para gestionar los eventos relacionados con las imágenes (carga y aplicación de filtros). El objetivo fue mantener separadas las responsabilidades y evitar mezclar funcionalidades dentro de `Main.js`.
En cuanto a la implementación de filtros mediante kernels, se creó una clase general (`ConvolutionFilter.js`) cuyo constructor recibe el kernel a utilizar. También se creó un archivo `kernels.js` que almacena un diccionario con los kernels y sus filtros asociados.
De este modo, el controlador se encarga de instanciar el filtro con el kernel adecuado según corresponda. Esta opción permite incorporar fácilmente nuevos filtros basados en kernels sin necesidad de crear nuevos archivos específicos.

## Uso:
El usuario puede cargar una imagen mediante el botón de subir foto y también descargar el resultado final.
A la imagen cargada se le pueden aplicar los siguientes filtros:
- Escala de grises  
- Sepia  
- Brillo (con controles para ajustar la intensidad)  
- Blanco y negro  
- Negativo  
- Blur  
- Saturación (con controles)  
- Detección de bordes  
- Sharpen  
- Bajorrelieve  
Además, el usuario dispone de herramientas como lápiz y goma para dibujar sobre el canvas. En el caso del lápiz, se puede seleccionar el color y, para ambas herramientas, ajustar el grosor.

## Prueba:
Para testear la aplicación se utilizó la imagen `prueba.jpeg`, disponible en la carpeta `img`.


