//html5 ie hack
document.createElement("article");
document.createElement("footer");
document.createElement("header");
document.createElement("hgroup");
document.createElement("nav");

// select active tag
function getSelect(s) {
  'use strict';
  return s.options[s.selectedIndex].value
}
