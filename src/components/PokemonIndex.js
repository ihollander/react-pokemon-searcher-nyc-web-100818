import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import PokemonSort from './PokemonSort'
import { Search, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import PokemonJSONServer from '../apis/pokemonJSONServer'
import PokemonAPIServer from '../apis/pokemonAPIServer'

const sortOptions = [
  {
    text: 'Id',
    value: 'id'
  },
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Weight',
    value: 'weight'
  }
]

class PokemonIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      term: "",
      sortValue: "id"
    }
    this.debounceSearch = _.debounce(this.handleSearchChange, 500)
  }

  componentDidMount() {
    PokemonJSONServer.getAll()
      .then(pArray => {
        const pokemon = pArray.map(p => ({...p, flipped: false}))
        this.sort(pokemon, "id")
        this.setState({ pokemon })
      })
  }

  onCardClick = flippedPokemon => {
    this.setState(prevState => {
      const pokemon = prevState.pokemon.map(p => (flippedPokemon === p) ? {...p, flipped: !p.flipped} : p)
      return { pokemon }
    })
  }

  onSearchChange = e => {
    e.persist()
    this.debounceSearch(e)
  }
  
  handleSearchChange = e => {
    const term = e.target.value
    this.setState({ term })
  }

  sort(array, key) {
    array.sort((a,b) => {
      if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key])
      } else if (typeof a[key] === 'number') {
        return a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0)
      } else {
        return -1
      }
    })
  }

  handleSort = (e, data) => {
    this.setState({
      sortValue: data.value
    }, () => {
      const pokemon = [...this.state.pokemon]
      const sort = this.state.sortValue
      this.sort(pokemon, sort)
      this.setState({ pokemon })
    })
  }

  savePokemon = (apiData) => {
    const cleanPoke = {
      id: apiData.id,
      name: apiData.name,
      weight: Math.floor(Math.random() * 1000), 
      sprites: {
        front: apiData.sprites.front_shiny,
        back: apiData.sprites.back_shiny
      },
      stats: [
        {
          name: 'hp',
          value: Math.floor(Math.random() * 100)
        }
      ]
    }

    PokemonJSONServer.post(cleanPoke)
      .then(newPoke => {
        this.setState(prevState => ({ pokemon: [newPoke, ...prevState.pokemon] }))
      })
      .catch(console.error)
  }

  handleNewPokemon = (pokeData) => {
    PokemonAPIServer.getByName(pokeData.name)
      .then(apiData => {
        this.savePokemon(apiData)
      })
      .catch(r => {
        alert('no no no.')
      })
  }

  get displayPokemon() {
    return this.state.pokemon.filter(poke => poke.name.toLowerCase().includes(this.state.term.toLowerCase()))
  }

  render() {
    return (
      <div>
        <PokemonForm handleNewPokemon={this.handleNewPokemon} />
        <br />
        <PokemonSort handleSort={this.handleSort} />
        <br />
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.onSearchChange} showNoResults={false} />
        <br />
        <PokemonCollection onCardClick={this.onCardClick} pokemon={this.displayPokemon} />
      </div>
    )
  }
}

export default PokemonIndex
