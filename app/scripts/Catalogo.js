var Catalogo = function() {
    this.articulos = {};
};


Catalogo.prototype.cargarCatalogo = function () {
    var url = 'https://demo8983883.mockable.io/productos/camisetas/hoy';
    var promesaDatos = $.get(url);
    promesaDatos.done(function (datos) {
        console.table(datos);
    });

    var promesaCatalogo = promesaDatos.then(function(datos) {
        for (var i=0; i < datos.length; i++) {
            var datosActual = datos[i];
            var articuloActual = new Articulo(
                datosActual.modelo, datosActual.precio,
                datosActual.imagen, datosActual.colores);
            this.articulos[articuloActual.nombre] = articuloActual;
        }
        return this /* catálogo */;
    }.bind(this));

    return promesaCatalogo;
};
