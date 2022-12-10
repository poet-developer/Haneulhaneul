import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const icons = {
     "Clouds" : "cloudy",
     "Clear" : "day-sunny",
     "Snow" : "snow",
     "Drizzle" : "rain",
     "Rain" : "rains",
     "Tunderstorm" : "lightning",
 }


const styles = StyleSheet.create({
        weather : {
          flexDirection: 'row', 
          alignItems: 'flex-end', 
          justifyContent:'space-between', 
          width : SCREEN_WIDTH, 
          flex:1.3, 
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
          width: 144,
        },
        intro : {
          height: SCREEN_HEIGHT/9*8.5,
          width: SCREEN_WIDTH,
          position: 'absolute',
        },
        page: {
          width: SCREEN_WIDTH,
        }
})

const FirstPage = ({city, desc, temp, weather}) => {
     const [clock, setClock] = useState("...Loading")

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
          GetTime();
        }, [])

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
            <Image style={styles.intro} source ={require(`../assets/sky/day.jpg`)}/>
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
               <Text style={{
                 width: 135,
                 fontSize: 16, textAlign: 'right', fontFamily: 'title' , color: 'snow', backgroundColor: 'rgba(50,50,50,0.9)',
              marginBottom: 80, marginRight: 3,}}>
               {`Photo by.이로${'\n'}2022년 10월 21일 `}</Text>
               </View>
            </View>
        </View>
     )

}


export default FirstPage