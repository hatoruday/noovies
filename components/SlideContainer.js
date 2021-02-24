import React from 'react'
import Swiper from 'react-native-web-swiper'
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';

const {width:WIDTH, height: HEIGHT} = Dimensions.get('window');

const Container = styled.View`
width: 100%;
height:${HEIGHT / 4}px;
margin-bottom:50px;
`;


const SlideContainer = ({children}) => (
    <Container>
        <Swiper controlsEnabled= {false} loop timeout= {3}>
            {children}
        </Swiper>
    </Container>
)

SlideContainer.propTypes = {
    children:PropTypes.node.isRequired
}

export default SlideContainer;