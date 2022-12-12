import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import * as Location from 'expo-location';
import Footer from './Component/UI/Footer';
import FirstPage from './Component/FirstPage';
import SecondPage from './Component/SecondPage';
import ThirdPage from './Component/ThirdPage';
import FourthPage from './Component/FourthPage';
import CameraView from './Component/UI/CameraView';
import Setting from './Component/Setting';
import { Ionicons } from '@expo/vector-icons';


const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const API_KEY = '0b20db5a1f789dfe29844f8329c061f7';


export default function App() {
  const [mode, SetMode] = useState( ''|| 'home');
  const [city, setCity] = useState("...Loading");
  const [days, setDays] = useState([]);
  // const [clock, setClock] = useState("...Loading")
  const [ok, setOk] = useState(true);
  const [rendered, setRenderState] = useState(false);

  const GetWeather = async() => {
    try{
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if(!granted) setOk(false)
      const{coords:{latitude, longitude}} = await Location.getCurrentPositionAsync()
      const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
      setCity(location[0].city); // GetCity
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setDays(data)
        if(days) setRenderState(true)
      })
      .catch(console.log)

    }catch(err){
      throw err;
    }
  }

  useEffect(()=>{
    GetWeather();
  }, [])

  const OnCameraMode = () => {
    SetMode('camera')
  }

  const OnSettingMode = () => {
    SetMode('setting')
  }

  return (<>
    { days ?
    <View style={styles.container}>
      <TouchableOpacity style={styles.setting} onPress={OnSettingMode}>
      <Ionicons name="settings-sharp" size={28} color="snow"/></TouchableOpacity>

      <TouchableOpacity style={{position:'absolute', right: 0, bottom: 60, zIndex: 5, backgroundColor:'white',
      width: 55, height: 55, 
      borderRadius: 20,
      overflow: 'hidden', 
      paddingLeft: 3,
      margin: 10,
      }} onPress={OnCameraMode}>
      <Ionicons name="md-camera" size={50} color="tomato" /></TouchableOpacity>
      <View style = {{flex: 8 , position: 'relative'}}>
        {days.length === 0 ? 
        <View style={{...styles.slider, justifyContent:'center', 
        alignItems: 'center'}}>
          <ActivityIndicator size="large" color="white"/>
        </View>
        :
        <View className = 'ContentLayout' style={{
          flex: 1,
        }}> 
        {/* Content */}
        { mode === 'home' ?
          <FirstPage city = {city.toUpperCase()} desc = {days.weather[0].description} temp ={parseFloat(days.main.temp).toFixed(1)} weather = {days.weather[0].main} rendered = {rendered}/>
          : ''}
          { mode === 'album' ? <SecondPage/> : ''}
          { mode === 'people' ? <ThirdPage rendered = {rendered}/> : ''}
          { mode === 'music' ? <FourthPage/> : '' }
          { mode === 'camera' ? <CameraView/> : ''}
          { mode === 'setting' ? <Setting/> :''}
        {/* Content */}
        </View>
        }
      </View>
      <Footer width={SCREEN_WIDTH} chaingingMode = {SetMode}/>
      <StatusBar style='light'/>
    </View>
    : <Text>에러발생</Text>
    }
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888',
    position: 'relative',
  },
  slider: {
    // position : 'absolute',
    // top: 0,
    // left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  }, // Sky Image
  setting : {
    position : 'absolute',
    top: 30,
    right:15,
    zIndex: 5,
    opacity: 0.9,
  },
  
});

// TODO: 스크롤 위치로 스크롤 위치 세는 함수 작성 -> 랜덤 하늘 사진, slider indicator
// TODO: 슬라이더 점 활성화 애니메이션
// TODO: 왼쪽 끝으로 이동할때 3번째 모드로 돌아갈것
// TODO: BTN

