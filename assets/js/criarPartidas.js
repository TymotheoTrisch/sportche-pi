$('.number-increment').click(function() {
    var $input = $(this).parents('.input-incrementor').find('#input-participantes-partida');
    var val = parseInt($input.val(), 10);
    $input.val(val + 1);
  });
  
  $('.number-decrement').click(function() {
    var $input = $(this).parents('.input-incrementor').find('#input-participantes-partida');
    var val = parseInt($input.val(), 10);
    $input.val(val - 1);
  })