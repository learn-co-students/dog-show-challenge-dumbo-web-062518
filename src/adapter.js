class Adapter {

  static getDogList(){
    return fetch(DOGGY_URL)
      .then(res => res.json())
  }

  static getOneDog(dogId){
    return fetch(`${DOGGY_URL}/${dogId}`)
      .then(res => res.json())
  }

  static editDoggy(dogObj){
    return fetch(`${DOGGY_URL}/${dogObj.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dogObj),
    })
  }

}
