import {Image, ImageBackground} from 'react-native';
import styles from './styles'
import React  from 'react';

const CustomFundo = (props) => {
    const dados = props.dados;
    return(
        <ImageBackground source={require('./imagem.png')} style={styles.backgroundImage}>
            
            {props.children}
        
        </ImageBackground>
    )
}

export default CustomFundo;