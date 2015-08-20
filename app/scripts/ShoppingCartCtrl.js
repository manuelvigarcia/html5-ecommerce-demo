var ShoppingCartCtrl = function(carrito) {
    this.$elem = $('#carrito');
    this.carrito = carrito;
};

ShoppingCartCtrl.prototype.inicializar = function() {
    this.$elem.find('a').click(function(evt) {
        evt.preventDefault();
        this.expandir();
    }.bind(this));
    this.$elem.find('button').click(function(evt) {
        evt.preventDefault();
        this.compactar();
    }.bind(this));    this.carrito.onRegistrarCompra(function(articulo) {
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

ShoppingCartCtrl.prototype.expandir = function() {
    this.$elem.addClass('expandido');
    this.$elem.one('transitionend', function() {
        $(this).find('a').addClass('expandido');
        $(this).find('form').addClass('expandido');
    });
};

ShoppingCartCtrl.prototype.compactar = function() {
    this.$elem.find('a').removeClass('expandido');
    this.$elem.find('form').removeClass('expandido');
    this.$elem.removeClass('expandido');
};

