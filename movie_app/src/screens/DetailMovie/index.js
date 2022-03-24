import { View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import React from 'react'
import axios from 'axios'
import { BaseUrl} from '../../helpers/API'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moderateScale } from 'react-native-size-matters'

export default function DetailMovie({route, navigation:{goBack}}) {
  const {movieId} = route.params;

  const [DetailMovie, setDetailMovie] = useState([]);
  const [Actor, setActor]= useState([]);
  

  useEffect(()=>{
      fetchDetail({movieId});
      
    },[]);

  const fetchDetail = async ({movieId}) =>{
      try {
        const results = await axios.get(`${BaseUrl}/movies/${movieId}`);
        console.log(results.data)    
        setDetailMovie(results.data);
        setActor(results.data.credits.cast);
      } catch (error) {
        console.log(error)
      }      
    }
    
  return (
    <View style={{ flex:1,}}>
        <Image 
          source={{uri: `${DetailMovie.backdrop_path}`}}
          style={{height: moderateScale(200)}}
          blurRadius={moderateScale(3)}
        />
        <TouchableOpacity 
          style={{ 
           
          width:moderateScale(35), 
          height: moderateScale(35),
          justifyContent:'center',
          alignContent:'center',
          position: 'absolute',
          left: moderateScale(10),
          top: moderateScale(10),
          borderRadius:35/2}}
          onPress={()=> goBack()}>
          <Ionicons color={'white'} name='arrow-back-sharp' size={moderateScale(30)}/>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={{ 
            
            width:moderateScale(35), 
            height: moderateScale(35),
            justifyContent:'center',
            position: 'absolute',
            right: moderateScale(10),
            top: moderateScale(10),
            borderRadius:35/2}}>
            <Ionicons color={'white'} name='share-social-sharp' size={moderateScale(30)}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ 
             
            width: moderateScale(35), 
            height: moderateScale(35),
            justifyContent:'center',
            alignContent:'center',
            position: 'absolute',
            right: moderateScale(60),
            top: moderateScale(10),
            borderRadius:35/2}}>
            
            <Ionicons color={'white'} name='heart-outline' size={moderateScale(32)}/>
        </TouchableOpacity>

        <View
          style={{
            marginBottom: moderateScale(10),
            marginTop: moderateScale(-60),
            flexDirection: 'row',
            alignItems: 'flex-start',
            borderColor: '#470D21',
            borderRadius: moderateScale(10),
            elevation: moderateScale(3),
            padding: moderateScale(10),
            backgroundColor: '#fff',
            marginHorizontal: moderateScale(10)
          }}>
          <Image
            source={{uri: `${DetailMovie.poster_path}`}}
            style={{height: moderateScale(100), width: moderateScale(100), borderRadius: moderateScale(5), }}
          />
          <View style={{marginHorizontal: moderateScale(10), flex: 1}}>
            <Text
              style={{
                fontSize: moderateScale(18),
                fontWeight: 'bold',
                alignSelf: 'flex-start',
              }}>
              {DetailMovie.title}
            </Text>
            <View style={{ marginTop: moderateScale(5), flexDirection:'row' }}>
              <Ionicons color={'#eeb64a'} name='star' size={moderateScale(15)}/>
              <Text style={{marginLeft:moderateScale(2), fontSize: moderateScale(12)}}>
                {DetailMovie.vote_average}/10
              </Text>
            </View>
            <Text
              style={{
                fontSize: moderateScale(12),
                marginVertical: moderateScale(5),
                textAlign: 'auto',
                
              }}>
              {DetailMovie.status} : {DetailMovie.release_date}
            </Text>       
          </View>
        </View>

        <View style={{ margin: moderateScale(10) }}>
          <Text style={{ fontSize: moderateScale(18), fontWeight: 'bold' }}>Genre</Text>
          <FlatList
            horizontal
            data={DetailMovie.genres}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <TouchableOpacity style={{ 
                marginRight: moderateScale(10),
                marginTop: moderateScale(10),
                backgroundColor: '#649DFF',
                padding: moderateScale(5),
                borderRadius: moderateScale(8)
               }}>
                <Text style={{ textAlign:'center', color:'#fff' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ margin: moderateScale(10) }}>
          <Text style={{ 
            fontSize: moderateScale(18), 
            fontWeight: 'bold',
            marginBottom: moderateScale(10), 
            }}>
              Synopsis
          </Text>
          <Text>{DetailMovie.overview}</Text>
        </View>

        <View style={{flex:1}}>
        <Text style={{marginHorizontal:moderateScale(10), fontSize: moderateScale(18), fontWeight: 'bold' }}>Actor/Artist</Text>
          <FlatList
              columnWrapperStyle={{justifyContent:'space-between'}}
              numColumns={3}
              data={Actor}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <TouchableOpacity 
                style={{ 
                  
                  height: moderateScale(130), 
                  width: moderateScale(120),
                  marginVertical:moderateScale(10),
                  overflow: 'hidden',
                  padding:moderateScale(10)
                   }}>
                  <Image 
                    source={{uri: `${item.profile_path}`}}
                    style={{
                      height: moderateScale(100), 
                      width: moderateScale(100), 
                      borderRadius: moderateScale(5)
                    }}
                  />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
        
        </View>
        
      </View>
  )
}