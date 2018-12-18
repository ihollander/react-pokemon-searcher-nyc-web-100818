import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class PokemonSort extends React.Component {
  options = [
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

  render() {
    return (
      <div>
        <label htmlFor="sort">Sort By:</label>
        <Dropdown name="sort" onChange={this.props.handleSort} options={this.options} />
      </div>
    )
  }
}