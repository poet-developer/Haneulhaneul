import { useCallback, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
import axios from 'axios';
import { CheckAuth } from './lib/CheckAuth';
import {SERVER} from '@env';
import Toastify from './lib/Toastify';

const Signin = ({setDisplay, setMode}) => {
     
     const [data, setData] = useState({
          name: '',
          password: '',
     });
     const [me, setMe] = useContext(CheckAuth)

     const [fontsLoaded] = useFonts({
          'main' : require('../assets/Fonts/MapoFlowerIsland.ttf'),
        })

     const inputHandler = (key, value) => {
          setData(prevState => ({
               ...prevState,
               [key]: value,
             }));
     }

     const submitHandler = async(data) => {
          try {
               if(data.name.length < 3 || data.password.length<6) {
                    Toastify("입력하신 정보가 올바르지 않습니다.",'red')
                    throw new Error ("입력하신 정보가 올바르지 않습니다.")
               }
               const result = await axios.patch(`${SERVER}/users/login`,{data}).catch(res=>{
                    Toastify("존재하지 않는 아이디거나 잘못된 입력 정보입니다.",'red')
               })
               setMe({
                    name: result.data.name,
                    sessionId : result.data.sessionId,
                    nick : result.data.nick,
                    id : result.data.id
               }) // for CheckAuth Provider
               Toastify("로그인 성공!",'teal')
               setMode('home');
               setDisplay(true);
          }catch(err){
               console.log(err);
          }
     }

      
     const onLayoutRootView = useCallback(async () => {
     if (fontsLoaded) {
          await SplashScreen.hideAsync();
     }}, [fontsLoaded]); 
     
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
               <Text style={styles.title}>접속</Text>
               </View>
               <TextInput
               style={styles.input}
               placeholder={'username'}
               defaultValue={data.name||''}
               autoCapitalize={'none'}
               onChangeText={(text) => {inputHandler('name',text)}}
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
                    <TouchableOpacity style={styles.button} onPress={() => {
                              submitHandler(data);
               }}><Text style={styles.btnText}> 로그인 </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.hideText} onPress={() => {setMode('signup')
               }}><Text style={{color: 'tomato', fontFamily : 'main', fontSize: 15}}> 회원가입 </Text>
               </TouchableOpacity>
    </SafeAreaView>
     )
}

export default Signin

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
     },

     hideText : {
          marginTop: 20
     }
})