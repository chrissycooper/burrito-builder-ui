import React, { Component } from 'react';
import { postNewOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
  }

  handleNameChange = e => {
    e.preventDefault();
    this.setState({name: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      ...this.state,
    }
    if(this.state.name && this.state.ingredients.length){
      postNewOrder(newOrder)
      .then(data => {
        if(data) {
          this.props.addOrder(newOrder);
          this.clearInputs();
        }
      })
      .catch(err => alert(`Something went wrong, please try again later or call in your order. ${err}`))
    } else {
      alert("please choose at least one ingredient, and make sure you put in your name!")
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
          required
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
