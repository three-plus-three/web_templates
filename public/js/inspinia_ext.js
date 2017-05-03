

$(document).ready(function () {
//init client plugins
  $(document).ready(function () {
    $.validator.defaults.ignore = ":hidden:not(.force-validate)";
    $("form.validation-required").validate();

    $('.tagsinput').tagsinput({
      tagClass: 'label label-primary'
    });
  });
});

function SmoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
        function () {
          $('#side-menu').fadeIn(400, function(){
            $('#side-menu').trigger("fadeInComplete");
          });
        }, 200);
  } else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout(
        function () {
          $('#side-menu').fadeIn(400, function(){
            $('#side-menu').trigger("fadeInComplete");
          });
        }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style');
  }
}