import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, FlatList, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, SectionList, StatusBar} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import CustomFundo from '../../components/fundo';
import CustomFooter from '../../components/footer';
import CustomHeader from '../../components/header';
import Card from '../../components/card';



const url = 'http://10.0.0.124:8080/categoria';

export default function Ocorrencias({navigation, route}) {

  const { userId } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [descricao, setDescricao] = useState('');
  const [descricaoError, setDescricaoError] = useState('');

  const [localizacao, setLocalizacao] = useState('');
  const [localizacaoError, setLocalizacaoError] = useState('');


  const [message, setMessage] = useState('');
    


  const[categoriaSelecionada, setCategoriaSelecionada] = useState([]);

  const[image, setImage] = useState([])

  const formData = new FormData()


  console.log(image)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.categoria))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const criarOcorrencia = async() =>{
    if(descricao != "" && localizacao != "" &&  categoriaSelecionada != ""){
    //alert('Thank you for sign in');
        await fetch('http://10.0.0.124:8080/criarocorrencias', {
            method: 'POST',
            headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'descricao': descricao,
                'localizacao': localizacao,
                'utilizadorId': userId,
                'categoriumId': categoriaSelecionada,
                'estadoId': 1
            })
        }).then(res => res.json())
        .then(resData => {
            alert(resData.message);
            setMessage(resData.message);
            if(resData.message == 'Ocorrência criada com sucesso'){
              console.log(formData)
               for (i=0; i< image.length; i++){
                 fetch('http://10.0.0.124:8080/criarfotos', {
                  method: 'POST',
                  headers:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
                  },
                  body: JSON.stringify({
                      'nome': image[i].uri,
                      'ocorrenciumId': resData.id,
                      
            })
          })
         }
              navigation.navigate('VerOcorrencia', {itemId: resData.id, userId})
            }
        })
    }
}

const openGallery = async() => {

  const images = await ImagePicker.openPicker({ multiple: true,
   waitAnimationEnd: false,
   setOrder: 'desc',
   includeExif: true,
   forceJpg: true,});
   console.log(images.length)
 

    
   
   for (i=0; i< images.length; i++){
     formData.append('image', { uri: images[i].path, 
       type: images[i].mime, 
       name: images[i].path});

     /*   setImages({
         uri: images[i].path,
         width: images[i].width,
         height: images[i].height,
         type: images[i].type,

     })

     console.log(image) */

  } 

  let res = await fetch(
    'http://10.0.0.124:8080/profile-upload-multiple',
    {
        method: 'post',
        body: formData,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'multipart/form-data'
        },
    }

);

let responseJson = await res.json();
console.log(responseJson, "responseJson")  

  console.log(formData)

   setImage(
    images.map((i) => {
      //console.log('received image', i);
      return{
        uri: i.path,
        width: i.width,
        height: i.height,
        type: i.mime,
      };
    })
  )

 
  }


  return (

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

      <Card style={{marginTop: 70, padding:20}}>
        
        <Text style={styles.title}>CRIAR OCORRÊNCIA</Text>
        <View style={{flexDirection: 'column'}}>

          <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Descrição:</Text>
            <TextInput
                 style = {styles.input}
                 placeholder = "Descreva aqui a sua ocorrência"
                 value = {descricao}
                 onChangeText = {(descricao) => setDescricao(descricao)}
                 onChange = {() => setDescricaoError('')}
            />
          <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Localização:</Text>
            <TextInput
                 style = {styles.input}
                 placeholder = "Localização"
                 value = {localizacao}
                 onChangeText = {(localizacao) => setLocalizacao(localizacao)}
                 onChange = {() => setLocalizacaoError('')}
            />

        
        <Text style={{marginBottom: -10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Categoria:</Text>

        <View style={styles.box}>

         
      
          <Picker 
              selectedValue = {categoriaSelecionada}
              style = {{height: 100, width: 200, color:'black'}}
              dropdownIconColor = 'black'
              onValueChange = {(itemValue) =>
                setCategoriaSelecionada(itemValue)
              }>
                {
                  data.map(cr => {
                    return <Picker.Item label={cr.nome} value={cr.id} key={cr.id} />
                  })
                }

          </Picker>

        </View>

        
        <Card style={{backgroundColor: '#D0E6F8', opacity:0.8, padding:10,marginTop:20, alignContent:'flex-start', alignItems:'flex-start'}}>
        <Text style={{marginBottom: 10, marginTop:10, color:'#3692E2', fontWeight:'bold'}}>Fotos:</Text>



          <TouchableOpacity  onPress={openGallery}>
          <Image
                style = {{height:55, width:55, marginRight:115, marginLeft:5}}
                source={require('../../../assets/cam_upload.png')}  
            />
          </TouchableOpacity>
          
          <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop:10}}>
          

          <Image
                style = {{height:45, width:45, marginLeft:5, marginTop:10}}
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/8/85/Machico_-_Portugal_%282845660842%29.jpg'}}  
          />

            <Image
                style = {{height:45, width:45, marginLeft:5, marginTop:10}}
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/8/85/Machico_-_Portugal_%282845660842%29.jpg'}}  
            />
            

          </View>

          

        </Card>

        
        </View>

       
          

          
        </Card>

        <View style= {styles.container}>

           
       

          <TouchableOpacity
                style = {styles.botao}
                onPress = {criarOcorrencia}
            >

                <Text style = {styles.botaoText}> Criar ocorrência </Text>

            </TouchableOpacity>

           
        </View>
    
    <CustomFooter>
      
    </CustomFooter>

    </CustomFundo>
  );
};
  






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
      marginBottom: 10,
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
      marginTop: 3,
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

 
});