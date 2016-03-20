import React from 'react';
import $ from 'jquery';

var NewConsumable = React.createClass({
  getInitialState: function(){
    return {
      name: null,
      amount: null
    }
  },

  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },

  handleAmountChange: function(e) {
    this.setState({amount: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: API_HOST + '/consumables',
      data: {
        name: this.state.name,
        amount: this.state.amount
      },
      success: function(){
        this.setState({name: null, amount: null});
        this.props.onNewConsumable();
      }.bind(this),
      contentType: 'application/json',
    });
  },

  render() {
    return(
      <div>
        <h3>New Consumable</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Coffee'
              value={this.state.name}
              onChange={this.handleNameChange} />
          </div>
          <div className='form-group'>
            <label>Mg Caffeine</label>
            <input
              type='text'
              className='form-control'
              placeholder='150'
              value={this.state.amount}
              onChange={this.handleAmountChange} />
          </div>
          <button type='submit' className='btn btn-default'>Add</button>
        </form>
      </div>
    );
  }
});

module.exports = NewConsumable;
