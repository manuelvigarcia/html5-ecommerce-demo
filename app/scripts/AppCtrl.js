var AppCtrl = function(catalogo, carrito) {
    this.catalogo = catalogo;
    this.carrito = carrito;
    this.$elem = $('.row');
};

AppCtrl.prototype.inicializar = function() {
    var presentacion = new TarjetaDesechableCtrl($('#presentacion'));
    presentacion.inicializar();
    
    var promesaCatalogo = this.catalogo.cargarCatalogo();
    promesaCatalogo.done(function(catalogo) {
        for(var nombreArticulo in catalogo.articulos) {
            this.agregarTarjetaArticulo(catalogo.articulos[nombreArticulo]);
        }
    }.bind(this));
};

AppCtrl.prototype.agregarTarjetaArticulo = function(articulo) {
    var tarjetaCtrl = new TarjetaArticuloCtrl(this.$elem, this.carrito, articulo);
    tarjetaCtrl.inicializar();
};
