const $ = require('jquery');

window.$ = $;
window.jQuery = $;

$('body').scrollspy({
  target: '.bs-docs-sidebar',
  offset: 40,
});
