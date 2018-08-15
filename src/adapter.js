class Adapter {
  static getDogs(){
    fetch('http://localhost:3000/dogs')
      .then(res => res.json())
      .then(Dog.showDogs)
  }

  static getDog(id){
    return fetch(`http://localhost:3000/dogs/${id}`)
      .then(res => res.json())
  }

  static patchDog(data, id){
    // console.log(data);
    // const id = e.target.dataset.id
    // debugger

    const url = `http://localhost:3000/dogs/${id}`
    return fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(Dog.realTimeShow)

  }

};
