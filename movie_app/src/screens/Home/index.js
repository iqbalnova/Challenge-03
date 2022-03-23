import { View, Text, TouchableOpacity, FlatList,Image } from 'react-native'
import React from 'react'
import axios from 'axios'
import { BaseUrl} from '../../helpers/API'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Home({navigation}) {

  const [listMovie, setListMovie] = useState([]);

  useEffect(()=>{
    getListMovie();
  },[]);

  const getListMovie = async () => {
    try {
      const results = await axios.get(`${BaseUrl}/movies`);
      console.log(results)
      setListMovie(results.data.results);
    } catch (error) {
      console.log(error)
    }
  };

  const PosterMovie = ({item}) => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate('DetailMovie',{movieId : item.id})}>
        <Image 
          source={{uri: `${item.poster_path}`}}
          style={{height: 160, width: 110, borderRadius: 5, marginRight:7}}
        />
      </TouchableOpacity>
    )
  }

  const CardMovie = ({item}) => {
    return (
      <View 
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderColor: '#470D21',
          borderRadius: 10,
          elevation: 3,
          padding: 10,
          backgroundColor: '#fff'
        }}>
        <Image
          source={{uri: `${item.poster_path}`}}
          style={{height: 100, width: 100, borderRadius: 5}}
        />
        <View style={{marginHorizontal: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
            }}>
            {item.title}
          </Text>
          <View style={{ marginTop: 5, flexDirection:'row' }}>
              <Ionicons color={'#eeb64a'} name='star' size={15}/>
              <Text style={{marginLeft:2, fontSize: 12}}>
                {item.vote_average}/10
              </Text>
            </View>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              textAlign: 'auto',    
            }}>
            Realeased : {item.release_date}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailMovie',{movieId : item.id})}
            style={{
              fontSize: 12,
              marginTop: 5,
              alignContent: 'center',
              justifyContent: 'center',
              width: 80,
              height: 30,
              borderRadius: 5,
              backgroundColor: '#649DFF'
            }}
          >
            <Text style={{textAlign: 'center', color: '#fff' }}>Read More</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{margin: 10}}>
        <Text style={{fontSize: 18, fontWeight:'bold', color: '#4C0027'}}>
          Recommended
        </Text>
      </View>
      <View style={{ marginHorizontal: 10, marginBottom:10 }}>
        <FlatList
          horizontal
          data={listMovie}
          keyExtractor={(item, index) => index}
          renderItem={PosterMovie}
        />
      </View>
      <View style={{margin: 10}}>
        <Text style={{fontSize: 18, fontWeight:'bold', color: '#4C0027'}}>
          Latest Upload
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <FlatList
          data={listMovie}
          keyExtractor={(item, index) => index}
          renderItem={CardMovie}
        />
      </View>
      
    </View>
  )
}