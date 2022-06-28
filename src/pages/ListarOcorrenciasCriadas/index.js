import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, FlatList, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, SectionList, StatusBar} from 'react-native';
import CustomFundo from '../../components/fundo';
import CustomFooter from '../../components/footer';
import CustomHeader from '../../components/header';
import Card from '../../components/card';
import { ScrollView } from 'react-native-gesture-handler';




export default function ListarOcorrenciasCriadas({navigation, route}) {

    const { userId } = route.params;
  
    const url = `http://10.0.0.124:8080/ocorrenciascriadas/${userId}`;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => setData(json.ocorrenciasDetalhes))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, []);
    

    return(
      <CustomFundo>
            <CustomHeader>

              <TouchableOpacity onPress = { () => navigation.navigate('Dashboard', {userId})}>
              
                <Image
                    style = {{height:42, width:42, marginRight:115, marginLeft:5}}
                    source={require('../../../assets/up-arrow.png')}  
                />
            </TouchableOpacity>
                  
              <Image source={require('../../../assets/resolve.png')} style={styles.image}></Image>
      
            </CustomHeader>

            <Card style={{ padding:15, marginTop:70, marginBottom:190}}>
                <Text style={styles.title}>MINHAS OCORRÊNCIAS</Text>

                <View style={{marginBottom:50}}>
                {isLoading ?  <ActivityIndicator/> 
                    : (
                        <FlatList
                        data={data}
                        keyExtractor =  {({id}, index) => id}
                        renderItem = {({item}) => (
                          <TouchableOpacity 
                            style = {styles.box} 
                            // onPress = { () =>{ navigation.navigate('VerOcorrencia'), itemParam:{2}}}
                            onPress={() => {
                              /* 1. Navigate to the Details route with params */
                              navigation.navigate('VerOcorrenciasCriadas', {
                                itemId: item.id,
                                estadoId: item.estadoId,
                                userId,
                              });
                              
                            }}
                            value = {item.id} >
                            <Text>
                              {item.descricao}
                            </Text>
                            <Text>
                              {item.localizacao}
                            </Text>

                          </TouchableOpacity>
                        )}
                        /> 
                )}
                </View>
               
            </Card>

            
          
             
             
           
      

            <CustomFooter/>           
        </CustomFundo>
     
    )

}

const styles = StyleSheet.create({
    image:{
      width:100,
      height:50,
    },

    container: {
      marginBottom: 5, 
      marginTop: 10, 
      alignItems: 'flex-end',
      padding: 5,
      alignContent: 'space-between',
      justifyContent: 'flex-end'
     
    },

    box:{
      width: 250,
      height: 42,
      backgroundColor: '#3692E2', 
      marginTop: 10,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.23,
      borderRadius: 30,
      
     
    },

    input:{
      marginTop: 10,
      padding: 5,
      width: 300,
      backgroundColor: '#3692E2',
      fontSize: 16,
      fontWeight:'bold',
      borderRadius: 30,
      width: 250,
      height: 40,
      shadowColor: 'white',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      opacity: 0.23

      
    },

    botao:{
      width: 150,
      height: 42,
      backgroundColor: "#0883D8", 
      marginTop: 20,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      
  },

  botaoText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },

  title:{
    color: '#3D94E1',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 10,
    marginTop:5

},

box:{
    width: 250,
    height: 82,
    backgroundColor: '#3692E2', 
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.23,
    borderRadius: 10,
    
   
  },

 
});