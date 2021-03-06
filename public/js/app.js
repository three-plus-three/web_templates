/**
 * Created with Gogland.
 * User: eeiceyes
 * Date: 2017/2/27
 * Time: 9:08
 * To change this template use File | Settings | File Templates.
 */

(function ($) {
  window.App = {
    deleteWith : function(url, callback, descr) {
      var self = this;

      var callFn = function(){};
      var opDescr = "操作失败";
      if(typeof callback === "function") {
        callFn = callback;
      }
      if(typeof descr === "string") {
        opDescr = "操作[" + descr + "]失败\r\n";
      } else if(typeof callback === "string") {
        opDescr = "操作[" + callback + "]失败\r\n";
      }

      $.ajax({
        url: url,
        method: "delete",
        success: callFn,
        error: function(error) {
          Msg.error(opDescr + self.resolveAjaxError(error));
        }
      })
    },
    formSubmit: function(url, method) {
      $("#postForm").attr("action", url)
      $("#postForm").find("[name=_method]").val(method);
      $("#postForm").submit()
    },
    linkTo : function(url) {
      var newUrl = url.indexOf("/") == 0 ? url : ("/" + url);
      var fullUrl = url.indexOf("http") == 0 ? url : (window.location.origin + newUrl);

      window.location.href = fullUrl;
    },
    onClientResize: function(callback) {
      if(typeof callback === 'undefined')
        return;

      $(window).resize(function() {
        callback();
      });

      $('#side-menu').bind("fadeInComplete", function() {
        callback();
      });
    },
    resolveAjaxError: function(error) {
      try {
        if(error.responseText && error.responseText.startsWith("{")) {
          var errObj = JSON.parse(error.responseText)
          if(errObj.error && errObj.error.code) {
            return "[" + errObj.error.code + "]" + errObj.error.message
          } else {
            return errObj.error || errObj.errorMessage || errObj.message || (errObj.errors && JSON.stringify(errObj.errors));
          }
        }
      } catch(err) {
        console.log(err);
      }

      return error.status + "\r\n" + error.statusText + "\r\n" + error.responseText;
    },
    setData: function(key, value){
      if(typeof $.cookieStorage != 'undefined') {
        var cPath = "/hengwei";
        if($("#urlPrefix").val()) {
          cPath = $("#urlPrefix").val();
          if(typeof cPath.lastIndexOf === "function" && typeof cPath.substring === "function" && cPath.lastIndexOf("/") === cPath.length-1) {
            cPath = cPath.substring(0, cPath.length-1)
          }
        }

        $.cookieStorage.setDomain(window.location.hostname).setPath(cPath).setExpires(365).set(key, value);
      } else if(typeof window.localStorage != 'undefined') {
        window.localStorage.setItem(key, value);
      }
    },
    getData: function(key){
      if(typeof $.cookieStorage != 'undefined') {
        return $.cookieStorage.setDomain(window.location.hostname).setPath("/hengwei").get(key);
      } else {
        return window.localStorage.getItem(key);
      }
    },
    serializeJson: function(objArray){
      return JSON.stringify(this.serializeObject(objArray));
    },
    serializeObject: function(objArray, movePrefix){
      var value = {};
      for(var i=0; i<objArray.length; i++) {
        var v = objArray[i];
        var name = v.name;

        if(movePrefix && name.indexOf(movePrefix) == 0)
          name = name.replace(movePrefix, "");

        if(!value[name]) {
          value[name] = [];
        }
        if(name.indexOf("[]") >= 0)
          value[name].push(v.value);
        else
          value[name] = v.value;
      }
      return value;
    },
    fullScreen: function (docElm) {
      var fullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;

      if (!fullscreen) {
        if(docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if(docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if(docElm.msRequestFullscreen){
          docElm.msRequestFullscreen();
        } else if(docElm.webkitRequestFullscreen) {
          docElm.webkitRequestFullScreen();
        }
        return true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        return false;
      }
    },
    isFullScreen: function(){
      var fullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
      return fullscreen;
    },
    openWindow: function(url, left, top, width, height) {
      try {
        if(window.parent && window.parent != window && window.parent.App && window.parent.App.openWindow) {
          window.parent.App.openWindow(url, left, top, width, height);
          return;
        }
      } catch (err) {
        console.log(err)
      }

      var winName = "newWindow_" + new Date().getTime();
      if(arguments.length == 2) {
        winName = arguments[1];
        left = 0;
        top = 0;
        width = window.innerWidth - 16;
        height = window.innerHeight;
      } else {
        if(!left)left = 0;
        if(!top)top = 0;
        if(!width)width = window.innerWidth - 16;
        if(!height)height = window.innerHeight;
      }

      var win = window.open(url, winName, "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ",resizable=yes,scrollbars=yes");

      if(!win) {
        alert("无法打开新窗口，请修改浏览器的设置，允许当前网站显示弹出式窗口！");  
      }                                                                   
      else {
        win.focus();
        return win;
      }
    },
    switchFullscreen: function (){
      var fullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;

      if (!fullscreen) {
        if(document.body.requestFullscreen) {
          document.body.requestFullscreen();
        } else if(document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen();
        } else if(document.body.msRequestFullscreen){
          document.body.msRequestFullscreen();
        } else if(document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullScreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
  };

  window.Msg = {
    confirm : function(msg, callback) {
      bootbox.confirm(msg, callback);
    },
    success : function(msg) {
      bootbox.alert(msg);
    },
    info : function(msg) {
      bootbox.alert(msg);
    },
    warn : function(msg) {
      bootbox.alert(msg);
    },
    error : function(msg) {
      bootbox.alert(msg);
    }
  };

  window.Modal = {
    show : function(selector, callback, options) {
      if(typeof options == "undefined") options = {resetForm:true}

      var innerForm = $(selector).find("form");
      if(typeof options.resetForm != "undefined" && options.resetForm && innerForm.length > 0 && typeof innerForm[0].reset === 'function') {
        innerForm[0].reset();
      }

      if(typeof options.data !== 'undefined') {
        $(innerForm).trigger("reset");
        this._fillForm($(selector), options.data)
        $(innerForm).trigger("filled");
      }

      $(selector).undelegate("#btnOk", "submit");
      $(selector).undelegate("#btnOk", "click");
      if($(selector).find("#btnOk").attr("type") == "submit") {
        $(selector).delegate("#btnOk", "click", function(event) {
          $(selector).find(".modal-body form:first").submit();
          return false;
        });
      } else {
        $(selector).delegate("#btnOk", "click", function() {
          if(innerForm.length <= 0 || innerForm.valid()) {
            var temForm = innerForm;
            if(innerForm.length <= 0) {
              temForm = $("<form></form>").append($(selector).find(".modal-body").clone());
            }

            var labels = {};
            temForm.find("select").each(function(){
              var $option = $(this).find("option:selected");
              if($option.length === 1) {
                labels[$option.val()] = $option.text();
              }
            });

            var formData = temForm.serialize();
            var dataArray = temForm.serializeArray();
            var jsonObject = App.serializeObject(dataArray);
            var jsonData = JSON.stringify(jsonObject);

            if(typeof callback == "function") {
              callback({innerForm: temForm,
                form: formData,
                array: dataArray,
                json: jsonData,
                jsonObject: jsonObject,
                valueLabels: labels,
                close: function() {
                  $(selector).find("[data-dismiss='modal']").click();
                }
              });
            }

            if(typeof options.autoClose === "undefined" || options.autoClose) {
              $(selector).find("[data-dismiss='modal']").click();
            }
          }
        });
      }

      $(selector).one('shown.bs.modal', function () {
        //to be fixed
      });
      $(selector).one('hide.bs.modal', function () {
        //to be fixed
      });

      $(selector).modal({backdrop:'static'});
    },
    showRemote: function(url, options) {
      if(!url) {
        console.log("url不能为空！");
        return;
      }

      if(typeof options == "undefined") {
        options = {};
      }

      $.ajax({
        url:url,
        success: function(modalHtml) {
          var $el = $(modalHtml);
          $el.appendTo($(document.body)).modal({backdrop:'static'});
          var innerForm = $el.find("form");

          if(typeof options.loadCallback != "undefined") {
            options.loadCallback.call(this, $el);
          }

          if(innerForm.length > 0) {
            $el.undelegate("#btnOk:not([type='submit'])", "click");
            $el.delegate("#btnOk:not([type='submit'])", "click", function() {
              if(innerForm.valid()) {
                var formData = innerForm.serialize();
                var dataArray = innerForm.serializeArray();
                var jsonObject = App.serializeObject(dataArray);
                var jsonData = JSON.stringify(jsonObject);

                if(typeof options.submitCallback != "undefined") {
                  options.submitCallback.call(this, {form:formData, array:dataArray, json:jsonData, jsonObject:jsonObject}, $el);
                }

                if(typeof options.autoClose === "undefined" || options.autoClose) {
                  $el.find("[data-dismiss='modal']").click();
                }
              }
            });

            // $el.undelegate("#btnOk[type='submit'])", "click");
            // $el.delegate("#btnOk[type='submit']", "click", function() {
            //   innerForm.submit()
            // });

            innerForm.bind("submit", function(event) {
              if(innerForm.valid()) {
                var formData = innerForm.serialize();
                var dataArray = innerForm.serializeArray();
                var jsonObject = App.serializeObject(dataArray);
                var jsonData = JSON.stringify(jsonObject);
                
                try {
                  if (!event.isDefaultPrevented()) {

                      $.post($(this).attr("action"), innerForm.serialize(), function(result){
                        if(typeof options.submitCallback != "undefined") {
                          options.submitCallback.call(this, {form:formData, array:dataArray, json:jsonData, jsonObject:jsonObject});
                        }
                        $el.find("[data-dismiss='modal']").click();
                      }).fail(function(error){
                        alert("保存失败！\r\n" + App.resolveAjaxError(error));
                      });
                  }
                } catch(error) {
                  if(typeof console != "undefined")
                    console.log(error.message + "\r\n" + error.stack);
                }
                return false;
              }
            });
          }

          $el.one('hide.bs.modal', function (event) {
            if(typeof event.dates == 'undefined') {
              $el.undelegate("#btnOk", "click");

              if(typeof options.destroyCallback != "undefined") {
                options.destroyCallback.call(this, $el);
              }
              $el.remove();
            }
          });

        }, error: function(error) {
          Msg.error("加载失败！\r\n" + App.resolveAjaxError(error));
        }
      })
    },
    _fillForm: function(wrapper, data) {
      for(var key in data) {
        var selector = "[name='" + key + "']";

        if(wrapper.find(selector).is(":radio")) {
          wrapper.find(selector + "[value='" + data[key] + "']").prop("checked", true);
        } else {
          if(typeof data[key] === "boolean") {
            wrapper.find(selector).prop("checked", data[key]);
          } else {
            if(wrapper.find(selector).is("input:radio")) {
              wrapper.find(selector + "[value='" + data[key] + "']").prop("checked", true);
            } else {
              wrapper.find(selector).val(data[key]);
            }
          }
        }
      }
    },
    _validateForm : function(form) {
      var custom = {
        focusCleanup: false,

        wrapper: 'div',
        errorElement: 'span',

        highlight: function (element) {
          $(element).parents('.form-group').removeClass('success').addClass('error');
        },
        success: function (element) {
          $(element).parents('.form-group').removeClass('error').addClass('success');
          var wrap = $(element).parents('.controls:not(:has(.clean))');
          if(wrap.find(".help-block").length > 0)
            wrap.find('.help-block').before('<div class="clean"></div>');
          else
            wrap.find('div:last').before('<div class="clean"></div>');
        },
        errorPlacement: function (error, element) {
          if (element.parents('.controls').length > 0)
            error.appendTo(element.parents('.controls'));
          else
            error.appendTo(element.parent());
        }
      };
      if($.validator) {
        $.validator.autoCreateRanges = true;
        $(form).validate(custom);
      }
    }
  };

  window.FormUtils = {
    disabledInputs: function($form){
      $form.find('select,input,textarea').attr("readonly","readonly");
      $form.find('select,input,textarea').attr("disabled", true);
      $form.find('select[multiple]').prop("disabled", true);
      $form.find('select[multiple]').trigger("chosen:updated");
    },
    enabledInputs: function($form){
      $form.find('select,input,textarea').removeAttr("readonly");
      $form.find('select,input,textarea').removeAttr("disabled");
      $form.find('select[multiple]').removeAttr("disabled");
      $form.find('select[multiple]').trigger("chosen:updated");
    }
  }
})(jQuery);

(function ($) {
  $(document.body).delegate("a[data-toggle='submit']", "click", function(event) {
    event.preventDefault();

    var targetSelector = $(this).attr("data-target");
    $(targetSelector).attr("action", $(this).attr("href"));

    var method = $(this).attr("method");
    $(targetSelector).attr("method", "POST");
    if(typeof method === 'undefined' || method.toLowerCase() == "get") {
      $(targetSelector).attr("method", "GET");
    } else {
      $(targetSelector).find("[name=_method]").val(method);
    }

    var dataConfirm = $(this).attr("data-confirm");
    if(typeof dataConfirm === 'undefined'
        || (confirm(dataConfirm))){
      $(targetSelector).submit();
    }
  })

  $(function ($) {
    if( typeof $.fn.datepicker != "undefined") {
      $('.form-control.date').datepicker({
        format: "yyyy-mm-dd",
        keyboardNavigation: false,
        language: "zh-CN",
        forceParse: false,
        autoclose: true
      });
    }

    if(typeof bootbox != "undefined") {
      bootbox.setDefaults("locale","zh_CN");
    }

    window.setTimeout(100, function(){
      // $("#side-menu").trigger("mouseover");
      $(".metismenu").trigger("mouseover");
    });
  })

})(jQuery);


//enable consequent-load
$(function(){
  $(".consequent-load").each(function () {
    var self = $(this);
    var interval = 10000;
    if(self.attr("refresh-interval")) {
      interval = parseInt(self.attr("refresh-interval")) * 1000;
    }

    function loadPart() {
      self.load(self.attr("remote-url"), "", function (response, status, xhr) {
        window.setTimeout(loadPart, interval);
      });
    }

    loadPart();
  });
})

$(function(){
  try {
    $.mockjax({
      url: '/post',
      response: function () {
        //
      }
    });
  } catch(e) {
    //ignore error
  };
})

if(typeof $.jgrid != "undefined") {
  $.jgrid.defaults.responsive = true;
  $.jgrid.defaults.styleUI = 'Bootstrap';
}



