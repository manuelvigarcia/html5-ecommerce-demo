/** Uno de los modelos de camiseta que se encuentran actualmente a la venta, 
    incluyendo la información de las unidades que el usuario quiere comprar
    de cada talla.
*/
var Articulo = function(nombre, precio, imagen, colores) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.colores = colores;
};
