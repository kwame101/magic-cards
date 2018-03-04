import React from 'react';
import PropTypes from 'prop-types';

/**
 * InlineErrors child component used to display error an inline error message on form submit
 * @param {error message to be displayed} param0 
 */
const InlineErrors = ({ text }) =>(
     <span style={{ width:180, textAlign:'center', lineHeight:3, fontSize:12, color: "#9f3a38"}}> {text}</span>
);

InlineErrors.propTypes = {
    text : PropTypes.string.isRequired
};

export default InlineErrors;