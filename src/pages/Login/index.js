import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../../components/header';
import CustomFundo from '../../components/fundo';
import CustomFooter from '../../components/footer';
import Card from '../../components/card';



export default function Login({navigation}) {

  


  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [message, setMessage] = useState('');

  const[id, setId] = useState('');


  
  const signin = async() =>{
    if(email != "" && password != ""){
      //alert('Thank you for sign in');
      await fetch('http://10.0.0.124:8080/auth', {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      }).then(res => res.json())
      .then(resData => {
        alert(resData.message);
        setMessage(resData.message);
        setId(resData.id);
        if(resData.message == "Login efetuado com sucesso"){
          navigation.navigate('Dashboard', {userId: resData.id})
          
        }
        
       
      })
    }


    if(email!=""){
      //alert(email);
      setEmailError('');
    }else{
      setEmailError('Hey! Email should not be empty');
    }

    if(password!=""){
      //alert(password);
      setPasswordError('');
    }else{
      setPasswordError('Your password should not be empty');
    }

    
  }

    
  
    return(
      <>
       <CustomHeader>
       
   
       </CustomHeader>
      
      
    
      <View style={styles.container}>
     
      
      
        <Card style={{marginTop:-70}}>
        <Image style={{width:300, height:150, marginBottom: 30}} source={require('../../../assets/resolve.png')}/>
        
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center'}}>
            
        <Image  source={require('../../../assets/user.png')}  />
        <TextInput
          style = {styles.input}
          placeholder = "Digite o seu email"
          value = {email}
          onChangeText = {(email) => setEmail(email)}
          onChange = {() => setEmailError('')}
        />

        </View>

        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop:10}}>
            
            <Image  source={require('../../../assets/padlock.png')}  />
            

          <TextInput
            style = {styles.input}
            secureTextEntry = {true}
            placeholder = "Digite a sua senha"
            value = {password}
            onChangeText = {(password) => setPassword(password)}
            onChange = {() => setPasswordError('')}
            />

        </View>

        </Card>

          <TouchableOpacity
            style = {styles.botao}
            onPress = {signin}
          >

            <Text style = {styles.botaoText}> Login </Text>

          </TouchableOpacity>

          <View style={{ justifyContent: 'center', alignItems: 'center', alignContent:'center', marginTop:50}}>

          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16, marginTop:5}}>Não tem conta? </Text>
          <Text style={styles.texto}>Se ainda não tem uma conta de utilizador, utilize esta opção para aceder ao formulário de registo.</Text>
          
          </View>

          <TouchableOpacity
            style = {styles.botao}
            onPress = { () => navigation.navigate('Registar')}
          >

            <Text style = {styles.botaoText}> Criar conta </Text>

          </TouchableOpacity>
          

        
          </View>

      
      <CustomFooter>

      </CustomFooter>
      

      </>
    )

  
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
     
    //backgroundColor: 'white',

  },

  logo:{
    width: 150,
    height: 150,
    borderRadius: 100
  },

  input:{
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
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

  texto:{
    color: '#707070',
    padding: 5,
    fontSize: 10,
    textAlign: 'center'
  }

  
})