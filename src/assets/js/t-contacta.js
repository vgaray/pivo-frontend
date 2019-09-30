var element = null;
var textfield = "md-textfield",
    textfield__input = "md-textfield__input",
    textfiled__focused = "is-focused",
    textfiled__dirty = "is-dirty";
var select = "md-select",
    select__input = "md-select__input",
    select__focused = "is-focused",
    select__dirty = "is-dirty";
var toaster = "md-toaster",
    toaster__time = 3000,
    toaster__hidden = "is-visibility";
var dropdown__menu = "md-dropdown__menu";
var nav = "md-nav",
    nav_menu = "md-menu";
var layout = "md-layout",
    layout__title = "md-layout-title"
    layout__hidden = "md-layout__hidden";
var main = "md-main",
    main_opacity = "md-main__opacity";
var table = "md-table";
var button = "md-button";
var card = "md-card",
    card__menu = "md-card__menu",
    card__title = "md-card__title",
    card__title_text = "md-card__title-text",
    card__actions = "md-card__actions",
    card__supporting = "md-card__supporting-text";

// BOOTSTRAP
var modal = "modal";
var row = "row",
    row_fuild = "row-fluid";

$( document ).click(function (e) {
  initInput();
  initSelect(e);
  hiddenToaster(toaster__time);
  setSizeDropdown(e);
  if (!$($(e)[0].target).closest('.' + main).hasClass(layout__hidden) &&
      !$(e)[0].target.classList.contains(nav_menu) &&
      !$(e)[0].target.classList.contains(layout) &&
      !$(e)[0].target.classList.contains(layout__title) &&
      !$(e)[0].target.classList.contains(modal) &&
      !$(e)[0].target.classList.contains(textfield) &&
      !$(e)[0].target.classList.contains(textfield__input) &&
      !$(e)[0].target.classList.contains(select) &&
      !$(e)[0].target.classList.contains(select__input) &&
      !$(e)[0].target.classList.contains(table) &&
      !$(e)[0].target.classList.contains(card) &&
      !$(e)[0].target.classList.contains(button) &&
      !$(e)[0].target.classList.contains(card__menu) &&
      !$(e)[0].target.classList.contains(card__actions) &&
      !$(e)[0].target.classList.contains(card__supporting) &&
      !$(e)[0].target.classList.contains(card__title) &&
      !$(e)[0].target.classList.contains(card__title_text) &&
      !$(e)[0].target.classList.contains(row) &&
      !$(e)[0].target.classList.contains(row_fuild) &&
      validateClassRow($(e)[0].target.classList)) {
    toggleMenu();
  }
  if ($(e)[0].target.classList.contains(main_opacity)) {
    toggleMenu();
  }
});

function validateClassRow(listClass) {
  listClass.forEach( function(item, index) {
    if (item.indexOf('col') != -1) {
      return true
    }
    return false;
  });
}

$(document).ready(function(){
    initInput();
});

window.onload = function() {
  initInput();
}

document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
    };
})(), true);

function toggleMenu() {
  $( "." + main ).toggleClass(layout__hidden);
};

initInput();

function initInput() {
  $("." + textfield__input).focus(function() {
    onFocusInputs(this)
  }).focusout(function() {
    onBlurInputs()
  });
}

function onFocusInputs(e) {
  var element = $(e);
  if (element.hasClass(textfield__input)) {
    $("." + textfield__input).parent().removeClass(textfiled__focused);
    $(element).parent().addClass(textfiled__focused).addClass(textfiled__dirty);
  } else {
    onBlurInputs();
  }
}

function onBlurInputs() {
    var inputs = $("." + textfield__input);
    for ( var i = 0; i < inputs.length; i++) {
      var obj = $($("." + textfield__input)[i]).parent();
      obj.removeClass(textfiled__focused);
      if ($("." + textfield__input)[i].value.length == 0) {
        obj.removeClass(textfiled__dirty);
      }
    }
}

function initSelect(e) {
  $("." + select__input).parent().removeClass(select__focused);

  if (e.target.classList.contains(select__input)) {
    if (e.target.selectedIndex != 0) {
      $(e.target).parent().addClass(select__focused).addClass(select__dirty);
    } else {
      $(e.target).parent().removeClass(select__focused)
    }
  }
}

function hiddenToaster(time) {
  if(!$("." + toaster).hasClass(toaster__hidden)) {
    setTimeout(function(){
      $("." + toaster).removeClass(toaster__hidden)
    }, time);
  }
}

function setSizeDropdown(e) {
  var dropdown = $(e)[0].target;
  dropdown = $(dropdown);
  if ($(dropdown).attr('data-href') != undefined) {
    $("." + dropdown__menu).removeAttr("style")
  }

  dropdown = dropdown.attr('data-href');
  var obj = document.getElementById(dropdown);
  obj = $(obj);
  if (obj.hasClass(dropdown__menu)) {
    var height = 0, width = 0;

    if ( obj.closest('.open').length == 0) {
      var lis = obj.find('li');
      for ( var i = 0; i < lis.length; i++) {
        var li = obj.find('li')[i];
        height = height + 43.75;
        var ae = $(li).find('a')[0];
        width = li.offsetWidth;
      }
      obj.height(height);
      obj.width(width);
    } else {
      obj.removeAttr("style")
    }
  } else {
    $("." + dropdown__menu).removeAttr("style")
  }
}

