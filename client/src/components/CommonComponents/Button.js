import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
	const { className, onClick, children } = props;
	return (
		<button onClick={onClick} className={className}>
			{children}
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string
};

export default Button;
