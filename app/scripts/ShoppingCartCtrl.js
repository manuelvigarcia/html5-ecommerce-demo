var ShoppingCartCtrl = function(carrito) {
    this.$elem = $('#carrito');
    this.carrito = carrito;
};

ShoppingCartCtrl.prototype.inicializar = function() {
    this.carrito.onRegistrarCompra(function(articulo) {
        if (this.carrito.numeroArticulos() === 1) {
            this.mostrar();
        } else {
            this.actualizar();
        }
    }.bind(this));
    this.carrito.onEliminarArticulo(function(articulo) {
        if (this.carrito.vacio() === true) {
            this.ocultar();
        } else {
            this.actualizar();
        }
    }.bind(this));
};

ShoppingCartCtrl.prototype.mostrar = function() {
    this.$elem.fadeIn();
};

ShoppingCartCtrl.prototype.ocultar = function() {
    this.$elem.fadeOut();
};

ShoppingCartCtrl.prototype.actualizar = function() {
    
};