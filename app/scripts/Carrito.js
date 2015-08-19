/** Modeliza el carrito de la compra, es decir, cuántas camisetas hemos comprado de cada modelo. */
var Carrito = function() {
    /* Las camisetas se guardan en un objeto usando como nombre de propiedad el nombre
       del modelo. De esta manera si un modelo de camiseta se llama "Firefly" en el objeto
       existirá una propiedad con ese nombre para recuperar el objeto Artículo 
       correspondiente. */
    this.articulosComprados = {};
};

Carrito.REGISTRAR_COMPRA_EVENT = 'onRegistrarCompra';
Carrito.ELIMINAR_ARTICULO_EVENT = 'onEliminarArticulo';

/** Añade un modelo al carrito, indexándolo por su nombre. */
Carrito.prototype.registrarCompra = function(articulo, talla) {
    var compra = this.articulosComprados[articulo.nombre];
    if (compra === undefined) {
        compra = new Carrito.ArticuloComprado(articulo);
        this.articulosComprados[articulo.nombre] = compra;
    }
    compra.incrementar(talla);
    $(this).trigger(Carrito.REGISTRAR_COMPRA_EVENT, articulo);
};

Carrito.prototype.onRegistrarCompra = function(listener) {
    $(this).on(Carrito.REGISTRAR_COMPRA_EVENT, listener);
}

/** Descarta todos los pedidos de un articulo, sea de la talla que sea. */
Carrito.prototype.eliminarArticulo = function(articulo) {
    delete this.articulosComprados[articulo.nombre];
    $(this).trigger(Carrito.ELIMINAR_ARTICULO_EVENT, articulo);
    return this.articulosComprados;
};

Carrito.prototype.onEliminarArticulo = function(listener) {
    $(this).on(Carrito.ELIMINAR_ARTICULO_EVENT, listener);
}

/** Calcula el coste total de todos los modelos y tallas comprados. */
Carrito.prototype.precioTotal = function() {
    var total = 0;
    
    for (var nombreArticuloComprado in this.articulosComprados) {        
        var compra = this.articulosComprados[nombreArticuloComprado];
        total = total + compra.precioTotal();
    }
    
    return total;
};


/** Calcula el número total de camisetas  que el usuario quiere comprar. 
*/
Carrito.prototype.numeroArticulos = function() {
    var totalCamisetas = 0;

     for (var nombreArticuloComprado in this.articulosComprados) {        
        var articuloComprado = this.articulosComprados[nombreArticuloComprado];
        totalCamisetas = totalCamisetas + articuloComprado.numeroArticulos();
    }
    return totalCamisetas;
};

Carrito.prototype.vacio = function() {
    return this.numeroArticulos() === 0;
};

/**
 * Resulta mucho más sencillo implementar el carrito de la compra según el patrón de UI
 * que vamos a utilizar. En este caso compramos artículos (camisetas) de distintas tallas por
 * lo que este tipo almacena el número de cada una de ellas que deseamos adquirir para un
 * modelo concreto de artículo.
 * 
 */
Carrito.ArticuloComprado = function(articulo) {
    this.articulo = articulo;
    this.tallasCompradas = { S : 0, M : 0, L : 0, XL : 0};
};

/** Como regla de negocio no dejamos comprar más de tres unidades. */
Carrito.ArticuloComprado.LIMITE = 3;

/** Incremente el número de camisetas que el usuario ha comprado de una 
    determinada talla siempre que respete las reglas de negocio (máximo 3).
*/
Carrito.ArticuloComprado.prototype.incrementar = function(talla) {
    talla = talla.toUpperCase();
    if (this.numeroArticulos() === Carrito.ArticuloComprado.LIMITE) {
        /* throw es similar a un return pero indica que se ha producido un error.
           Si el throw no es capturado en un bloque catch se interrumpe la ejecución
           del script. */
        var error = new Error('No vendemos más de ' 
                             + Carrito.ArticuloComprado.LIMITE + ' por pedido.');
        throw error;
    } 
    this.tallasCompradas[talla] = this.tallasCompradas[talla] + 1;    
};


Carrito.ArticuloComprado.prototype.numeroArticulos = function() {
    var numeroArticulos = 0;

     for (var talla in this.tallasCompradas) {        
        numeroArticulos = numeroArticulos + this.tallasCompradas[talla];
    }
    return numeroArticulos;
};

Carrito.ArticuloComprado.prototype.precioTotal = function() {
    return this.articulo.precio * this.numeroArticulos();
};
