class DogController {

  static init() {
    const dogList = Adapter.getDogs()
    dogList.then(dogs => DogController.renderDogs(dogs))
  }

  static renderDogs(dogs) {
    const dogsTable = document.getElementById('table-body')
    dogs.forEach( dog => {
      const el = DogController.dogElement(dog)
    })
  }

  static dogElement(dog) {
    const tableRow = document.createElement("TR")
    const dogTable = document.getElementById('table-body')
    let dogId = dog.id
    tableRow.innerHTML =
    `
    <td id="dogRowName">${dog.name}</td>
    <td id="dogRowBreed">${dog.breed}</td>
    <td id="dogRowSex">${dog.sex}</td>
    <td>
      <button
        data-id= ${dogId}
        onclick="DogController.updateDog(event)">Edit</button>
    </td>
    `
    tableRow.dataset.id = dog.id
    dogTable.append(tableRow)
  }

  static updateDog(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    const nameInput = document.getElementById('dogName')
    const breedInput = document.getElementById('dogBreed')
    const sexInput = document.getElementById('dogSex')
    const dogForm = document.getElementById('dog-form')
    let newDogName
    const dog = Adapter.getDog(id)
    dog.then(dogData => {
      nameInput.value = dogData.name
      breedInput.value = dogData.breed
      sexInput.value = dogData.sex
      dogForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const newDog = new Dog(nameInput.value, breedInput.value, sexInput.value)
        Adapter.updateDog(id, newDog)
      })
    })
  }

}
