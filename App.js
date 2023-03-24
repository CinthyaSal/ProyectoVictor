import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Seguros from './screens/Seguros';
import Informacion from './screens/Informacion';


  function HomeScreen(){
    const navigation = useNavigation();
        const Seguro = () => {
        navigation.navigate('Seguros');
    }
    const Info = () => {
      navigation.navigate('Informacion');
  }
    return (
    
      <View style={styles.containerH}>
        <TouchableOpacity
        style={styles.buttonOp}
        onPress={Seguro}>
          <Text style={styles.buttonText}>Seguros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOp}
        onPress={Info}>
          <Text style={styles.buttonText}>Informacion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOp}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        
       </View>
       
    );
  }
  function LoginScreen() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!')
        const user = userCredential.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }

    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!')
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log(error)
      })
    }


    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
         <View style={styles.login}>
              <Image source={require("./assets/user.png")} style={styles.profilePicture} />
              <View>
                <TextInput 
                onChangeText={(text) => setEmail(text)} 
                style={styles.input} 
                placeholder="Ingresa Email" />
              </View>
              <View>
                <TextInput 
                onChangeText={(text) => setPassword(text)} 
                style={styles.input} 
                placeholder="Ingresa Contraseña"
                 secureTextEntry={true}/>
              </View>
              <TouchableOpacity 
              onPress={handleSignIn} 
              style={[styles.button,
               {backgroundColor: '#00CFEB90'}]}>
                <Text 
                style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} 
              style={[styles.button, {backgroundColor: '#6792F090'}]}>
                <Text 
                style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Registrarse</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();
  
  export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen  style={styles.stack} name="Seguros" component={Seguros} />
        <Stack.Screen name="Informacion" component={Informacion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abe4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonOp:{
    marginTop:100,
    backgroundColor:"#ffabab",
    borderRadius:10,
    
  },
  buttonText:{
    fontSize:30,
    color:"white",
  },
  stack:{
    marginTop:10,
  },
  containerH:{
    alignItems:'center',
    backgroundColor:"#ddffab",
    height:1000,
  }

});