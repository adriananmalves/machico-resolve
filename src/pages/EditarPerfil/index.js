import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ImageBackground, Input } from 'react-native';
import CustomHeader from '../../components/header';
import CustomFundo from '../../components/fundo';
import CustomFooter from '../../components/footer';
import Card from '../../components/card';


export default function EditarPerfil({navigation, route}) {


  const { userId, userNome, userCC, userTelemovel, userMorada } = route.params; 
  console.log(userId);

  const url = `http://10.0.0.124:8080/utilizadores/${userId}`;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    const [nome, setNome] = useState(userNome);
    const [nomeError, setNomeError] = useState('');


    const [cc, setCC] = useState(userCC.toString());
    const [ccError, setCCError] = useState('');

    const [morada, setMorada] = useState(userMorada);
    const [moradaError, setMoradaError] = useState('');

    
    const [telemovel, setTelemovel] = useState(userTelemovel.toString());
    const [telemovelError, setTelemovelError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [message, setMessage] = useState('');


   
     

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => setData(json.utilizador))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, []);

  
    const atualizar = async() =>{
      if(nome != "" && cc != "" && morada != "" && telemovel != "" ){
      //alert('Thank you for sign in');
          await fetch(url, {
              method: 'PUT',
              headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
              },
              body: JSON.stringify({
                  'nome': nome,
                  'cc': cc,
                  'morada': morada,
                  'telemovel': telemovel,
                  
              })
          }).then(res => res.json())
          .then(resData => {
              alert(resData.message);
              setMessage(resData.message);
              if(resData.message == "Utilizador was updated successfully."){
                  navigation.navigate('Dashboard', {userId})
                  
                }
          }) 
      }
  }
    


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
            <Card style={{marginTop: 70, padding:20, marginBottom:190}}>
                <Text style={styles.title}>EDITAR PERFIL</Text>
                <View style={{flexDirection: 'column'}}>

                  <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Nome:</Text>

                    <TextInput
                      style = {styles.input}
                      value = {nome}
                      onChangeText = {(nome) => setNome(nome)}
                      onChange = {() => setNomeError('')}
                
                      />

                  <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Morada:</Text>

                    <TextInput
                      style = {styles.input}
                      value = {morada}
                      onChangeText = {(morada) => setMorada(morada)}
                      onChange = {() => setMoradaError('')}
                
                      />
                    
                  
                  <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>CC:</Text>

                    <TextInput
                      style = {styles.input}
                      value = {cc}
                      onChangeText = {(cc) => setCC(cc)}
                      onChange = {() => setCCError('')}

                    />

                  <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Telemóvel:</Text>

                  <TextInput
                    style = {styles.input}
                    value = {telemovel}
                    onChangeText = {(telemovel) => setTelemovel(telemovel)}
                    onChange = {() => setTelemovelError('')}

                  />
                   

               {/*  <Card style={{backgroundColor: '#D0E6F8', opacity:0.8, padding:10,marginTop:20}}>
                
                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center'}}>
                
                    <Image  style={{marginLeft: 0}} source={require('../../../assets/user.png')}  />
                
                    <TextInput
                    
                        style = {[styles.input, {marginTop:0}]}
                        placeholder = "Email"
                        value = {data.email}
                        onChangeText = {(email) => setEmail(email)}
                        onChange = {() => setEmailError('')}
                
                    />
                </View>
    
                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop:10}}>
                
                <Image  source={require('../../../assets/padlock.png')}  />
                
                <TextInput
                    style = {[styles.input, {marginTop:0}]}
                    secureTextEntry = {true}
                    placeholder = "Password"
                    value = {password}
                    onChangeText = {(password) => setPassword(password)}
                    onChange = {() => setPasswordError('')}
                    
                />
    
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop:10}}>
                
                <Image  source={require('../../../assets/padlock.png')}  />
                
                <TextInput
                    style = {[styles.input, {marginTop:0}]}
                    secureTextEntry = {true}
                    placeholder = "Confirmar Password"
                    value = {password}
                    onChangeText = {(password) => setPassword(password)}
                    onChange = {() => setPasswordError('')}
                    
                />
                </View>
                </Card> */}

            <TouchableOpacity
                style = {styles.botao}
                onPress = {atualizar}
            >

                <Text style = {styles.botaoText}> Atualizar </Text>

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
    },

    container: {
      marginBottom: 5, 
      marginTop: 10, 
      alignItems: 'flex-end',
      flexDirection: 'row',
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
    marginTop: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.23,
    borderRadius: 10,
    
   
  },

 
});