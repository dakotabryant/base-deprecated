import React from 'react';
import profile from '../../images/profile-placeholder.jpg';

export default function Icon () {
  return (
    <img className='profile-icon' src={profile} style={{ height: 50, marginLeft: 20, marginRight: 20 }} alt="icon"></img>
  );
}
