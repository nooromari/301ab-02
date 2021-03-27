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
  // objectArr.push(this);
}

// Animal.prototype.render = function() {
//   $('main').append(`<div class="${this.keyword}"><h2>${this.title}</h2><img src="${this.url}"><p>${this.descrip}</p></div>`);
// };
Animal.prototype.page1=function(){
  objectArr.push(this);
  keyArr.push(this.keyword);
  uniqueArray = [...new Set(keyArr)];
};
Animal.prototype.page2=function(){
  objectArr2.push(this);
  keyArr2.push(this.keyword);
  uniqueArray2 = [...new Set(keyArr)];
};

// Animal.prototype.dropList = function(){
//   keyArr.push(this.keyword);
//   uniqueArray = [...new Set(keyArr)];
// };
// Animal.prototype.dropList2 = function(){
//   keyArr.push(this.keyword);
//   uniqueArray2 = [...new Set(keyArr)];
// };

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
      // $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.url}"><p>${element.descrip}</p></div>`);
    }
  });
}

// function list(params) {
  
// }
$(document).ready(function() {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {

      data.forEach(animal => {
        let newAnimal = new Animal(animal);
        // newAnimal.renderH();
        newAnimal.page1();
        // newAnimal.dropList();
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
        // $('div').html('');
        // $('main').append($('<div></div>'));
        // objectArr.forEach(element =>{
        //   if (event.target.value === element.keyword) {
        //     element.renderH();
        //     // $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.url}"><p>${element.descrip}</p></div>`);
        //   }
        // });
        });
      }

      $('.page1').click(function(){

        pageRender(objectArr,uniqueArray);
      });
      pageRender(objectArr,uniqueArray);
      // $('div').html('');
      // const ajaxSettings = {
      //   method: 'get',
      //   dataType: 'json'
      // };
      // $.ajax('../data/page-1.json', ajaxSettings)
      //   .then(data => {
      //     data.forEach(animal => {
      //       let newAnimal = new Animal(animal);
      //       newAnimal.renderH();

      //       newAnimal.dropList();
      //     });
      //     // uniqueArray.forEach(element =>{
      //     //   $('select').append(`<option value="${element}">${element}</option>`);
      //     // });
      //     $('select').on('click', function(event){
      //       $('div').remove();
      //       $('main').append($('<div></div>'));
      //       objectArr.forEach(element =>{
      //         if (event.target.value === element.keyword) {
      //           $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.url}"><p>${element.descrip}</p></div>`);
      //         }
      //       });
      //     });
      //   });

      $('.page2').click(function(){
        // pageRender();
        // $('div').hide();
        // $('option').remove();
        // const ajaxSettings = {
        //   method: 'get',
        //   dataType: 'json'
        // };
        objectArr2=[];
        // uniqueArray=[];
        $.ajax('../data/page-2.json', ajaxSettings)
          .then(data => {
            data.forEach(animal => {
              let newAnimal = new Animal(animal);
              newAnimal.renderH();
              newAnimal.page2();
              // newAnimal.dropList();
              // console.log(newAnimal);
            });
            pageRender(objectArr2,uniqueArray2);
            //     $('select').append(`<option value="default">Filter by Keyword</option>`);

            //     uniqueArray2.forEach(element =>{
            //       $('select').append(`<option value="${element}">${element}</option>`);
            //     });
            //     $('select').on('click', function(event){
            //       $('div').remove();
            //       $('main').append($('<div></div>'));
            //       data.forEach(element =>{
            //         if (event.target.value === element.keyword) {
            //           $('main').append(`<div class="${element.keyword}"><h2>${element.title}</h2><img src="${element.image_url}"><p>${element.description}</p></div>`);

            //         }
            //       });
            //     });
          });
      });
    });
});
