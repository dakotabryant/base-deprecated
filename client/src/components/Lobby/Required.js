import React, { Component } from 'react';

const Required = props => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: 10, marginRight: 10 }}>
      <div>{props.name}</div>
      <div>{props.title}</div>
    </div>
  );
}

export default Required;