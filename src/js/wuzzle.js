/*! Wuzzle | GPL v3 license | http://git.io/wuzzle */

// Simple function to select active tag
function getSelect(s) {
  'use strict';
  return s.options[s.selectedIndex].value;
}