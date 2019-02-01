require('bootstrap-grid');
require('./styles.scss');

var coberturaData = require('./cobertura-metro-obj');


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


//JSON
// console.log(coberturaData["ZONA CENTRO"].ANTIOQUIA);

var DepartamentosN = Object.keys(coberturaData["ZONA NORTE"]);
var DepartamentosC = Object.keys(coberturaData["ZONA CENTRO"]);
var DepartamentosS = Object.keys(coberturaData["ZONA SUR"]);
var Zonas = Object.keys(coberturaData);

// console.log(Departamentos);


DepartamentosN.forEach((departamento , i) => {
  $(".coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box").append('<button class="btn-'+ i +'">' + departamento + '</button>');
  $('.coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box button.btn-'+i+'').on("click", function() {
    $('.coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box button').removeClass('active');
    $('.coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box button.btn-'+i+'').addClass('active');
    $(".coverage-search__container__nonfood__info #z-norte .grid-container .centerBox ul").html(' ');
    coberturaData["ZONA NORTE"][departamento].forEach((element) => {
      $(".coverage-search__container__nonfood__info #z-norte .grid-container .centerBox ul").append('<li>'+element+'</li>');
    });
  }); 
});

DepartamentosC.forEach((departamento, i) => {
  $(".coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box").append('<button class="btn-'+ i +'">' + departamento + '</button>');
  $('.coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box button.btn-'+i+'').on("click", function() {
    $('.coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box button').removeClass('active');
    $('.coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box button.btn-'+i+'').addClass('active');
    $(".coverage-search__container__nonfood__info #z-centro .grid-container .centerBox ul").html(' ');
    coberturaData["ZONA CENTRO"][departamento].forEach((element) => {
      $(".coverage-search__container__nonfood__info #z-centro .grid-container .centerBox ul").append('<li>'+element+'</li>');
    });
  });
});

DepartamentosS.forEach((departamento, i) => {
  $(".coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box").append('<button class="btn-'+ i +'">' + departamento + '</button>');
  $('.coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box button.btn-'+i+'').on("click", function() {
    $('.coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box button').removeClass('active');
    $('.coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box button.btn-'+i+'').addClass('active');
    $(".coverage-search__container__nonfood__info #z-sur .grid-container .centerBox ul").html(' ');
    coberturaData["ZONA SUR"][departamento].forEach((element) => {
      $(".coverage-search__container__nonfood__info #z-sur .grid-container .centerBox ul").append('<li>'+element+'</li>');
    });
  }); 
});
  





// for(var i = 0; coberturaData["ZONA CENTRO"].ANTIOQUIA.length; i++) {
//   console.log(coberturaData["ZONA CENTRO"].ANTIOQUIA[i]);
// }

// console.log(Object.keys(coberturaData));

// var zonas = Object.keys(coberturaData);

// for (var i = 0; zonas.length; i++ ) {
//   console.log(coberturaData[i]);
// }


// Object.values(coberturaData).forEach(value => {
//   console.log(value);
// });

}); 







