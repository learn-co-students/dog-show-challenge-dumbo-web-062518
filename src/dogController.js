class DogController {

  static renderDogList(){
    Adapter.getDogList().then(dogs => {
      const doggyTable = document.getElementById('dogtable')
      const mainDiv = document.getElementById('main-flex-div')
      const dogImg = document.createElement('img')
      dogImg.src = './assets/dog-show.jpg'
      dogImg.height = 400
      mainDiv.append(dogImg)
      dogs.forEach(dog => {
        // Set Row Data
        const dogRow = DogController.renderRow(dog)
          // Set Name Data
        const nameCell = DogController.renderCell('name', dog)
          // Set Breed Data
        const breedCell = DogController.renderCell('breed', dog)
          // Set Sex Data
        const sexCell = DogController.renderCell('sex', dog)
          // Set Editing Cell
        const editCell = document.createElement('td')
          editCell.dataset.id = dog.id
          // Set Editing Button Data
        const editButton = document.createElement('button')
          editButton.innerText = 'Edit Dog'
          editButton.dataset.id = dog.id
          editButton.addEventListener('click', DogController.prepEditForm)
          // Put it all on the page
        editCell.append(editButton)
        dogRow.append(nameCell, breedCell, sexCell, editCell)
        doggyTable.append(dogRow)
      })
    })
  }

  static renderRow(dog){
    const dogRow = document.createElement('tr')
      dogRow.id = `dog-row-${dog.id}`
      dogRow.dataset.id = dog.id
      dogRow.classList.add('padding')
    return dogRow
  }

  static renderCell(cellType, dog){
    const newCell = document.createElement('td')
      newCell.innerText = dog[`${cellType}`]
      newCell.dataset.id = dog.id
      newCell.id = `dog-${cellType}-${dog.id}`
    return newCell
  }

  static prepEditForm(e){
    const dogID = e.target.dataset.id
    Adapter.getOneDog(dogID).then(dog =>{
      const doggyForm = document.getElementById('dog-form')
        doggyForm.name.value =  dog.name
        doggyForm.breed.value = dog.breed
        doggyForm.sex.value =   dog.sex
        doggyForm.dataset.id = dog.id
    })
  }

  static editSubmit(e){
    e.preventDefault()

    const doggyForm = e.target
    const dogId = doggyForm.dataset.id
    if (dogId === 'null' || dogId === undefined){
      alert('Please select a dog to edit')
    } else {

    const dogName = doggyForm.name.value
    const dogBreed = doggyForm.breed.value
    const dogSex = doggyForm.sex.value
    const dogObj = {
      id: dogId,
      name: dogName,
      breed: dogBreed,
      sex: dogSex
    }
      Adapter.editDoggy(dogObj)

      const nameCell = document.getElementById(`dog-name-${dogId}`)
        nameCell.innerText = dogName

      const breedCell = document.getElementById(`dog-breed-${dogId}`)
        breedCell.innerText = dogBreed

      const sexCell = document.getElementById(`dog-sex-${dogId}`)
        sexCell.innerText = dogSex

      doggyForm.name.value = ''
      doggyForm.breed.value = ''
      doggyForm.sex.value = ''
      doggyForm.dataset.id = null
    }

  }

}
