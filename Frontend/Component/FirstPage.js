import { useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import getRandomNum from './lib/getRandomNum';
import { Fontisto } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import {SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const icons = {
     "Clouds" : "cloudy",
     "Clear" : "day-sunny",
     "Snow" : "snow",
     "Drizzle" : "rain",
     "Rain" : "rains",
     "Tunderstorm" : "lightning",
 }

const FirstPage = ({city, desc, temp, weather, rendered}) => {
     const [clock, setClock] = useState()
     const [cover, setCover] = useState({})
     const [coverDate, setCoverDate] = useState('');
     let allCovers = [];

     const getCoverImage = async() => {
      const covers = await axios.get(`${SERVER}/images/readImages`)
      if(covers.data.length !== 0){
        allCovers =  covers.data.map(item => {
          return { key : item.key, author: item.author, created_at : item.createdAt }
        })
      
      const num = getRandomNum(allCovers.length);
      setCover(allCovers[num])
      setCoverDate(allCovers[num].created_at.split("T")[0]);
      }
     }

     const GetTime = () => {
          const date = new Date();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          setClock(`${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`
          );
        }
     
        useEffect(()=>{
          if(clock){
            GetTime();
          }
          getCoverImage();
        }, [rendered])

        setTimeout(GetTime,1000) // Live Clock

        const [fontsLoaded] = useFonts({
          'title' : require('../assets/Fonts/Pak_Yong_jun.ttf'),
        })
      
        const onLayoutRootView = useCallback(async () => {
          if (fontsLoaded) {
            await SplashScreen.hideAsync();
          } // 글꼴 파일을 미리 렌더
        }, [fontsLoaded]); 
      
        if (!fontsLoaded) return null;

     return(
          <View style={styles.page} onLayout = {onLayoutRootView}>
            <Image style={styles.intro} source ={{uri :`${SERVER}/uploads/${cover.key}`}}/>
            {/* <Text style={styles.title}>하늘하늘</Text> */}
            <View style={styles.weather}>
              <View style={{justifyContent:'flex-end', marginBottom: -10, marginLeft: 10}}>
              <Fontisto style={{paddingLeft:100}} name={icons[weather]} size={82} color="white" />
                <Text style={styles.temp}>{temp}</Text>
              </View>
              <Text style={styles.desc}>{desc}</Text>
            </View>
            <View style={{flex: 1, flexDirection:'row',justifyContent:'space-around'}}>
              <Text style={styles.city}>{city.toUpperCase()}</Text>
              <View style={{flexDirection: 'column',justifyContent: 'space-between'}}>
               <Text style={styles.clock}>
                    {clock}</Text>
               <Text className='byUser' style={styles.byUser}>
               {`Photo by.${cover.author}${'\n'}${coverDate}`}</Text> 
               </View>
            </View>
        </View>
     )

}


export default FirstPage

const styles = StyleSheet.create({
  weather : {
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    justifyContent:'space-between', 
    width : SCREEN_WIDTH, 
    flex:1, 
  },
  city : {
    color: 'azure',
    fontSize : 32,
    flex : 1,
    marginLeft : 10,
    marginTop : 5,
    fontWeight : "500",
  },
  temp : {
    color: 'snow',
    fontSize: 96,
    marginTop: 50,
    marginRight: 10,
    marginTop: -30,
  },
  main : {
    color: 'blue',
    fontSize: 42,
    marginTop: -10,
    // flex: 1,
  },
  desc : {
    color: 'snow',
    fontSize: 16,
    marginRight: 9
  },
  clock : {
    fontSize: 34,
    color : 'snow',
    fontWeight : "600",
    width: 149,
  },
  intro : {
    height: SCREEN_HEIGHT/9*8.5,
    width: SCREEN_WIDTH,
    position: 'absolute',
  },
  page: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  byUser : {
      width: 135,
      fontSize: 16, 
      textAlign: 'right', 
      fontFamily: 'title', 
      color: 'snow', 
      backgroundColor: 'rgba(50,50,50,0.9)',
      marginBottom: 180,
      marginRight: 3
  }
})