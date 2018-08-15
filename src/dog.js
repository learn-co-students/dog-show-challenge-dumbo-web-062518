class Dog {

  static showDogs(dogs){
    const container = document.querySelector('#table-body')
    dogs.forEach(dog => {
      console.log(dog.name, dog.breed, dog.id, dog.sex)
      const tr = document.createElement('tr')
      tr.dataset.id = dog.id
      tr.class = `dog-${dog.id}`
      const name = document.createElement('td')
      name.innerHTML = dog.name
      name.id = `name-${dog.id}`
      const breed = document.createElement('td')
      breed.innerHTML = dog.breed
      breed.id = `breed-${dog.id}`
      const sex = document.createElement('td')
      sex.innerHTML = dog.sex
      sex.id = `sex-${dog.id}`
      const btn = document.createElement('button')
      btn.innerHTML = 'Edit Dog'
      btn.dataset.id = dog.id
      btn.addEventListener('click', Dog.handleDogShow)

      // Display Data
      tr.appendChild(name)
      tr.appendChild(breed)
      tr.appendChild(sex)
      tr.appendChild(btn)
      container.appendChild(tr)
    })
  }

  // Used POST update
  static realTimeShow(dog){
    console.log(dog.id)

    const dogName = document.querySelector(`#name-${CSS.escape(dog.id)}`)
    console.log(dogName)
    dogName.innerText = dog.name
    const dogBreed = document.querySelector(`#breed-${dog.id}`)
    dogBreed.innerText = dog.breed
    const dogSex = document.querySelector(`#sex-${dog.id}`)
    dogSex.innerText = dog.sex
    console.log(dogName.innerHTML)
    console.log(dogBreed.innerHTML)
    // debugger
  }

  static handleDogShow(e){
    let id = e.target.dataset.id
    return Adapter.getDog(id)
            .then(Dog.showDog)
          }

  static showDog(dog){

    const nameField = document.querySelector('#dog-name')
    nameField.value = dog.name
    nameField.id = dog.id

    const breedField = document.querySelector('#dog-breed')
    breedField.value = dog.breed
    breedField.id = dog.id

    const sexField = document.querySelector('#dog-sex')
    sexField.value = dog.sex
    sexField.id = dog.id

    const submitBtn = document.querySelector('#edit-a-dog')
    submitBtn.id = dog.id

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const data = {
        name: nameField.value,
        breed: breedField.value,
        sex: sexField.value
      }
      Adapter.patchDog(data, dog.id)
      })
    }

};
