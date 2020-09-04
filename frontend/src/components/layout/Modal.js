import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className='ui active dimmer'>
      <div onClick={e => e.stopPropagation()} className='ui active modal'>
        <div className='header' style={{backgroundColor: 'rgb(252, 124, 124)', color: 'rgb(253, 244, 222)'}}>{props.title}</div>
        <div className='content' style={{backgroundColor: 'rgb(252, 124, 124)', color: 'rgb(253, 244, 222)'}}>{props.content}</div>
        <div className='actions' style={{backgroundColor: 'rgb(252, 124, 124)'}}>{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;