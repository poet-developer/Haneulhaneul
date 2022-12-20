import { useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import getRandomNum from './lib/getRandomNum';
import { Fontisto } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import {SERVER} from '@env';


const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// 모바일 화면 너비, 높이

const icons = {
     "Clouds" : "cloudy",
     "Clear" : "day-sunny",
     "Snow" : "snow",
     "Drizzle" : "rain",
     "Rain" : "rains",
     "Tunderstorm" : "lightning",
 } // Open Weather API 정보에 따른 날씨 아이콘을 저장한 객체.

 /**
 * FirstPage = mode : home
 * 사용자들이 공유한 이미지 정보를 불러와 랜덤으로 배경화면 이미지로 사용한다.
 * 시간, 날씨, 기온, 지역, 배경이미지를 찍은 user에 대한 정보 사용.
 */

const FirstPage = ({city, desc, temp, weather, rendered}) => {
     const [clock, setClock] = useState() // 현재 시간
     const [cover, setCover] = useState({}) // 선택된 배경 사진
     const [coverDate, setCoverDate] = useState('');
     let allCovers = []; // 불러온 이미지 저장 배열
     
     const getCoverImage = async() => {
          const covers = await axios.get(`${SERVER}/images/readImages`)
          if(covers.data.length !== 0){
          allCovers =  covers.data.map(item => {
            return { key : item.key, author: item.author, created_at : item.createdAt }
          }) // 사용자들이 공유한 모든 이미지 호출 allCovers 배열에 저장
      
          const num = getRandomNum(allCovers.length);
          setCover(allCovers[num])
          setCoverDate(allCovers[num].created_at.split("T")[0]);
        }
      // 랜덤으로 출력한 한장의 이미지 번호를 변수 num에 저장해서 정보 호출 (getRandomeNum)
        }

        const GetTime = () => { // 현재 시간을 얻어 우리가 익히 아는 시간 포맷으로 변경
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
      if(clock) GetTime(); // :49
      getCoverImage(); // :35
    }, [rendered])

    setTimeout(GetTime,1000) // Live Clock

    const [fontsLoaded] = useFonts({
      'title' : require('../assets/Fonts/MapoFlowerIsland.ttf'), // 폰트 사용
    })
  
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) await SplashScreen.hideAsync();
      // 글꼴 파일을 미리 렌더해서 가장 상위 Comp에서 사용
    }, [fontsLoaded]); 
  
    if (!fontsLoaded) return null;  // 글꼴 파일이 없으면 다시 렌더한다.

     return(
          <View style={styles.page} onLayout = {onLayoutRootView}>
            <Image style={styles.intro} source ={{uri :`${SERVER}/uploads/${cover.key}`}}/>
            {/* 배경이미지 */}
            <View style={styles.middleTempDesc}>
              <View style={{justifyContent:'flex-end', marginBottom: -10, marginLeft: 10}}>
                <Fontisto style={{paddingLeft:100}} name={icons[weather]} size={82} color="white" />
                <Text style={styles.temp}>{temp}</Text> 
              </View>
              <Text style={styles.desc}>{desc}</Text>
            </View>
            {/* 날씨/ 기온 => 화면 중앙에 뜨위는 정보들1 */}
            <View style={{flex: 1, flexDirection:'row',justifyContent:'space-around'}}>
              <Text style={styles.city}>{city.toUpperCase()}</Text>
              <View style={{flexDirection: 'column',justifyContent: 'space-between'}}>
               <Text style={styles.clock}>
                    {clock}</Text>
               <Text className='byUser' style={styles.byUser}>
               {`Photo by.${cover.author}${'\n'}${coverDate}`}</Text> 
               </View>
            </View>
            {/* 지역/ 시간 => 화면 중앙에 뜨위는 정보들2 */}
        </View>
     )

}


export default FirstPage

const styles = StyleSheet.create({
  middleTempDesc : {
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
    fontFamily : 'main',
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
    fontSize: 18,
    marginRight: 9,
    fontFamily: 'main',
    fontWeight: 700,
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
      fontFamily: 'main', 
      color: 'snow', 
      backgroundColor: 'rgba(50,50,50,0.9)',
      marginBottom: 180,
      marginRight: 3
  }
})