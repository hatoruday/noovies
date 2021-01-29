import React from 'react';
import styled from 'styled-components/native';
import PropTyles from 'prop-types'

const Container = styled.Text`
    color:rgb(230,230,230);
    margin-bottom:7px;
    font-size:10px;
    font-weight: 500;
`;

const Votes =  ({votes}) => (
    <Container>⭐{votes}/ 10</Container>
)

export default Votes;