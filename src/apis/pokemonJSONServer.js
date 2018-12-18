const URL = 'http://localhost:3000/pokemon'

export default class PokemonJSONServer {
  static getAll() {
    return fetch(URL)
      .then(r => r.json())
  }

  static post(data) {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return fetch(URL, params)
            .then(r => {
              if (r.ok) {
                return r.json()
              } else {
                throw r
              }
            })
  }
}