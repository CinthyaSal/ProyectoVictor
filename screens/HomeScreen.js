import React, { Component } from "react";
import {View,Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';



export default class  HomeScreen extends Component {
    render(){
        const navigation = useNavigation();
        const ir = () => {
        navigation.navigate('Seguros');
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
        <TouchableOpacity
        onPress={ir}>
          <Text>Seguros</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={ir}>
          <Text>Informacion</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Perfil</Text>
        </TouchableOpacity>
       </View>
      </View>
    );
    }
    
    }

    