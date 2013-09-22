//html5 IE hack
document.createElement("header");
document.createElement("hgroup");
document.createElement("article");
document.createElement("footer");
document.createElement("nav");

// select active tag
function getSelect(s) {
  'use strict';
  return s.options[s.selectedIndex].value
}
