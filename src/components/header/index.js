import {View, Text, Image} from 'react-native';
import styles from './styles'
import React  from 'react';
import LinearGradient from 'react-native-linear-gradient';

const CustomHeader = (props) => {
    const dados = props.dados;
    return(
        <LinearGradient 
            colors={['#1A13F2', '#181AF0', '#171FEF', '#2747E6', '#1668DE', '#0883D8', '#0092D4', '#0093D4', '#0093D4']} 
            style={styles.linearGradient}
            start={{x: 0, y: 1}} 
            end={{x: 1, y: 1}}
        >
            
            {props.children}
        </LinearGradient>
    )
}

export default CustomHeader;