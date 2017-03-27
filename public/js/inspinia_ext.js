

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