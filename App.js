import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';

const {width : SCREEN_WIDTH} = Dimensions.get('window');
const API_KEY = '0b20db5a1f789dfe29844f8329c061f7';
const icons = {
  "Clouds" : "cloudy",
  "Clear" : "day-sunny",
  "Snow" : "snowflake",
  "Drizzle" : "rain",
  "Rain" : "rains",
  "Tunderstorm" : "lightning",
}

export default function App() {
  const [city, setCity] = useState("...Loading");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const GetWeather = async() => {
    try{
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if(!granted) setOk(false)
      // TODO: 객체 표기 방법 공부
      const{coords:{latitude, longitude}} = await Location.getCurrentPositionAsync()
      const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
      setCity(location[0].timezone.split("/")[1]); // GetCity
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => setDays(data))
      .catch(console.log)

    }catch(err){
      throw err;
    }
  }

  useEffect(()=>{
    GetWeather();
  }, [])

  const [fontsLoaded] = useFonts({
    'title' : require('./assets/Fonts/Pak_Yong_jun.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    } // 글꼴 파일을 미리 렌더
  }, [fontsLoaded]); 

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout = {onLayoutRootView}>
      {/* <Image style={styles.intro} source ={require(`./assets/sky/day.jpg`)}/>
      <Text style={styles.title}>하늘하늘</Text>
      <StatusBar style="light" /> */}
      <View style={styles.location}>
        <Text style={styles.city}>{city}</Text>
      </View>
      <ScrollView 
      pagingEnabled
      horizontal 
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle={styles.weather}>
        {days.length === 0 ? 
        <View style={styles.day}>
          <ActivityIndicator size="large" color="gold"/>
        </View>
        :
        <View style={styles.day}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.temp}>{parseFloat(days.main.temp).toFixed(1)}</Text>
          <Fontisto name={icons[days.weather[0].main]} size={70} color="white" />
          </View>
          <Text style={styles.main}>{days.weather[0].main}</Text>
          <Text style={styles.desc}>{days.weather[0].description}</Text>
        </View>
        }
      </ScrollView>
      <StatusBar style='light'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'midnightblue',
  },
  // title : {
  //   position : 'absolute',
  //   flex: 1,
  //   top: '50%',
  //   fontSize : 50,
  //   fontFamily : 'title',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   color : 'white',
  // },
  location : {
    flex: 1,
    color : 'white',
    justifyContent: 'center',
    alignItems : 'center'
  },
  city : {
    color: 'azure',
    fontSize : 40,
    fontWeight : "600"
  },
  weather : {}, 
  day : {
    alignItems : 'center',
    width: SCREEN_WIDTH,
  },  
  temp : {
    color: 'snow',
    fontSize: 102,
    marginTop: 50,
    marginRight: 10,
  },
  main : {
    color: 'gold',
    fontSize: 42,
    marginTop: -10,
  },
  desc : {
    color: 'snow',
    fontSize: 22,
  }
  // intro : {
  //   width: '100%',
  //   height : '100%',
  // }
});