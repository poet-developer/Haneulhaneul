import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import Footer from './Component/UI/Footer';
import FirstPage from './Component/FirstPage';
import SecondPage from './Component/SecondPage';
import ThirdPage from './Component/ThirdPage';
import CameraView from './Component/UI/CameraView';
import SettingPage from './Component/SettingPage';
import { Ionicons } from '@expo/vector-icons';
import LoginPage from './Component/LoginPage';
import SingupPage from './Component/SignupPage'
import CameraBtn from './Component/UI/CameraBtn'
import {API_KEY} from '@env';
import { AuthProvider} from './Component/lib/CheckAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
/**
 * mode home = FirstPage
 * mode album = SecondPage
 * mode people = ThirdPage
 * mode setting = SettingPage
 * mode login = LoginPage
 * mode signin = SignupPage
 * mode camera = CameraView
 * 위치 정보 사용을 묻는다.
 */
export default function App() {
  const [mode, setMode] = useState( ''|| 'setting');
  // 로그인이 안되있을 때, 첫 화면은 setting모드.
  const [city, setCity] = useState("...Loading");
  const [days, setDays] = useState([]);
  const [display, setDisplay] = useState('auto'); // footer, camera button display style
  const [ok, setOk] = useState(true);
  const [rendered, setRenderState] = useState(false);
  const [logined, setLogined] = useState();

  const GetWeather = async() => { // 위치 정보 + OpenWeather API = 현재 위치의 날씨 ->useEffect
    try{
      const { granted } = await Location.requestForegroundPermissionsAsync() 
      // 위치정보 사용 여부 묻기
      if(!granted) setOk(false) 
      // 승인되지 않으면 위치는 얻을 수 없음ㄴ
      const{coords:{latitude, longitude}} = await Location.getCurrentPositionAsync() 
      // 현재 위치 경도 위도 얻기
      const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false}) 
      // 위도와 경도를 통해 지역 얻기 (return Array)
      setCity(location[0].city); // 도시 이름 호출
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setDays(data)
        if(days && ok) setRenderState(true) // OpenWeather API와 현재 위도 경도를 사용하여 지역의 날씨 정보를 얻는다.
      })
      .catch(console.log)

    }catch(err){
      throw err;
    }
  }

  useEffect(()=>{
    GetWeather();
    displayHandler(true)
    GetAsyncStorage();
  }, [rendered])


  const OnSettingMode = () => {
    setMode('setting') // view mode : setting
  }

  const GetAsyncStorage = async() => { // 로그인 여부를 확인한다. -> useEffect
    setLogined(await AsyncStorage.getItem("sessionId"))
    if(logined) setMode('home')
  } // 앱에 들어오면 뜨는 첫 화면, 로그인이 되있으면 홈이 보인다. 

  const displayHandler = (target) => {
      if(target) setDisplay('auto') // Fotter와 카메라 버튼이 보이게 한다. -> useEffect
      else setDisplay('none') // Footer와 카메라 버튼이 사라지게 한다. (for setting, camera-viewPic mode)
  }

  const modeHandler = (mode) => {
    setMode(mode)
  }


  return (<AuthProvider>
    { days ?
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.setting, display: display}} onPress={OnSettingMode}>
        <Ionicons name="settings-sharp" size={28} color="snow"/>
        {/* 설정버튼 - modeChander : setting */}
      </TouchableOpacity>
      <CameraBtn display={display} setMode={setMode}/> 
      {/* 카메라버튼 - modeChander : camera */}
      {/* 날씨 시계 배결화면 home */}
      <View style = {{flex: 8 , position: 'relative'}}>
        {days.length === 0 ? 
        <View style={{...styles.slider, justifyContent:'center', 
        alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#8bd5d0"/>
        </View> // 날씨 정보가 아직 들어오지 않았을 때 로딩화면을 띄운다.
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
          
            { mode === 'album' ? <SecondPage setDisplay= {displayHandler}
            setMode = {modeHandler}
            currentMode = {mode}
            /> : ''}
            { mode === 'camera'? <CameraView setMode={modeHandler} setDisplay={displayHandler} weather = {days.weather[0].description}/> : ''}
            { mode === 'setting' ? <SettingPage setDisplay={displayHandler} setMode ={modeHandler}/> :''}
          
          { mode === 'people' ? <ThirdPage setDisplay={displayHandler} setMode={modeHandler} rendered = {rendered}
          currentMode = {mode}
          /> : ''}
        {/* Content */}
        </View>
        }
      </View>
      {/* 날씨 시계 배결화면 home */}
      <Footer mode = {mode} display = {display} chaingingMode = {setMode}/>
      <StatusBar style='light'/>
    </View>
    :<View style={styles.container}><Text>에러발생</Text></View> }
    {/* 위치 정보를 얻지 못하면 어플을 사용할 수 없다. */}
      </AuthProvider>
  );
}
 // TODO: style Object 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bd5d0',
    position: 'relative',
  }, //기분 display: flex
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

