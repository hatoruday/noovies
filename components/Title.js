import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Text = styled.Text`
    font-size:15px;
    color:white;
    font-weight:bold;
    margin-left:30px;
`;

const Title = ({title}) => (
    <Text>{title}</Text>
)


Text.propTypes = {
    title:PropTypes.string.isRequired
}

export default Title;