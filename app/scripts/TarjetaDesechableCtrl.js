var TarjetaDesechableCtrl = function($elem) {
    this.$elem = $elem;
};

TarjetaDesechableCtrl.prototype.$elem = null;

TarjetaDesechableCtrl.prototype.inicializar = function() {
    var $button = $(this.$elem.find('a'));
    $button.click(function() {
        this.ocultar();
    }.bind(this));
};

TarjetaDesechableCtrl.prototype.ocultar = function() {
    var $cards = $('.card');
    TweenLite.to(this.$elem, 0.800, {
        x : window.innerWidth,
        opacity : 0, 
        rotation : 35,
        ease : Elastic.ease,
        onComplete : function() {
        }.bind(this)
    });
    TweenLite.to($cards, 0.800, {
        y : -$cards.first().height(),
        onComplete : function() {
            $cards.css('transform', 'none');
            this.$elem.detach();
        }.bind(this)
    });
};
