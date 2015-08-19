var TarjetaArticuloCtrl = function($parent, carrito, articulo) {
    this.$parent = $parent;
    this.carrito = carrito;
    this.articulo = articulo;
    this.$elem = TarjetaArticuloCtrl.$PLANTILLA.clone().removeAttr('id');
};

TarjetaArticuloCtrl.$PLANTILLA = $('#plantillaTarjetaArticulo');

TarjetaArticuloCtrl.prototype.inicializar = function() {
    this.$elem.find('.card-image img').attr('src', this.articulo.imagen);
    this.$elem.find('.card-title').text(this.articulo.nombre + 
                                        ' ¡solo ' + this.articulo.precio + '€!');   
    this.$elem.find('.card-action a').click(function(evt) {
        evt.preventDefault();
        var accion = evt.currentTarget.getAttribute('data-accion'); // evt.target puede ser un elemento incluído en el botón
        if (accion === 'ELIMINAR') {
            this.eliminarDeCarrito();
        } else {
            this.agregarTallaACarrito(accion);
        }
    }.bind(this));
    this.$elem.appendTo(this.$parent);
    this.$elem.removeAttr('style');
};

TarjetaArticuloCtrl.prototype.actualizarTarjeta = function() {
    var mensaje;
    var articuloComprado = this.carrito.articulosComprados[this.articulo.nombre];
    if (articuloComprado === undefined) {
        mensaje = 'No has comprado ninguna camiseta de este modelo.';
    } else {
        var numeroArticulosComprados = articuloComprado.numeroArticulos();
        if (numeroArticulosComprados === 0) {
            mensaje = 'No has comprado ninguna camiseta de este modelo.';
        } else {
            mensaje = 'Camistas compradas: ';
            for (var talla in articuloComprado.tallasCompradas) {
                var unidadesCompradasDeTallaActual = articuloComprado.tallasCompradas[talla];
                if (unidadesCompradasDeTallaActual > 0) {
                    mensaje = mensaje + talla + ': ' + unidadesCompradasDeTallaActual + ', ';
                }
            }
            mensaje = mensaje.substring(0, mensaje.length- ', '.length) + '.';
        } 
    }
    this.$elem.find('.card-content p')
        .fadeOut(function() {
            this.innerHTML = mensaje;
        }).fadeIn();;
};

TarjetaArticuloCtrl.prototype.eliminarDeCarrito = function() {
    this.carrito.eliminarArticulo(this.articulo);
    this.actualizarTarjeta();
};

TarjetaArticuloCtrl.prototype.agregarTallaACarrito = function(talla) {
    try {
        this.carrito.registrarCompra(this.articulo, talla);
        this.actualizarTarjeta();
    } catch (error) {
        error.stack
        Materialize.toast(error.message, 3000, 'rounded'); 
    }
};