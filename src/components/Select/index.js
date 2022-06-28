import { styles } from 'ansi-colors';
import React, {useState} from 'react';
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from 'react-native';


const {width} = Dimensions.get('window');

const Select = ({options, onChangeSelect}) => {

    const {txt, setTxt} = useState(text);
    const {modelVisabel, setModalVisable} = useState(false);
    return
        <View>
            <TouchableOpacity style ={styles.container}>
                <Text style={styles.txt} numberOfLines={1}>
                    {txt}
                </Text>

            </TouchableOpacity>
        </View>
};

const styles = StyleSheet.create({
    container:{
        height: 50,
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingLeft: 40,
        marginHorizontal: 20,
        borderRadius: 8,
        fontSize: 18,
        borderColor: '#CCC',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text:{
        color: '#555',
        fontSize: 16
    }
})

export default Select;