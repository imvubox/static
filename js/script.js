(function($) {
  "use strict";

  if (("www.imvubox.com" == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";

  $('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: 60
  });

  new WOW().init();
  
  $('#collapsingNavbar li a').click(function() {
      /* always close responsive nav after click */
      $('.navbar-toggler:visible').click();
  });

  var imvuboxQueryTimer = null;
  window.imvuboxQuery = function(input) {
    $('.form-inline .spinner').show();
    clearTimeout(imvuboxQueryTimer);
    imvuboxQueryTimer = setTimeout(function() {
      location.hash = '#/'+input.value;
      $('.list-group a').addClass('hidden');
      $('.list-group a').each(function(x) {
        var item = $(this);
        if (item.data('search').indexOf(input.value) !== -1) {
          item.removeClass('hidden');
        } else {
          item.addClass('hidden');
        }
      });
      $('.form-inline .spinner').hide();
    }, 500);
  };

})(jQuery);
