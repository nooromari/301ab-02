'use strict';

let objectArr=[];

function Animal(title,url,descrip,horns,keyword){
  this.title = title;
  this.url = url;
  this.descrip = descrip;
  this.horns = horns;
  this.keyword = keyword;
  objectArr.push(this);
}

Animal.prototype.render = function() {
  $('div').append(`<h2>${this.title}</h2>`);
  $('div').append(`<img src="${this.url}">`);
  $('div').append(`<p>${this.descrip}</p>`);
};

Animal.prototype.dropList = function(){
  let keyArr = [];
  let opt=false;
  if(!(keyArr.includes(this.keyword))){
      console.log(!(keyArr.includes(this.keyword)));
      opt=true;
      // console.log(!(keyArr.includes(this.keyword)));
    }
    if(opt){
    $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
    }
    keyArr.push(this.keyword);
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
    });
});

