import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  render() {
    const hp = this.props.pokemon.stats.find(s => s.name === "hp").value
    const { sprites: { front, back }, weight, name, flipped } = this.props.pokemon
    let width = (weight / 2400) * 200
  
    return (
      <Card>
        <div onClick={() => this.props.onCardClick(this.props.pokemon)}>
          <div className="image">
            <img style={{width: width, height: width}} alt={name} src={flipped ? back : front} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
