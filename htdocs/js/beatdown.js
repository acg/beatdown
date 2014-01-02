; (function($) {


var bpm = 120;
var bars = 1;
var divisions = 8;
var tracks = [ 0, 0 ];
var sounds = [ "audio/click1.wav", "audio/click2.wav" ];
var playhead = 0;
var playing = false;
var interval = null;


$(document).ready(function() {

  var $play = $(':input[name="play"]');
  var $generate = $(':input[name="generate"]');
  var $bpm = $(':input[name="bpm"]');
  var $bars = $(':input[name="bars"]');
  var $divisions = $(':input[name="divisions"]');

  $play.click( function() {
    playing = !playing;
    $(this).val( playing ? 'pause' : 'play' );
    return false;
  } );

  $generate.click( function() {
    if (playing) $play.click();
    generate();
    return false;
  } );

  $bpm.val(bpm);
  $bpm.change( function() {
    bpm = parseInt( $bpm.val() );
    start_timer();
    return false;
  } );

  $bars.val(bars);
  $bars.change( function() {
    bars = parseInt( $bars.val() );
    generate();
    return false;
  } );

  $divisions.val(divisions);
  $divisions.change( function() {
    divisions = parseInt( $divisions.val() );
    generate();
    return false;
  } );

  generate();
  start_timer();

});


function start_timer()
{
  if (interval)
    clearInterval( interval );

  interval = null;
  interval = setInterval( play, 1000 / (bpm / 60));
}


function generate()
{
  stop();

  for (i=0; i<tracks.length; i++)
    tracks[i] = Math.round( Math.random() * (1 << (bars * divisions)) );

  draw();
}


function play()
{
  if (!playing)
    return;

  highlight();

  for (i=0; i<tracks.length; i++)
    if (tracks[i] & (1 << playhead))
      new Audio(sounds[i]).play();

  playhead += 1;
  playhead %= bars * divisions;
}


function stop()
{
  var $play = $(':input[name="play"]');
  if (playing) $play.click();
  playhead = 0;
  highlight();
}


function draw()
{
  var rows = [];

  for (i=0; i<tracks.length; i++)
  {
    var row = [];
    for (t=0; t<bars*divisions; t++)
    {
      var note_filled = tracks[i] & (1 << t);
      row.push( '<li class="note ' + (note_filled ? 'on' : 'off') + '"></li>' );
    }
    var shortcode = '<li class="shortcode"><em>' + tracks[i] + '</em></li>';
    var clear = '<li class="clear"></li>';
    rows.push( '<li> <ul class="track">' + row.join("\n") + '</ul> </li>' + shortcode + clear );
  }

  $('.sheetroll').html( rows.join("\n") );
}


function highlight()
{
  $('.sheetroll .note').removeClass('active');
  $('.sheetroll .track .note:nth-child(' + (playhead+1) + ')').addClass('active');
}



})(jQuery);
