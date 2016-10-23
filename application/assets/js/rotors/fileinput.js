$(function() {

$.fn.FileInput = function(trig) {

  this.each(function(i,elem){

    var $elem = $(elem);
    if (typeof $elem.attr('data-bfi-disabled') != 'undefined') {
      return;
    }
    var buttonWord = 'Browse';

    if (typeof $elem.attr('title') != 'undefined') {
      buttonWord = $elem.attr('title');
    }
    var input = $('<div>').append( $elem.eq(0).clone(true) ).html();
    var className = '';

    if (!!$elem.attr('class')) {
      className = ' ' + $elem.attr('class');
    }

    var parent = $('<a class="file-input-wrapper btn' + className + '"><span>'+buttonWord+'</span></a>');
    $elem.parents(":first").append(parent);
    $elem.appendTo($('.file-input-wrapper'));
    
    
  })
  .promise().done( function(){
    $('.file-input-wrapper').mousemove(function(cursor) {

      var input, wrapper,
        wrapperX, wrapperY,
        inputWidth, inputHeight,
        cursorX, cursorY;

      wrapper = $(this);
      input = wrapper.find("input");
      wrapperX = wrapper.offset().left;
      wrapperY = wrapper.offset().top;
      inputWidth= input.width();
      inputHeight= input.height();
      cursorX = cursor.pageX;
      cursorY = cursor.pageY;
      moveInputX = cursorX - wrapperX - inputWidth + 20;
      moveInputY = cursorY- wrapperY - (inputHeight/2);
      input.css({
        left:moveInputX,
        top:moveInputY
      });
    });

    $('.file-input-wrapper input[type=file]').change(function(){

      var fileName;
      fileName = $(this).val();

      $(this).parent().next('.file-input-name').remove();
      if (!!$(this).prop('files') && $(this).prop('files').length > 1) {
        fileName = $(this)[0].files.length+' files';
      }
      else {
        fileName = fileName.substring(fileName.lastIndexOf('\\')+1,fileName.length);
      }

      $(this).parent().after('<span class="file-input-name">'+fileName+'</span>');
    });

  });

};
var cssHtml = '<style>'+
  '.file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }'+
  '.file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }'+
  '.file-input-name { margin-left: 8px; }'+
  '</style>';
$('link[rel=stylesheet]').eq(0).before(cssHtml);

});