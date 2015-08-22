var ShoppingCartCtrl = function(carrito) {
    this.$elem = $('#carrito');

    this.carrito = carrito;
};

ShoppingCartCtrl.prototype.$form = null;

ShoppingCartCtrl.prototype.inicializar = function() {
    this.$form = $('#plantillaShoppingCartForm')
        .clone()
        .removeAttr('id')
        .prependTo('body');

    this.$elem.find('a').click(function(evt) {
        evt.preventDefault();
        this.expandir();
    }.bind(this));
    this.$form.find('button').click(function(evt) {
        evt.preventDefault();
        this.compactar();
    }.bind(this));    
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

ShoppingCartCtrl.prototype.expandir = function() {
    this.$elem.addClass('expandido');
    this.$elem.one('transitionend', function() {
        var rect = this.$elem[0].getBoundingClientRect();
        var scrollTop = $(document).scrollTop();
        this.$form
            .removeAttr('style')
            .width(rect.width - 28)
            .height(rect.height -28)
            .css('top', scrollTop + rect.top)
            .css('left', rect.left)
            .show();
        this.$elem.hide();
    }.bind(this));
};

ShoppingCartCtrl.prototype.compactar = function() {
    this.$elem.removeClass('expandido');
    this.$elem.show();
    this.$form.hide();
};

