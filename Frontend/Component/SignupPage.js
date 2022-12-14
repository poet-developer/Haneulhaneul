import { useCallback, useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView,TextInput, } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import {SERVER} from '@env';
import { CheckAuth } from '../Component/lib/CheckAuth';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SignupPage = ({setDisplay, setMode}) => {
     const [data, setData] = useState({
          name: '',
          nick: '',
          password: '',
          re_password: '',
        });
     const [me, setMe] = useContext(CheckAuth);
     useEffect(()=>{
          setDisplay(false);
     },[])

     const inputHandler = (key, value) => {
          setData(prevState => ({
               ...prevState,
               [key]: value,
             }));
     }

     const submitHandler = async(data) => {
          try {
               if(data.name.length < 3) {
                    alert("아이디는 3자 이상입니다.")
                    throw new Error("아이디는 3자 이상입니다.")
               }
               if(data.nick.length < 2 ) {
                    alert("별명은 2자 이상입니다.")
                    throw new Error("별명은 2자 이상입니다.")
               }
               if(data.password.length < 6 || data.re_password.length <6){
                    alert("비밀번호는 6자 이상입니다.")
                    throw new Error ("비밀번호는 6자 이상입니다.")
               } 
               if(data.password !== data.re_password){
                    alert('비밀번호 확인 오류')
                    throw new Error ("비밀번호 확인 오류.")
               }
               const result = await axios.post(`${SERVER}/users/signup`,{data})

               setMe({
                    name: result.data.name,
                    sessionId : result.data.sessionId,
                    nick : result.data.nick
               })
               alert("회원가입 완료!")
               setMode('home');
               setDisplay(true);
          }catch(err){
               console.log(err);
          }
     }

     const [fontsLoaded] = useFonts({
          'main' : require('../assets/Fonts/Pak_Yong_jun.ttf'),
        })
      
     const onLayoutRootView = useCallback(async () => {
     if (fontsLoaded) {
          await SplashScreen.hideAsync();
     } // 글꼴 파일을 미리 렌더
     }, [fontsLoaded]); 
     
     if (!fontsLoaded) return null;


     return ( 
          <SafeAreaView style={styles.container} onLayout = {onLayoutRootView}>
               <TouchableOpacity onPress={()=>{
                         setDisplay(true)
                         setMode('home')
                    }} style={{position:'absolute', top: 30, left: 10,}}>
                    <Ionicons name="chevron-back" size={40} color="teal" /></TouchableOpacity>
               <View style={styles.titleContainer}>
               <Text style={styles.title}>하늘하늘</Text>
               <Text style={styles.title}>계정 만들기</Text>
               </View>
               <TextInput
               style={styles.input}
               placeholder={'username'}
               defaultValue={data.name||''}
               onChangeText={(text) => {inputHandler('name',text)}}
               // value={text}
               />
               <TextInput
               style={styles.input}
               placeholder={'nickname'}
               defaultValue={data.nick || ''}
               onChangeText={(text) => {inputHandler('nick',text)}}
               // value={text}
               />
               <TextInput
               style={styles.input}
               placeholder={'password'}
               secureTextEntry
               defaultValue={''}
               onChangeText={(text) => {inputHandler('password',text)}}
               // value={number}
               />
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
                    <TouchableOpacity style={styles.button} onPress={() => {
                              submitHandler(data);
               }}><Text style={styles.btnText}> 가입하기 </Text>
               </TouchableOpacity>
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
          fontFamily:'main', fontSize: 20, color: 'snow',
     }
})