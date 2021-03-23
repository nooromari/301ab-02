'use strict';

let objectArr=[];
let keyArr = [];
let uniqueArray=[];
function Animal(title,url,descrip,horns,keyword){
  this.title = title;
  this.url = url;
  this.descrip = descrip;
  this.horns = horns;
  this.keyword = keyword;
  objectArr.push(this);
}

Animal.prototype.render = function() {
  $('main').append(`<div><h2>${this.title}</h2><img src="${this.url}"><p>${this.descrip}</p></div>`);
  // $('div').append(`<img src="${this.url}">`);
  // $('div').append(`<p>${this.descrip}</p>`);
};

Animal.prototype.dropList = function(){
  keyArr.push(this.keyword);
  uniqueArray = [...new Set(keyArr)];
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
        newAnimal.render();
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
            $('div').append(`<h2>${element.title}</h2>`);
            $('div').append(`<img src="${element.url}">`);
            $('div').append(`<p>${element.descrip}</p>`);
          }
        });
      });
    });
});


