const URL = 'https://pokeapi.co/api/v2'

export default class PokemonAPIServer {
  static getByName(name) {
    return fetch(`${URL}/pokemon-form/${name}/`)
            .then(r => {
              if (r.ok) {
                return r.json()
              } else {
                throw r
              }
            })
  }
}