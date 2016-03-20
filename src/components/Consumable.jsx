import React from 'react';

var Consumable = React.createClass({
  handleClick: function(){
    this.props.onSelected(this.props.consumable);
  },

  render() {
    return(
      <li className='list-group-item'>
        <div className="row">
          <div className="col-xs-4">
            {this.props.consumable.name}
          </div>
          <div className="col-xs-3">
            {this.props.consumable.amount}
          </div>
          <div className='col-xs-5 text-right'>
            <a href='javascript:void(0)' onClick={this.handleClick} className='btn btn-primary'>
              +
            </a>
          </div>
        </div>
      </li>
    )
  }
});

module.exports = Consumable;
