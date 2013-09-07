(function() {
  var calatrava, root;

  root = this;

  if (root.calatrava == null) root.calatrava = {};

  calatrava = root.calatrava;

  $(document).ready(function() {
    return $('body > .container > .page').hide();
  });

  window.onpopstate = function(event) {
    if (event.state) return calatrava.bridge.changePage(event.state.page);
  };

}).call(this);
