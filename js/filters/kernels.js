/**
 * @description
  * Diccionario de kernels para filtros de convolución.
 * Cada kernel contiene:
 * - matriz: arreglo de valores del kernel
 * - factor: divisor para normalizar (suma de valores del kernel)
 * - width: ancho del kernel
 * - height: alto del kernel
 */

export let kernels = {
    blur: {
        matriz: [1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1],
        factor: 25,
        width: 5,
        height: 5
    },
    sharpen: {
        matriz: [0, -1, 0, 
                -1, 5, -1,
                 0, -1, 0],
        factor: 1,
        width: 3,
        height: 3
    },
    bordes: {
        matriz: [-1, -1, -1,
                 -1, 8, -1, 
                -1, -1, -1],
        factor: 1,
        width: 3,
        height: 3
    },
    relieve: {
        matriz: [-2, -1, 0,
                -1,  1, 1,
                0,  1, 2],
        factor: 1,
        width: 3,
        height:3
    }
};