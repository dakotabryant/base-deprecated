import React from 'react';

const Selector = props => {
  return (
    <div className="platform" onClick={(e) => props.onClick(props.title, e)}>
      <p>
        {props.title}
      </p>
      <img src={props.image} />
    </div>
  );
};

export default Selector;
