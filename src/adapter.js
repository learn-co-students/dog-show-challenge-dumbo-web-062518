class Adapter {
  static async fetchDogs() {
    const response = await fetch(`http://localhost:3000/dogs`)
    return response.json()
  }

  static async fetchDog(id) {
    const response = await fetch(`http://localhost:3000/dogs/${id}`)
    return response.json()
  }

  static async editDog(id, body) {
    await fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(console.log)
    // console.log(body)
    DogController.updateRow(id)
  }
}
