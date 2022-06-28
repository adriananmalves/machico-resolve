import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './src/pages/Login';
import Registar from './src/pages/Registar';
import Dashboard from './src/pages/Dashboard';
import Ocorrencia from './src/pages/Ocorrencia';
import ListarOcorrencias from './src/pages/ListarOcorrencias';
import VerOcorrencia from './src/pages/VerOcorrencia';
import ListarOcorrenciasCriadas from './src/pages/ListarOcorrenciasCriadas';
import VerOcorrenciasCriadas from './src/pages/VerOcorrenciasCriadas';
import EditarPerfil from './src/pages/EditarPerfil';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false }}>
          <Stack.Screen name = "Login" component={Login}/>
          <Stack.Screen name = "Registar" component={Registar}/>
          <Stack.Screen name = "Dashboard" component={Dashboard}/>
          <Stack.Screen name = "Ocorrencia" component={Ocorrencia}/>
          <Stack.Screen name = "ListarOcorrencias" component={ListarOcorrencias}/>
          <Stack.Screen name = "VerOcorrencia" component={VerOcorrencia}/>
          <Stack.Screen name = "ListarOcorrenciasCriadas" component={ListarOcorrenciasCriadas}/>
          <Stack.Screen name = "VerOcorrenciasCriadas" component={VerOcorrenciasCriadas}/>
          <Stack.Screen name = "EditarPerfil" component={EditarPerfil}/>

      </Stack.Navigator>
      </NavigationContainer>
    
  
  )
}


export default App;
