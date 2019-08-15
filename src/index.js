const DOGGY_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {

  const doggyForm = document.getElementById('dog-form')
    doggyForm.addEventListener('submit', DogController.editSubmit)

  DogController.renderDogList()

})
