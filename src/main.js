require('bootstrap-grid');
require('./styles.scss');

// // var Vue = require('vue');
// import Vue from 'vue';

function changeType(evt, type, oneClass, twoClass){
  let i;
  let tabContent;
  let tabLinks;

  // Get all elements with class="tabcontent" and hide them
  tabContent = $(oneClass);
  for(i=0; i < tabContent.length; i++){
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tabLinks = $(twoClass);
  for(i=0; i < tabLinks.length; i++){
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  $('#'+ type).css('display','block');
  evt.currentTarget.className += " active";
}



$(document).ready(function() {
  //Header
  $('.tablinks.food').click(() => {changeType(event, 'food', '.tabcontent', '.tablinks');});
  $('.tablinks.nonfood').click(() => {changeType(event, 'nonfood', '.tabcontent', '.tablinks');});     
  
  //Food Events
  $('.tabLinksImg.b-01').click(() => {changeType(event, 'b-img-01', '.tabContentImg', '.tabLinksImg');});
  $('.tabLinksImg.b-02').click(() => {changeType(event, 'b-img-02', '.tabContentImg', '.tabLinksImg');});

  //Zones Eventes
  $('.tabLinksZone.z-n').click(() => {changeType(event, 'z-norte', '.tabContentZone', '.tabLinksZone');});
  $('.tabLinksZone.z-c').click(() => {changeType(event, 'z-centro', '.tabContentZone', '.tabLinksZone');});
  $('.tabLinksZone.z-s').click(() => {changeType(event, 'z-sur', '.tabContentZone', '.tabLinksZone');});
}); 







