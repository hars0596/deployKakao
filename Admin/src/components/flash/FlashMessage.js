import React ,{Component}from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class FlashMessage extends Component {

   onClick =()=>{
     this.props.deleteFlashMessage(this.props.message.id);
   }
  render() {
    const {type, text } = this.props.message;
    return (
      <div style={{color: "red"}} className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
   deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;
