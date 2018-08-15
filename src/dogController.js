class DogController {
  static init() {
    document.querySelector("table").setAttribute("id", "dog-table")
    this.renderDogs()

    const submitBtn = document.querySelector("#dog-form input[type='submit']")
    submitBtn.onclick = e => {
      e.preventDefault()
      this.submitForm()
    }
  }

  static renderDogs() {
    const dogTable = document.querySelector("#dog-table #table-body")
    dogTable.innerHTML = ""

    const dogsData = Adapter.fetchDogs()

    dogsData.then(dogs => {
      dogs.forEach(dog => {
        const doggo = new Dog(dog.id, dog.name, dog.breed, dog.sex)

        const tr = document.createElement("tr")
        tr.setAttribute("id", `dog-${doggo.id}`)

        const tdName = document.createElement("td")
        tdName.innerText = doggo.name
        tdName.className = "name"

        const tdBreed = document.createElement("td")
        tdBreed.innerText = doggo.breed
        tdBreed.className = "breed"

        const tdSex = document.createElement("td")
        tdSex.innerText = doggo.sex
        tdSex.className = "sex"

        const editBtn = document.createElement("button")
        editBtn.innerText = "Edit"
        editBtn.dataset.id = doggo.id
        editBtn.onclick = e => this.populateForm(e.target)
        const tdEditDog = document.createElement("td")
        tdEditDog.append(editBtn)

        tr.append(tdName, tdBreed, tdSex, tdEditDog)
        dogTable.append(tr)
      })
    })
  }

  static populateForm(target) {
    const inputForm = document.querySelector("#dog-form")
    const inputName = document.querySelector("#dog-form input[name='name']")
    const inputBreed = document.querySelector("#dog-form input[name='breed']")
    const inputSex = document.querySelector("#dog-form input[name='sex']")

    const dogData = Adapter.fetchDog(target.dataset.id)
    dogData.then(dog => {
      inputForm.dataset.id = dog.id
      inputName.value = dog.name
      inputBreed.value = dog.breed
      inputSex.value = dog.sex
    })
  }

  static submitForm() {
    const inputForm = document.querySelector("#dog-form")
    const inputName = document.querySelector("#dog-form input[name='name']")
    const inputBreed = document.querySelector("#dog-form input[name='breed']")
    const inputSex = document.querySelector("#dog-form input[name='sex']")

    const body = {
      id: inputForm.dataset.id,
      name: inputName.value,
      breed: inputBreed.value,
      sex: inputSex.value
    }

    Adapter.editDog(inputForm.dataset.id, body)
    inputForm.value = ""
    inputName.value = ""
    inputBreed.value = ""
    inputSex.value = ""
  }

  static updateRow(id) {
    const row = document.querySelector(`#dog-table #table-body tr#dog-${CSS.escape(id)}`)
    const name = document.querySelector(`#dog-table #table-body tr#dog-${CSS.escape(id)} td.name`)
    const breed = document.querySelector(`#dog-table #table-body tr#dog-${CSS.escape(id)} td.breed`)
    const sex = document.querySelector(`#dog-table #table-body tr#dog-${CSS.escape(id)} td.sex`)

    const dogData = Adapter.fetchDog(id)
    dogData.then(dog => {
      name.innerText = dog.name
      breed.innerText = dog.breed
      sex.innerText = dog.sex
    })
  }
}
