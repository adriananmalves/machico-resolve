import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../../components/header';
import CustomFundo from '../../components/fundo';
import CustomFooter from '../../components/footer';
import Card from '../../components/card';


export default function Dashboard({navigation, route}) {

    const { userId } = route.params;
    
    const url = `http://10.0.0.124:8080/utilizadores/${userId}`;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

     

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => setData(json.utilizador))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, []);


    return(
        <CustomFundo>
            <CustomHeader>
                <Image source={require('../../../assets/resolve.png')} style={styles.image}></Image>   
            </CustomHeader>

            <Card style={{marginTop: 70, padding:20, marginLeft:40, marginRight:40}}>
                <Text style={{textAlign:'center', color: '#0883D8', fontSize: 20, fontWeight: 'bold', marginBottom:20}}> A minha conta </Text>
                <Card style={{backgroundColor: '#0883D8', alignItems:'flex-start'}}>
                    <Text style={styles.textTitle}>Olá {data.nome} !</Text>
                    <Text style={styles.text}>Bem-vindo à  aplicação  Machico-Resolve! Aqui  poderá reportar  todas as anomalias encontradas  no concelho  de Machico.  </Text>
                </Card>

                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-around', marginTop:20}}>

                <Image source={require('../../../assets/adicionar.png')}  />

                <Image style ={{marginLeft: 100}} source={require('../../../assets/visualizar.png')}  />

                </View>

                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop: -10}}>

                    <TouchableOpacity 
                        style = {styles.botao} 
                        onPress = { () => navigation.navigate('Ocorrencia', {userId})}
                    >

                        <Text style = {styles.botaoText}> Criar Ocorrência </Text>

                    </TouchableOpacity> 

                    <TouchableOpacity 
                        style = {styles.botao}
                        onPress={() => navigation.navigate('ListarOcorrenciasCriadas', {userId})}
                    >

                        <Text style = {styles.botaoText}> Ver as minhas Ocorrências </Text>

                    </TouchableOpacity> 

                </View>

                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-around', marginTop:20}}>

                    <Image  source={require('../../../assets/gestao.png')}  />

                    

                    <Image style ={{marginLeft: 100}} source={require('../../../assets/utilizador.png')}  />

                    

                </View>

                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop: -10}}>

                    <TouchableOpacity 
                        style = {styles.botao}
                        onPress={ () => navigation.navigate('ListarOcorrencias', {userId})}
                    >

                        <Text style = {styles.botaoText}> Ver ocorrências em execução </Text>

                    </TouchableOpacity> 

                    <TouchableOpacity 
                        style = {styles.botao}
                        onPress={ () => navigation.navigate('EditarPerfil', {userId, userNome: data.nome, userMorada: data.morada, userCC: data.cc, userTelemovel: data.telemovel})}
                    >

                        <Text style = {styles.botaoText}> Editar perfil </Text>

                    </TouchableOpacity> 

                </View>
            
            </Card>

            <CustomFooter>

            </CustomFooter>
        </CustomFundo>
    )


    

}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:50,
        marginLeft: 155,
    },
    
    textTitle:{
        color: 'white',
        fontSize:14,
        textAlign:'justify',
        padding:15

    },

    text:{
        textAlign: 'center',
        padding:5,
        color: 'white',
        fontSize: 12,
        marginTop: -15
    },

    botao:{
        width: 150,
        height: 42,
        backgroundColor: "#D0E6F8", 
        marginTop: 20,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        marginLeft: 1
        
        
        
      },

      botaoText:{
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0883D8'
      },
})