require('bootstrap-grid');
require('./styles.scss');

var coberturaData = require('./cobertura-metro-obj');

// Tabs Shipping and Zones 

/**
 * This function handles the click over the tabs of Department
 * 
 * @param {Event} evt Click event
 * @param {String} type ID of the parent element
 * @param {String} oneClass Class of the element which shows the content
 * @param {String} twoClass Class of the button which receives the click
 */
function  changeType(evt, type, oneClass, twoClass){
  let i,tabContent,tabLinks;

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


/**
 * This functions render the cities based on the idZone
 * 
 * @param {String} idDepartment Index of list
 * @param {Element} department Current element of the list 
 * @param {String} idZone Should be "norte", "centro", "sur"
 * @param {String} zone Datatype which origins from the JSON file of zones
 */

function defaultDepartment(idDepartment, department, idZone, zone){
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box button').removeClass('active');
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box button.btn-'+ idDepartment +'').addClass('active');
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .centerBox ul').html(' ');
  coberturaData[zone][department].forEach((element) => {
    $('.coverage-search__container__nonfood__info #z-'+ idZone +' .grid-container .centerBox ul').append('<li>'+element+'</li>');
  });
}

function imageZoom(idImage, closeImage){
  let containerImages = $('.centerBox__hideBox');
  let containerFood = $('#food');
  let containerAll = $('html');
  let closeIcon = $('.close__icon');

  $(idImage).click(() => {
    if ($(idImage).hasClass('zoom')) {
      $(idImage).removeClass('zoom');
      containerImages.removeClass('zoomBox');
      containerFood.css('position','relative');
      containerAll.css('overflow-y','scroll');
      closeIcon.css('display','none');
      
    } else {
      $(idImage).addClass('zoom');
      containerFood.css('position','initial');
      containerImages.addClass('zoomBox');
      closeIcon.css('display','inline-block');
      containerAll.css('overflow-y','hidden'); 
    }
  });

  $(closeImage).click(() => {
      $(idImage).removeClass('zoom');
      containerImages.removeClass('zoomBox');
      containerFood.css('position','relative');
      containerAll.css('overflow-y','scroll');
      closeIcon.css('display','none');
  });
}

function accordionMobile(idDepartment, department, idZone, zone){
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box button').removeClass('active');
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box button.btn-'+ idDepartment +'').addClass('active');
  $('.coverage-search__container__nonfood__info #z-'+ idZone + ' .grid-container .sideBar__box ul.btn-mobile').html(' ');
  coberturaData[zone][department].forEach((element) => {
    $('.coverage-search__container__nonfood__info #z-'+ idZone +' .grid-container .sideBar__box ul.btn-mobile').append('<li>'+element+'</li>');
  });
}

/**
 * 
 * @param {*} index 
 * @param {*} department 
 * @param {*} evento 
 * @param {*} idZone 
 * @param {*} zone 
 */

function coberturaMobile(index,department,evento,idZone,zone){
  let eventBtn = evento.target;
  let classBtn = eventBtn.classList[0];

  if ($('.sideBar__box').find('.btn-mobile').length > 0) {
    $('.btn-mobile').remove();
    $('.btn').removeClass('active');
    $('.'+classBtn+'.btn-'+ idZone +'').after( '<ul class="' + classBtn + '-mobile btn-mobile"></ul>' );
    // Render of Department
    accordionMobile(index, department, idZone, zone);
  } else {
    $('.'+classBtn+'.btn-'+ idZone +'').after( '<ul class="' + classBtn + '-mobile btn-mobile"></ul>' );
    accordionMobile(index, department, idZone, zone);
  }
}

// Change the URL Hash
/**
 * 
 * @param {Boton que activa el evento} event 
 * @param {String del Hash a mostrar} newHash 
 */
function coberturaHash(event,newHash) {
    $(document).on('click', event ,() => {
      location.hash = newHash;
  });
}




$(document).ready(function() {
  // URL Development
  if (window.location.href.indexOf("cobertura#mercado") > -1) {
    changeType(event, 'food', '.tabcontent', '.tablinks');
    $('.header-tabs__tab.tablinks.food').addClass('active');
  }

  if (window.location.href.indexOf("cobertura#tecnologia-y-hogar") > -1) {
    changeType(event, 'nonfood', '.tabcontent', '.tablinks');
    $('.header-tabs__tab.tablinks.nonfood').addClass('active');
  }


coberturaHash('.header-tabs__tab.tablinks.food', '#mercado');
coberturaHash('.header-tabs__tab.tablinks.nonfood', '#tecnologia-y-hogar');


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
  var DepartamentosN = Object.keys(coberturaData["ZONA NORTE"]);
  var DepartamentosC = Object.keys(coberturaData["ZONA CENTRO"]);
  var DepartamentosS = Object.keys(coberturaData["ZONA SUR"]);
  var Zonas = Object.keys(coberturaData); 



  
  DepartamentosN.forEach((departamento , i) => {
    $(".coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box").append('<button class="btn-'+ i +' btn btn-norte">' + departamento + '</button>');
    // Function that create the ul container with li childs and add/remove active class
    if ( $(window).width() > 760 ) {
      // First view before click
      defaultDepartment('0', departamento, 'norte' ,'ZONA NORTE');
    }
    
    $('.coverage-search__container__nonfood__info #z-norte .grid-container .sideBar__box button.btn-'+i+'').on("click", function(e) {
      // If > of 760 Desktop | If minor <= 760 Mobile
      if ( $(window).width() <= 760 ) {
        // If has class Active and click in the same botton close that one
        if (!$('.btn-'+i+'').hasClass('active')) {
          coberturaMobile(i , departamento, e ,'norte', 'ZONA NORTE');
        }else{
          $('.btn-mobile').remove();
          $('.btn').removeClass('active');
        }
      }else{
        defaultDepartment(i, departamento, 'norte' ,'ZONA NORTE');
      }

    }); 
  }); 
 
  DepartamentosC.forEach((departamento, i) => {
    $(".coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box").append('<button class="btn-'+ i +' btn btn-centro">' + departamento + '</button>');
    // Function that create the ul container with li childs and add/remove active class
    if ( $(window).width() > 760 ) {
      // First view before click
      defaultDepartment('0', departamento, 'centro', 'ZONA CENTRO');
    }
    
    $('.coverage-search__container__nonfood__info #z-centro .grid-container .sideBar__box button.btn-'+i+'').on("click", function(e) {
      // If > of 760 Desktop | If minor <= 760 Mobile
      if ( $(window).width() <= 760 ) {
        // If has class Active and click in the same botton close that one
        if (!$('.btn-'+i+'').hasClass('active')) {
          coberturaMobile(i , departamento, e ,'centro', 'ZONA CENTRO');
        }else{
          $('.btn-mobile').remove();
          $('.btn').removeClass('active');
        }
      }else{
        defaultDepartment(i, departamento, 'centro' ,'ZONA CENTRO');
      }

    });
  });

  DepartamentosS.forEach((departamento, i) => {
    $(".coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box").append('<button class="btn-'+ i +' btn btn-sur">' + departamento + '</button>');
    // Function that create the ul container with li childs and add/remove active class
      if ( $(window).width() > 760 ) {
        // First view before click
        defaultDepartment('0', departamento, 'sur', 'ZONA SUR');
      }

    $('.coverage-search__container__nonfood__info #z-sur .grid-container .sideBar__box button.btn-'+i+'').on("click", function(e) { 
      // If > of 760 Desktop | If minor <= 760 Mobile
      if ( $(window).width() <= 760 ) {
        // If has class Active and click in the same botton close that one
        if (!$('.btn-'+i+'').hasClass('active')) {
          coberturaMobile(i , departamento, e ,'sur', 'ZONA SUR');
        }else{
          $('.btn-mobile').remove();
          $('.btn').removeClass('active');
        }
      }else{
        defaultDepartment(i, departamento, 'sur', 'ZONA SUR');
      }

    }); 
  });


// Zoom

imageZoom('#b-img-01', '.close__icon');
imageZoom('#b-img-02', '.close__icon');

}); 







