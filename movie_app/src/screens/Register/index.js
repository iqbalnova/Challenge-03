import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';
import {BaseUrlApi} from '../../helpers/API';
import LottieView from 'lottie-react-native';
import { moderateScale } from 'react-native-size-matters';


export default function Register({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);

  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () =>{
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
      
    }, 2000);
  }

  const postRegister = async () => {
    // Cek inputan kosong
    if(email.length < 1 ){
      alert('Email tidak boleh kosong');
    } 
    else if(username.length < 1){
      alert('Username tidak boleh kosong');
    }
    else if(password.length < 1 ){
      alert('Password tidak boleh kosong');
    } 
    else if(firstname.length < 1){
      alert('Firstname tidak boleh kosong');
    }
    else if(lastname.length < 1 ){
      alert('Lastname tidak boleh kosong');
    } 
    else if(city.length < 1 ){
      alert('City tidak boleh kosong');
    }
    else if(phone.length < 1 ){
      alert('Number Phone tidak boleh kosong');
    } 
    else {
      // jika tidak ada yang kosong maka lanjut cek regex
      if(!email.match(regexEmail)){
        alert('Email tidak valid')
      }
      else if (!password.match(regexPassword)){
        alert('Password tidak valid')
      } 
      else{
        // kalau inputan aman lanjut fetch
        try {
          setLoading(true);
          const body = {
            email: email,
            username: username,
            password: password,
            name:{
                firstname: firstname,
                lastname: lastname
            },
            address:{
                city: city,
                street: "street",
                number: "number",
                zipcode: "zipcode",
                geolocation:{
                    lat: "lat",
                    long: "long"
                }
            },
            phone: phone
          };
          const res = await axios.post(`${BaseUrlApi}/users`, body, {
            validateStatus: status => status < 501});
          console.log(res);
        
          if(res.status <= 201){
            navigation.navigate("Login")
          } else {
            return alert("Error: Tidak bisa register")
          }
        } catch (error) {
          console.log(error);
        } finally{
          setLoading(false);
        }
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
    <ScrollView 
    refreshControl={
      <RefreshControl 
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    style={styles.containner}>
      <Text style={styles.topic}>Registration</Text>
      <Input
        style={{color: 'white'}}
        label="Email"
        placeholder=" "
        onChangeText={text => setEmail(text)}
      />
      <Input
        style={{color: 'white'}}
        label="Username"
        placeholder=" "
        onChangeText={text => setUsername(text)}
      />
      <Input
        style={{color: 'white'}}
        label="Password"
        placeholder=" "
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Input
        style={{color: 'white'}}
        label="First Name"
        placeholder=" "
        onChangeText={text => setFirstname(text)}
      />
      <Input
        style={{color: 'white'}}
        label="Last Name"
        placeholder=" "
        onChangeText={text => setLastname(text)}
      />
      <Input
        style={{color: 'white'}}
        label="City"
        placeholder=" "
        onChangeText={text => setCity(text)}
      />
      
      <Input
        style={{color: 'white'}}
        label="Number Phone"
        placeholder=" "
        keyboardType="phone-pad"
        onChangeText={text => setPhone(text)}
      />
      <View
        style={{
          width: '100%',
          height: moderateScale(50),
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: moderateScale(20),
          marginBottom: moderateScale(50),
        }}>
        <Button onPress={postRegister} title={'Sign Up'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#16514e',
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  },
  topic: {
    fontSize: 24,
    color: '#FFF',
    paddingTop: moderateScale(20),
    marginBottom: moderateScale(30),
    borderBottomColor: '#EEF2FF',
    borderBottomWidth: moderateScale(1),
  },
});