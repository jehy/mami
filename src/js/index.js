import '../css/prettify.css';
import '../css/style.css';
import '../../node_modules/code-prettify/styles/sunburst.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-theme.css';

const $ = require('jquery');

window.$ = $;
window.jQuery = $;
require('bootstrap');
require('code-prettify');
require('code-prettify/src/run_prettify');
require('./layout');
