; (function($) {

$(document).ready(function() {

  $(':input[name="play"]').click( function() {
    var snd = new Audio("audio/click.wav");
    snd.play();
    return false;
  } );

});

})(jQuery);

