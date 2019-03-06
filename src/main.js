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

function defaultDepartment(idDepartment, department, idZone, zone){
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box button').removeClass('active');
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box button.btn-'+ idDepartment +'').addClass('active');
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .centerBox ul').html(' ');
  coberturaData[zone][department].forEach((element) => {
    $('.coverage-search__container__nonfood__info #z-'+ idZone +' .grid-container .centerBox ul').append('<li>'+element+'</li>');
  });
}

function imageZoom(idImage){
  $(idImage).click(()=>{
    if ($(idImage).hasClass('zoom')) {
      $(idImage).removeClass('zoom');
      $('.centerBox__hideBox').removeClass('zoomBox');
      $('#food').css('position','relative');
      $('html').css('overflow-y','scroll');
    } else {
      $(idImage).addClass('zoom');
      $('#food').css('position','initial');
      $('.centerBox__hideBox').addClass('zoomBox');
      $('html').css('overflow-y','hidden');
    }
  });
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
    // Function that create the ul container with li childs and add/remove active class
    defaultDepartment('0', departamento, 'norte' ,'ZONA NORTE');
    $('.coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box button.btn-'+i+'').on("click", function() {
      defaultDepartment(i, departamento, 'norte' ,'ZONA NORTE');
    }); 
  }); 

  DepartamentosC.forEach((departamento, i) => {
    $(".coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box").append('<button class="btn-'+ i +'">' + departamento + '</button>');
    // Function that create the ul container with li childs and add/remove active class
    defaultDepartment('0', departamento, 'centro', 'ZONA CENTRO');
    $('.coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box button.btn-'+i+'').on("click", function() {
      defaultDepartment(i, departamento, 'centro' ,'ZONA CENTRO');
    });
  });

  DepartamentosS.forEach((departamento, i) => {
    $(".coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box").append('<button class="btn-'+ i +'">' + departamento + '</button>');
    // Function that create the ul container with li childs and add/remove active class
    defaultDepartment('0', departamento, 'sur', 'ZONA SUR');
    $('.coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box button.btn-'+i+'').on("click", function() {
      defaultDepartment(i, departamento, 'sur', 'ZONA SUR'); 
    }); 
  });


// Zoom

imageZoom('#b-img-01');
imageZoom('#b-img-02');
  
}); 







