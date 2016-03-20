import React from 'react';

var Consumable = React.createClass({
  handleClick: function(){
    this.props.onSelected(this.props.consumable);
  },

  render() {
    return(
      <li>
        <div className="row" onClick={this.handleClick}>
          <div className="col-md-8">
            {this.props.consumable.name}
          </div>
          <div className="col-md-4">
            {this.props.consumable.amount}
          </div>
        </div>
      </li>
    )
  }
});

module.exports = Consumable;
