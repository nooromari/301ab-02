'use strict';

let objectArr=[];
let keyArr = [];
let uniqueArray=[];
let uniqueArray2=[];
function Animal(title,url,descrip,horns,keyword){
  this.title = title;
  this.url = url;
  this.descrip = descrip;
  this.horns = horns;
  this.keyword = keyword;
  objectArr.push(this);
}

// Animal.prototype.render = function() {
//   $('main').append(`<div class="${this.keyword}"><h2>${this.title}</h2><img src="${this.url}"><p>${this.descrip}</p></div>`);
// };

Animal.prototype.dropList = function(){
  keyArr.push(this.keyword);
  uniqueArray = [...new Set(keyArr)];
};
Animal.prototype.dropList2 = function(){
  keyArr.push(this.keyword);
  uniqueArray2 = [...new Set(keyArr)];
};

Animal.prototype.toHtml = function () {
  // 1. Get the template from the HTML document
  let template = $('#photo-template').html();
  // 2. Use Mustache to "render" new html by merging the template with the data
  let html = Mustache.render(template, this);
  // 3. Do not forget to return the HTML from this method
  // console.log(this);
  return html;
};

$(document).ready(function() {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(element => {
        let newAnimal = new Animal(element.title,element.image_url,element.description,element.horns,element.keyword);
        // newAnimal.render();
        newAnimal.toHtml();
        newAnimal.dropList();
      });
      uniqueArray.forEach(element =>{
        $('select').append(`<option value="${element}">${element}</option>`);
      });
      $('select').on('click', function(event){
        $('div').remove();
        $('main').append($('<div></div>'));
        objectArr.forEach(element =>{
          if (event.target.value === element.keyword) {
            $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.url}"><p>${element.descrip}</p></div>`);
          }
        });
      });
    });
  $('.page1').click(function(){
    $('div').hide();
    const ajaxSettings = {
      method: 'get',
      dataType: 'json'
    };
    $.ajax('../data/page-1.json', ajaxSettings)
      .then(data => {
        data.forEach(element => {
          let newAnimal = new Animal(element.title,element.image_url,element.description,element.horns,element.keyword);
          // newAnimal.render();

          newAnimal.dropList();
        });
        // uniqueArray.forEach(element =>{
        //   $('select').append(`<option value="${element}">${element}</option>`);
        // });
        $('select').on('click', function(event){
          $('div').remove();
          $('main').append($('<div></div>'));
          objectArr.forEach(element =>{
            if (event.target.value === element.keyword) {
              $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.url}"><p>${element.descrip}</p></div>`);
            }
          });
        });
      });
  });
  $('.page2').click(function(){
    $('div').hide();
    $('option').remove();
    const ajaxSettings = {
      method: 'get',
      dataType: 'json'
    };
    $.ajax('../data/page-2.json', ajaxSettings)
      .then(data => {
        data.forEach(element => {
          let newAnimal = new Animal(element.title,element.image_url,element.description,element.horns,element.keyword);
          // newAnimal.render();
          newAnimal.dropList2();
        });
        $('select').append(`<option value="default">Filter by Keyword</option>`);
        uniqueArray2.forEach(element =>{
          $('select').append(`<option value="${element}">${element}</option>`);
        });
        $('select').on('click', function(event){
          $('div').remove();
          $('main').append($('<div></div>'));
          data.forEach(element =>{
            if (event.target.value === element.keyword) {
              $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.image_url}"><p>${element.description}</p></div>`);

            }
          });
        });
      });
  });
});


