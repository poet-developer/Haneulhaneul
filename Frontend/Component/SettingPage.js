import { useContext, useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckAuth } from './lib/CheckAuth';
import axios from 'axios';
import {SERVER} from '@env';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toastify from './lib/Toastify';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

 /**
 * SettingPage = mode : setting
 * 로그인 상태를 확인한다. 로그인되지 않았으면 로그인 버튼과 회원가입 버튼을 띄운다.
 * 로그인 되어있다면 내 정보(id, nickname)과 로그아웃, 계정삭제 버튼을 띄운다.
 * REAST API - users/logout(LogoutHandler) , users/delete_process(DeleteHandler)
 */

 const SettingPage = ({setDisplay, setMode}) => {
      const [me, setMe] = useContext(CheckAuth)

     useEffect(()=>{
          setDisplay(false); // footer, cameraBtn 숨김
     },[setMe])

     const LogoutHandler = () =>{
               axios.patch(`${SERVER}/users/logout`,{} //req.body자리
               ,{headers : {sessionid : me.sessionId}})
               .then(Toastify(`꼭 다시 봐요!`,'teal')).then(setMe()).then(AsyncStorage.removeItem("sessionId")).then(setDisplay(true)).then(setMode('home')).catch(console.log)
               // 로그아웃 : AsyncStroage과 로그인정보(me) 비울것 
               // 화면은 FirstPage로 이동한다(mode: home)
     }

     const DeleteHandler = () => {
          axios.patch(`${SERVER}/users/delete_process`,{id : me.id})
          .then(Toastify(`꼭 다시 봐요!`,'teal')).then(setMe()).then(AsyncStorage.removeItem("sessionId")).then(setDisplay(true)).then(setMode('home')).catch(console.log)
               // 계정삭제 : AsyncStroage과 로그인정보(me) 비울것 
               // 화면은 FirstPage로 이동한다(mode: home)
     }
     const DeleteAlert = () => {
          // 계정삭제 전 다시 묻는 모달창.
               Alert.alert(
                    "Are your sure?",
                    "정말 떠나실건가요??",
                    [
                      {
                        text: "네",
                        onPress: () => {
                         DeleteHandler()
                        },
                      },
                      {
                        text: "다음에요",
                      },
                    ]
                  );
     }
     // 폰트 호출
     const [fontsLoaded] = useFonts({
          'main' : require('../assets/Fonts/MapoFlowerIsland.ttf'),
          'sub' : require('../assets/Fonts/Pak_Yong_jun.ttf')
        })

     const onLayoutRootView = useCallback(async () => {
          if (fontsLoaded) {
               await SplashScreen.hideAsync();
          }}, [fontsLoaded]); 
          
          if (!fontsLoaded) return null;
     // 폰트 호출 

      return(
           <View style={styles.container} onLayout={onLayoutRootView}> 
                <TouchableOpacity onPress={()=>{
                         setDisplay(true)
                         setMode('home')
                    }} style={{position:'absolute', top: 30, left: 10,}}>
                    <Ionicons name="chevron-back" size={40} color="snow" /></TouchableOpacity>
                    {me?
                    // 로그인 되어있다면
                    <>
                    {/* 사용자 아이디 / 닉네임 */}
                    <View style={styles.infoContainer}>
                     <Text style={styles.infoText}>내 닉네임 | {me.nick || ''}</Text>
                     <Text style={styles.infoText}>내 아이디 | {me.name || ''}</Text>
                    </View>
                         <TouchableOpacity onPress={LogoutHandler} style={styles.logBtn}>
                         <Text style={styles.btnText}>로그아웃</Text> 
                         </TouchableOpacity>
                    {/* 로그아웃 */}
                         <TouchableOpacity onPress={DeleteAlert}
                         style={styles.logBtn}>
                         <Text style={styles.btnText}>계정삭제</Text> 
                         </TouchableOpacity>
                    {/* 계정삭제 */}
                    {/* */}
                    </>
                    :
                    // 로그인 되어있지 않다면
                    <>
                    {/* 로고 타이틀 */}
                    <View style={{flex: 3, justifyContent:'center'}}>
                    <Text style={{
                         fontFamily: 'sub',
                         fontSize: 25,
                         color: 'snow'
                    }}>나를 위한 작은 시간,</Text>
                    <Text style={{
                         fontFamily: 'main',
                         fontSize: 60,
                         color: 'snow',
                         letterSpacing: 4,
                         marginTop: 7,
                    }}>하늘하늘</Text></View>
                    {/**/}

                    <View style={{flex:2}}>
                    <TouchableOpacity onPress={()=>{
                         setMode('login')
                    }}
                    style={styles.logBtn}>
                    <Text style={styles.btnText}>로그인</Text> 
                    </TouchableOpacity>
                    {/* mode Changer : login */}
                    <TouchableOpacity onPress={()=>{
                         setMode('signup')
                    }}
                    style={styles.logBtn}>
                    <Text style={styles.btnText}>회원가입</Text> 
                    </TouchableOpacity>
                    {/* mode Changer : signup */}
                    </View>
                    </>
                    }
          </View>
     )
}
export default SettingPage

const styles = StyleSheet.create({
     container:{
          flex: 1,
          alignItems : 'center',
          justifyContent : 'flex-end',
          backgroundColor : 'teal',
          width : SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        },

     logBtn : {
          width: SCREEN_WIDTH/1.5,
          height: 50,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems : 'center',
          backgroundColor: 'snow',
          color: 'snow',
          marginBottom: 80,
     },

     btnText : {
          color: 'teal',
          fontSize: 22,
          fontFamily: 'sub',
     },

     infoContainer : {
               marginBottom: 90, 
               borderWidth: 3,
               width: SCREEN_WIDTH/1.2,
               borderRadius: 20,
               borderColor: '#8bd5d0',
               height:220, 
               paddingTop:20,
               justifyContent: 'center',
               alignItems: 'center',
               borderStyle :'dashed'
     },
     infoText : {
          fontSize:25, 
          color: 'snow', 
          marginBottom: 20,
          fontFamily: 'main'
     }
})