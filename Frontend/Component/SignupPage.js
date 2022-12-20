import { useCallback, useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView,TextInput, } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import {SERVER} from '@env';
import { CheckAuth } from '../Component/lib/CheckAuth';
import Toastify from './lib/Toastify';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


 /**
 * SettingPage = mode : setting
 * 회원가입 후, 자동로그인이 된다.
 * 비밀번호 입력후, 확인창을 따로 분리 한다. => 상태 저장 [enrolled, setEnroll] // :28
 * REAST API - users/signup (SubmitHandler)
 */

const SignupPage = ({setDisplay, setMode}) => {
     const [data, setData] = useState({ //회원가입을 위해 필요한 정보 세팅
          name: '',
          nick: '',
          password: '',
          re_password: '',
        }); 
     const [enrolled, setEnroll] = useState(false); // 비밀번호 확인을 물을지 아닐지를 결정.
     const [me, setMe] = useContext(CheckAuth); // 가입이 완료되면 setMe로 자동로그인이 되도록 설정
     
     useEffect(()=>{
          setDisplay(false); //footer & cameraBtn 숨김
     },[])

     const inputHandler = (key, value) => {
          setData(prevState => ({
               ...prevState,
               [key]: value,
             }));
     } // 입력할때마다 실행되는 이벤트 핸들러

     const submitHandler = async(data) => {
          try {
               if(data.name.length < 3) {
                    Toastify("아이디는 3자 이상입니다.",'red')
                    throw new Error("아이디는 3자 이상입니다.")
               }
               if(data.nick.length < 2 ) {
                    Toastify("별명은 2자 이상입니다.",'red')
                    throw new Error("별명은 2자 이상입니다.")
               }
               if(data.password.length < 6 || data.re_password.length <6){
                    Toastify("비밀번호는 6자 이상입니다.",'red')
                    throw new Error ("비밀번호는 6자 이상입니다.")
               } 
               if(data.password !== data.re_password){
                    Toastify('비밀번호 확인 오류','red')
                    throw new Error ("비밀번호 확인 오류.")
               }
               // Error관리
               const result = await axios.post(`${SERVER}/users/signup`,{data})
               setMe({
                    name: result.data.name.toLowerCase(),
                    sessionId : result.data.sessionId,
                    nick : result.data.nick.toLowerCase(),
                    id : result.data.id,
               }) // for CheckAuth Provider , 서버와 통신
               Toastify("회원가입 완료!",'teal')
               setMode('home');
               // 가입 완료 후 FirstPage(home)으로 돌아갈 것.
               setDisplay(true);
               // footer&cameraBtn 다시 띄움
          }catch(err){
               alert('잘못된 정보입니다.')
               setMode('home');
               // 가입 실패시 FirstPage(home)으로 돌아갈 것.
               setDisplay(true);
               // footer&cameraBtn 다시 띄움
               console.log(err);
               throw new Error(err);
          } // 회원 가입 정보 입력 오류시.
     } 
     //가입 정보 입력 후 정보를 보내는 핸들러

     const enrollHandler = () => {
          setEnroll(true);
     }

     // 폰트 호출
     const [fontsLoaded] = useFonts({
          'main' : require('../assets/Fonts/MapoFlowerIsland.ttf'),
        })
      
     const onLayoutRootView = useCallback(async () => {
     if (fontsLoaded) {
          await SplashScreen.hideAsync();
     } // 글꼴 파일을 미리 렌더
     }, [fontsLoaded]); 
     
     if (!fontsLoaded) return null;
     // 폰트 호출

     return ( 
          <SafeAreaView style={styles.container} onLayout = {onLayoutRootView}>
               <TouchableOpacity onPress={()=>{
                         setDisplay(true)
                         setMode('home')
                    }} style={{position:'absolute', top: 30, left: 10,}}>
                    <Ionicons name="chevron-back" size={40} color="teal" /></TouchableOpacity>
                    {
                    !enrolled ?
                         // 비밀번호 확인 전
                         <>
                         <View style={styles.titleContainer}>
                              <Text style={styles.title}>하늘하늘</Text>
                              <Text style={styles.title}>계정 만들기</Text>
                         </View>
                         {/* 로고 타이틀  */}
                         <TextInput
                         style={styles.input}
                         placeholder={'ID'}
                         defaultValue={data.name||''}
                         autoCapitalize={'none'}
                         onChangeText={(text) => {inputHandler('name',text.toLowerCase())}}
                         /><Text style={styles.infoText}> 아이디는 소문자 3자 이상입니다.</Text>
                         {/* 아이디 입력창  */}
                         <TextInput
                         style={styles.input}
                         placeholder={'nickname'}
                         defaultValue={data.nick || ''}
                         autoCapitalize={'none'}
                         onChangeText={(text) => {inputHandler('nick',text.toLowerCase())}}
                         // 모든 문자는 소문자로 변경 
                         /><Text style={styles.infoText}> 별명은 소문자 2자 이상입니다.</Text>
                         {/* 닉네임 입력창  */}
                         <TextInput
                         style={styles.input}
                         placeholder={'password'}
                         secureTextEntry
                         defaultValue={''}autoCapitalize={'none'}
                         onChangeText={(text) => {inputHandler('password',text)}}
                         /><Text style={styles.infoText}> 비밀번호는 6자 이상입니다.</Text>
                         {/* 비밀번호 입력창  */}
                         <TouchableOpacity style={styles.button} onPress={enrollHandler}>
                              <Text style={styles.btnText}> 등록</Text>
                         </TouchableOpacity>
                         {/* 등록 => enrollHandler */}
                         {/** */}
                         </>
                    :<>
                         {/* // 비밀번호 확인  */}
                         <View style={styles.titleContainer}>
                         <Text style={{...styles.title, fontSize: 20}}>비밀번호 확인</Text>
                         </View>
                         <TextInput
                         defaultValue={''}
                         style={styles.input}
                         secureTextEntry
                         clearTextOnFocus
                         onChangeText={(text) => {inputHandler('re_password',text)}}
                         placeholder={'Check password'}
                         />
                         {/* 비밀번호 확인창  */}
                         <TouchableOpacity style={styles.button} onPress={() => {
                                   submitHandler(data);
                         }}><Text style={styles.btnText}> 가입하기 </Text>
                         </TouchableOpacity>
                         {/* 가입 => submitHandler, 정보전송 */}
                         {/** */}
                    </>
               }
    </SafeAreaView>
     )
}

export default SignupPage

const styles = StyleSheet.create({
     container : {
          flex: 1,
          // position: 'absolute',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: 'center',
          alignItems : "center",

     },

     titleContainer : {
          alignItems: 'center'
     },
     title:{
          fontSize: 40,
          fontFamily: 'main',
          color: 'teal'
     },

     input: {
          width: SCREEN_WIDTH/1.2,
          height: 50,
          margin: 12,
          backgroundColor : 'snow',
          fontSize: 20,
          borderRadius: 10,
          paddingLeft: 10,
     },
     button : {
          width: 200,
          height: 50,
          backgroundColor: 'teal',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
     },

     btnText :{
          fontSize: 20, color: 'snow', fontFamily: 'sub'
     },

     infoText : {
          fontSize: 13, color: 'grey' , marginTop: -10
     }
})