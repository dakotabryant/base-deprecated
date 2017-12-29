import React from 'react';
import PropTypes from 'prop-types';

const ProfileSidebar = props => {
	const { className, profileImage, name } = props;
	return (
		<div className={className}>
			<img src={profileImage} alt="" />
			<p>{name}</p>
		</div>
	);
};

ProfileSidebar.propTypes = {};

export default ProfileSidebar;
