import { View, Text, TouchableOpacity, FlatList,Image} from 'react-native'
import React from 'react'
import axios from 'axios'
import { BaseUrl} from '../../helpers/API'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moderateScale } from 'react-native-size-matters'

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
          style={{height: moderateScale(160), width: moderateScale(110), borderRadius: moderateScale(5), marginRight:moderateScale(7)}}
        />
      </TouchableOpacity>
    )
  }

  const CardMovie = ({item}) => {
    return (
      <View 
        style={{
          marginBottom: moderateScale(10),
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderColor: '#470D21',
          borderRadius: moderateScale(10),
          elevation: moderateScale(3),
          padding: moderateScale(10),
          backgroundColor: '#fff'
        }}>
        <Image
          source={{uri: `${item.poster_path}`}}
          style={{height: moderateScale(100), width: moderateScale(100), borderRadius: moderateScale(5)}}
        />
        <View style={{marginHorizontal: moderateScale(10), flex: 1}}>
          <Text
            style={{
              fontSize: moderateScale(18),
              fontWeight: 'bold',
              alignSelf: 'flex-start',
            }}>
            {item.title}
          </Text>
          <View style={{ marginTop: moderateScale(5), flexDirection:'row' }}>
              <Ionicons color={'#eeb64a'} name='star' size={moderateScale(15)}/>
              <Text style={{marginLeft:moderateScale(2), fontSize: moderateScale(12)}}>
                {item.vote_average}/10
              </Text>
            </View>
          <Text
            style={{
              fontSize: moderateScale(12),
              marginTop: moderateScale(5),
              textAlign: 'auto',    
            }}>
            Realeased : {item.release_date}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailMovie',{movieId : item.id})}
            style={{
              fontSize: moderateScale(12),
              marginTop: moderateScale(5),
              alignContent: 'center',
              justifyContent: 'center',
              width: moderateScale(80),
              height: moderateScale(30),
              borderRadius: moderateScale(5),
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
      <View style={{margin: moderateScale(10)}}>
        <Text style={{fontSize: moderateScale(18), fontWeight:'bold', color: '#4C0027'}}>
          Recommended
        </Text>
      </View>
      <View style={{ marginHorizontal: moderateScale(10), marginBottom:moderateScale(10) }}>
        <FlatList
          horizontal
          data={listMovie}
          keyExtractor={(item, index) => index}
          renderItem={PosterMovie}
        />
      </View>
      <View style={{margin: moderateScale(10)}}>
        <Text style={{fontSize: moderateScale(18), fontWeight:'bold', color: '#4C0027'}}>
          Latest Upload
        </Text>
      </View>
      <View style={{ marginHorizontal: moderateScale(10) }}>
        <FlatList
          data={listMovie}
          keyExtractor={(item, index) => index}
          renderItem={CardMovie}
        />
      </View>
      
    </View>
  )
}