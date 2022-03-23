import { View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import React from 'react'
import axios from 'axios'
import { BaseUrl} from '../../helpers/API'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
          style={{height: 200}}
          blurRadius={3}
        />
        <TouchableOpacity 
          style={{ 
           
          width:35, 
          height: 35,
          justifyContent:'center',
          alignContent:'center',
          position: 'absolute',
          left: 10,
          top: 10,
          borderRadius:35/2}}
          onPress={()=> goBack()}>
          <Ionicons color={'white'} name='arrow-back-sharp' size={30}/>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={{ 
            
            width:35, 
            height: 35,
            justifyContent:'center',
            position: 'absolute',
            right: 10,
            top: 10,
            borderRadius:35/2}}>
            <Ionicons color={'white'} name='share-social-sharp' size={30}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ 
             
            width:35, 
            height: 35,
            justifyContent:'center',
            alignContent:'center',
            position: 'absolute',
            right: 60,
            top: 10,
            borderRadius:35/2}}>
            
            <Ionicons color={'white'} name='heart-outline' size={32}/>
        </TouchableOpacity>

        <View
          style={{
            marginBottom: 10,
            marginTop: -60,
            flexDirection: 'row',
            alignItems: 'flex-start',
            borderColor: '#470D21',
            borderRadius: 10,
            elevation: 3,
            padding: 10,
            backgroundColor: '#fff',
            marginHorizontal: 10
          }}>
          <Image
            source={{uri: `${DetailMovie.poster_path}`}}
            style={{height: 100, width: 100, borderRadius: 5, }}
          />
          <View style={{marginHorizontal: 10, flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
              }}>
              {DetailMovie.title}
            </Text>
            <View style={{ marginTop: 5, flexDirection:'row' }}>
              <Ionicons color={'#eeb64a'} name='star' size={15}/>
              <Text style={{marginLeft:2, fontSize: 12}}>
                {DetailMovie.vote_average}/10
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 5,
                textAlign: 'auto',
                
              }}>
              {DetailMovie.status} : {DetailMovie.release_date}
            </Text>       
          </View>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Genre</Text>
          <FlatList
            horizontal
            data={DetailMovie.genres}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <TouchableOpacity style={{ 
                marginRight: 10,
                marginTop: 10,
                backgroundColor: '#649DFF',
                padding: 5,
                borderRadius: 8
               }}>
                <Text style={{ textAlign:'center', color:'#fff' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold',
            marginBottom: 10, 
            }}>
              Synopsis
          </Text>
          <Text>{DetailMovie.overview}</Text>
        </View>

        <View style={{flex:1}}>
        <Text style={{marginHorizontal:10, fontSize: 18, fontWeight: 'bold' }}>Actor/Artist</Text>
          <FlatList
              columnWrapperStyle={{justifyContent:'space-between'}}
              numColumns={3}
              data={Actor}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <TouchableOpacity 
                style={{ 
                  
                  height: 130, 
                  width: 120,
                  marginVertical:10,
                  overflow: 'hidden',
                  padding:10
                   }}>
                  <Image 
                    source={{uri: `${item.profile_path}`}}
                    style={{
                      height: 100, 
                      width: 100, 
                      borderRadius: 5
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