import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../../components/header';
import CustomFundo from '../../components/fundo';
import CustomFooter from '../../components/footer';
import Card from '../../components/card';

export default function Registar({navigation}) {
    
    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState('');

    
    const [cc, setCC] = useState('');
    const [ccError, setCCError] = useState('');

    
    const [morada, setMorada] = useState('');
    const [moradaError, setMoradaError] = useState('');

    
    const [telemovel, setTelemovel] = useState('');
    const [telemovelError, setTelemovelError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
  
    const [message, setMessage] = useState('');


    
    const registar = async() =>{
        if(nome != "" && cc != "" && morada != "" && telemovel != "" && email != "" && password != ""){
        //alert('Thank you for sign in');
            await fetch('http://10.0.0.124:8080/utilizadores', {
                method: 'POST',
                headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'nome': nome,
                    'cc': cc,
                    'morada': morada,
                    'telemovel': telemovel,
                    'email': email,
                    'password': password,
                    'papelId': 2
                })
            }).then(res => res.json())
            .then(resData => {
                alert(resData.message);
                setMessage(resData.message);
                if(resData.message == "Utilizador criado com sucesso"){
                    navigation.navigate('Login', {userId: resData.id})
                    
                  }
            })
        }
    }


    return(
        <>

        
        <CustomFundo>
        

        <CustomHeader>
            <TouchableOpacity onPress = { () => navigation.navigate('Login')}>
              
                <Image
                    style = {{height:42, width:42, marginRight:90, marginLeft:5}}
                    source={require('../../../assets/up-arrow.png')}  
                />
            </TouchableOpacity>
            <Image source={require('../../../assets/resolve.png')} style={styles.image}></Image>
        </CustomHeader>
        
        {/* <View style={styles.container}> */}
        <Card style={{marginTop:70}}> 

            <Text style={styles.title}> REGISTAR </Text>
            <TextInput
                style = {styles.input}
                placeholder = "Nome"
                value = {nome}
                onChangeText = {(nome) => setNome(nome)}
                onChange = {() => setNomeError('')}
           
            />
            <TextInput
                style = {styles.input}
                placeholder = "Número do cartão de cidadão"
                value = {cc}
                onChangeText = {(cc) => setCC(cc)}
                onChange = {() => setCCError('')}
                
            />

            <TextInput
                style = {styles.input}
                placeholder = "Morada"
                value = {morada}
                onChangeText = {(morada) => setMorada(morada)}
                onChange = {() => setMoradaError('')}
                
            />

            <TextInput
                style = {styles.input}
                placeholder = "Telemóvel"
                value = {telemovel}
                onChangeText = {(telemovel) => setTelemovel(telemovel)}
                onChange = {() => setTelemovelError('')}
             
            />

            <Card style={{backgroundColor: '#D0E6F8', opacity:0.8, padding:10,marginTop:20}}>
                
            <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center'}}>
            
                <Image  style={{marginLeft: 0}} source={require('../../../assets/user.png')}  />
            
                <TextInput
                
                    style = {[styles.input, {marginTop:0}]}
                    placeholder = "Email"
                    value = {email}
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
            </Card>

            </Card>

            <View style= {styles.container}>

            
                    

            <TouchableOpacity
                style = {styles.botao}
                onPress = {registar}
            >

                <Text style = {styles.botaoText}> Registar </Text>

            </TouchableOpacity>
        
            </View>

           

        {/* </View> */}
        

            <CustomFooter>
                
            </CustomFooter>
        
        </CustomFundo>
        </>
        

    );
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 5, 
      marginTop: 10, 
      alignItems: 'flex-end',
      flexDirection: 'row',
      padding: 5,
      alignContent: 'space-between',
      justifyContent: 'flex-end'
     
    

      //backgroundColor: '#0080FF'
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
      image:{
        width:100,
        height:50,
 
    },
    title:{
        color: '#3D94E1',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
        marginTop:5

    }
})