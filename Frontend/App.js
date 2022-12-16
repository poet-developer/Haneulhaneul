import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import Footer from './Component/UI/Footer';
import FirstPage from './Component/FirstPage';
import SecondPage from './Component/SecondPage';
import ThirdPage from './Component/ThirdPage';
import CameraView from './Component/UI/CameraView';
import Setting from './Component/Setting';
import { Ionicons } from '@expo/vector-icons';
import LoginPage from './Component/LoginPage';
import SingupPage from './Component/SignupPage'
import CameraBtn from './Component/UI/CameraBtn'
import {API_KEY} from '@env';
import { AuthProvider} from './Component/lib/CheckAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function App() {
  const [mode, setMode] = useState( ''|| 'setting');
  const [city, setCity] = useState("...Loading");
  const [days, setDays] = useState([]);
  const [display, setDisplay] = useState('auto');
  const [ok, setOk] = useState(true);
  const [rendered, setRenderState] = useState(false);
  const [logined, setLogined] = useState();

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
    displayHandler(false);
    displayHandler(rendered)
    GetStorage();
  }, [rendered])


  const OnSettingMode = () => {
    setMode('setting')
  }

  const GetStorage = async() => {
    setLogined(await AsyncStorage.getItem("sessionId"))
    if(logined) setMode('home')
  }

  const displayHandler = (target) => {
      if(target) setDisplay('auto')
      else setDisplay('none')
  }

  const modeHandler = (mode) => {
    setMode(mode)
  }


  return (<AuthProvider>
    {/* { days ? */}
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.setting, display: display}} onPress={OnSettingMode}>
      <Ionicons name="settings-sharp" size={28} color="snow"/></TouchableOpacity>
      <CameraBtn display={display} setMode={setMode}/>
      <View style = {{flex: 8 , position: 'relative'}}>
        {days.length === 0 ? 
        <View style={{...styles.slider, justifyContent:'center', 
        alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#8bd5d0"/>
        </View>
        :
        <View className = 'ContentLayout' style={{
          flex: 1,
          position: 'relative'
        }}> 
        {/* Content */}
        { mode === 'signup' ?
          <SingupPage setDisplay={displayHandler} 
          setMode = {modeHandler}/>
          : ''
        }
        { mode === 'login' ?
          <LoginPage setDisplay={displayHandler} 
          setMode = {modeHandler}/>
          : ''
        }
        { mode === 'home' ?
          <FirstPage city = {city.toUpperCase()} desc = {days.weather[0].description} temp ={parseFloat(days.main.temp).toFixed(1)} weather = {days.weather[0].main} rendered = {rendered}/>
          : ''}
          
            { mode === 'album' || mode === 'view' ? <SecondPage setDisplay= {displayHandler}
            setMode = {modeHandler}
            currentMode = {mode}
            /> : ''}
            { mode === 'camera' ? <CameraView setMode={modeHandler} setDisplay={displayHandler} weather = {days.weather[0].description}/> : ''}
            { mode === 'setting' ? <Setting setDisplay={displayHandler} setMode ={modeHandler}/> :''}
          
          { mode === 'people' ? <ThirdPage setDisplay={displayHandler} setMode={modeHandler} rendered = {rendered}
          currentMode = {mode}
          /> : ''}
        {/* Content */}
        </View>
        }
      </View>
      <Footer mode = {mode} display = {display} chaingingMode = {setMode}/>
      <StatusBar style='light'/>
    </View>
    {/* : <Text>에러발생</Text> */}
    {/* } */}
      </AuthProvider>
  );
}
 // TODO: style Object 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bd5d0',
    position: 'relative',
  },
  slider: {
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
  carmeraBtn : {
    position:'absolute', right: 0, bottom: 60, zIndex: 5, backgroundColor:'white',
      width: 55, height: 55, 
      borderRadius: 20,
      overflow: 'hidden', 
      paddingLeft: 3,
      margin: 10,
  }
});

// TODO: 스크롤 위치로 스크롤 위치 세는 함수 작성 -> 랜덤 하늘 사진, slider indicator
// TODO: 슬라이더 점 활성화 애니메이션
// TODO: 왼쪽 끝으로 이동할때 3번째 모드로 돌아갈것
// TODO: BTN

