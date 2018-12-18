import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  renderCards() {
    return this.props.pokemon.map(p => <PokemonCard onCardClick={this.props.onCardClick} key={p.id} pokemon={p} />)
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderCards()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
