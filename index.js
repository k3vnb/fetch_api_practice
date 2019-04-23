'use strict'

function renderDogImages(json, breed) {
  console.log(json);
  const newImage = json.message;
  $('.results').append(`<img class="dog-img" src=${newImage} alt='${breed} doggo!'>`).show();
}

function handleError(){
    $('.results').append('<h2>Sorry, that breed is not found</h2>').show();
}

function getDogImage(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(response =>   {
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => renderDogImages(responseJson, breed))
      .catch(error => {
          console.log(error);
          handleError();
    })
  }

function resetField() {
  $('.results').empty();
  $('input[name="breed"]').val('');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results').hide(20);
    const breed = $("input[name='breed']").val();
    resetField();
    getDogImage(breed);
  });
}

$(() => {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});