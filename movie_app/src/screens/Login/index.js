import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';
import {BaseUrlApi} from '../../helpers/API';
import LottieView from 'lottie-react-native';


export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const postLogin = async () => {
    if(username.length < 1){
      alert('Username tidak boleh kosong');
    }
    else if(password.length < 1 ){
      alert('Password tidak boleh kosong');
    } else {
      try {
        setLoading(true);
        const body = {
          username: username,
          password: password,
        };
  
        const res = await axios.post(`${BaseUrlApi}/auth/login`, body, {
          validateStatus: status => status < 501});
        console.log(res);
        if(res.status <= 201){
          navigation.navigate("Main")
        } else {
          alert("Username atau password Salah")
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    
  };

  if(loading){
    return(
      <View style={{ flex:1,backgroundColor:'#fff', justifyContent:'center', alignItems:'center' }}>
        <LottieView style={{ flex:1 }} source={require('../../helpers/loadingMovie.json')} autoPlay loop />
      </View>
    )
  }

  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#0000',
      }}>
      <ImageBackground
        source={require('../../img/backgroundLogin.jpg')}
        style={{flex: 1, resizeMode: 'contain', justifyContent: 'center'}}>
        <View style={{marginTop: -150}}>
          <Text
            style={{
              margin: 20,
              textAlign: 'center',
              fontSize: 50,
              fontWeight: 'bold',
              color: '#5D8BF4',
            }}>
            Sign In
          </Text>
          <View
            style={{
              margin: 10,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Input
              style={{height: 50, color: 'white'}}
              label="Username"
              placeholder=" "
              onChangeText={text => setUsername(text)}
            />
            <Input
              style={{height: 50, color: 'white'}}
              label="Password"
              placeholder=" "
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: 11,
                  marginTop: 5,
                  marginBottom: 25,
                }}>
                Forget Password?
              </Text>
            </TouchableOpacity>

            <Button onPress={postLogin} title={'Sign in'} />
            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'white'}}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

