'use strict';

let objectArr=[];
let objectArr2=[];
let keyArr = [];
let keyArr2 = [];
let uniqueArray=[];
let uniqueArray2=[];
function Animal(animal){
  this.title = animal.title;
  this.url = animal.image_url;
  this.descrip = animal.description;
  this.horns = animal.horns;
  this.keyword = animal.keyword;
}

Animal.prototype.page1=function(){
  objectArr.push(this);
  keyArr.push(this.keyword);
  uniqueArray = [...new Set(keyArr)];
};
Animal.prototype.page2=function(){
  objectArr2.push(this);
  keyArr2.push(this.keyword);
  uniqueArray2 = [...new Set(keyArr2)];
};

Animal.prototype.renderH = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  $('div').append(html);
};

function renderSelected(selected,arr) {
  $('div').html('');
  arr.forEach(element =>{
    if (selected === element.keyword) {
      element.renderH();
    }
  });
}

$(document).ready(function() {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('../../data/page-1.json', ajaxSettings)
    .then(data => {

      data.forEach(animal => {
        let newAnimal = new Animal(animal);
        newAnimal.page1();
      });
      function pageRender(arr,listArr) {
        $('div').html('');
        $('select').empty();
        arr.forEach(animal => {
          animal.renderH();
        });

        $('select').append(`<option value="default">Filter by Keyword</option>`);
        listArr.forEach(element =>{
          $('select').append(`<option value="${element}">${element}</option>`);
        });
        $('select').on('change', function(event){
          renderSelected(event.target.value,arr);
        });
      }

      $('.page1').click(function(){
        pageRender(objectArr,uniqueArray);
      });

      pageRender(objectArr,uniqueArray);

      $('.page2').click(function(){
        objectArr2=[];
        $.ajax('../../data/page-2.json', ajaxSettings)
          .then(data => {
            data.forEach(animal => {
              let newAnimal = new Animal(animal);
              newAnimal.renderH();
              newAnimal.page2();
            });
            pageRender(objectArr2,uniqueArray2);
          });
      });
    });
});
