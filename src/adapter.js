class Adapter {

    static async getDogs() {
      const response = await fetch("http://localhost:3000/dogs")
      const data = await response.json()
      return data
    }

    static async updateDog(id, dog) {
      const data = dog
      const response = await fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
      })
      const dogName = document.getElementById('dogRowName').innerText = dog.name
      const dogBreed = document.getElementById('dogRowBreed').innerText = dog.breed
      const dogSex = document.getElementById('dogRowSex').innerText = dog.sex
    }

    static async getDog(id) {
      const response = await fetch(`http://localhost:3000/dogs/${id}`)
      const data = await response.json()
      return data
    }

}
