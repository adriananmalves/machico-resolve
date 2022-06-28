import {View, Text, Image} from 'react-native';
import styles from './styles'
import React  from 'react';


const Card = (props) => {
    
    return(
        <View style={[styles.card, props.style]}>
            { props.children }
        </View>
       
    )
}

export default Card;