import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{overflowY: 'scroll', "borderTop":'3px solid white', height: '500px'}}>
      {props.children}
    </div>
  );
};


export default Scroll;
