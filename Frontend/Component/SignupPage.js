import { useCallback, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, Button, SafeAreaView, Image, Pressable, TextInput, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SignupPage = ({setDisplay, setMode}) => {
     const [data, setData] = useState({
          name: '',
          nick: '',
          password: '',
          re_password: '',
        });

     const [isChecked, setCheck] = useState(false)
     const [vaild, setValid] = useState(true);

     useEffect(()=>{
          setDisplay(false);
     },[])

     const inputHandler = (key, value) => {
          setData(prevState => ({
               ...prevState,
               [key]: value,
             }));
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

     if(isChecked){
          return (
               <SafeAreaView style={styles.container}>
                    <TouchableOpacity onPress={()=>{
                         setCheck(false)
                    }} style={{position:'absolute', top: 30, left: 10,}}>
                    <Ionicons name="chevron-back" size={40} color="teal" /></TouchableOpacity>
                    <View style={styles.titleContainer}>
                    <Text style={styles.title}>비밀번호 확인</Text>
                    </View>
                    <TextInput
                    defaultValue={' '}
                    style={styles.input}
                    secureTextEntry
                    clearTextOnFocus
                    onChangeText={(text) => {inputHandler('re_password',text)}}
                    placeholder={'re-check password'}
                    />
                    <Pressable style={styles.button} onPress={() => {
                         console.log(data)
                         if(data.password !== data.re_password){
                              setValid(false);
                              console.log('불일치')
                         }else{
                              setValid(true)
                         }
                    }}> 
                    {/* 서버에 데이터 전송 */}
                    <Text style={styles.btnText}> 가입하기 </Text>
                    </Pressable>
               </SafeAreaView>
          )
     }

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
               <Pressable style={styles.button} onPress={() => {
                    console.log(data)
                    setCheck(true)
               }}> 
               {/* 서버에 데이터 전송 */}
               <Text style={styles.btnText}> 입력 </Text>
               </Pressable>
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