

$(document).ready(function () {
  $.validator.defaults.ignore = ":hidden:not(.force-validate)";
  $("form.validation-required").validate();

  $('.tagsinput').tagsinput({
    tagClass: 'label label-primary'
  });
});

$(document).ready(function () {
  if($(".fixed-sidebar").hasClass())


  function memuWheel(e) {
    var delta = 0;
    if (e.wheelDelta) { delta = -e.wheelDelta/120; }
    if (e.detail) { delta = e.detail / 3; }

    var newTop = parseFloat($('.sidebar-collapse').css("top"))-delta*4;
    if(newTop < 0) {
      newTop = 0;
    }

    $('.sidebar-collapse').css("top", newTop)
  }

  function attachWheel(target)
  {
    $('.sidebar-collapse').css("top", 0);

    if (window.addEventListener)
    {
      target.addEventListener('DOMMouseScroll', memuWheel, false );
      target.addEventListener('mousewheel', memuWheel, false );
    }
    else
    {
      document.attachEvent("onmousewheel", memuWheel)
    }
  }

  attachWheel($('.sidebar-collapse').get(0));
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
