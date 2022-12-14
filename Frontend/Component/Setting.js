import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckAuth } from './lib/CheckAuth';
import axios from 'axios';
import {SERVER} from '@env';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

 const Setting = ({setDisplay, setMode}) => {
      const [me, setMe] = useContext(CheckAuth)

     useEffect(()=>{
          setDisplay(false);
     },[setMe])

     const LogoutHandler = async() =>{
          try{
               await axios.patch(`${SERVER}/users/logout`,{} //req.body자리
               ,{headers : {sessionid : me.sessionId}}).then(alert("Logout!")).then(setMe())
               setDisplay(true)
               setMode('home')
          }catch(err){
               console.log(err);
               alert(err.message);
          }
     }

     const DeleteHandler = async() => {
          try{
               console.log(me.name)
               // await axios.patch(`${SERVER}/users/delete_process`,{id : me.id}).then(alert("Deleted!")).then(setMe())
               // setDisplay(true)
               // setMode('home')
          }catch(err){
               console.log(err);
               alert(err.message);
          }
     }
     
      return(
           <View style={styles.container}>
                
                <TouchableOpacity onPress={()=>{
                         setDisplay(true)
                         setMode('home')
                    }} style={{position:'absolute', top: 30, left: 10,}}>
                    <Ionicons name="chevron-back" size={40} color="snow" /></TouchableOpacity>
                    {me?
                    <>
                    <View style={{flex:1, paddingTop: 100}}>
                     <Text style={{fontSize:20, color: 'teal', marginBottom: 20}}>회원 닉네임 : {me.nick || ''}</Text>
                     <Text style={{fontSize:20, color: 'teal', marginBottom: 20}}>회원 아이디 : {me.name || ''}</Text>
                    </View>
                    <TouchableOpacity onPress={LogoutHandler} style={styles.logBtn}>
                    <Text style={styles.btnText}>로그아웃</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                         DeleteHandler()
                         setMode('home')
                         setMe()
                         alert('계정이 삭제 되었습니다.')
                         //TODO: Use Alert Comp 
                    }}
                    style={styles.logBtn}>
                    <Text style={styles.btnText}>계정삭제</Text> 
                    </TouchableOpacity>
                    </>
                    :
                    <>
                    <TouchableOpacity onPress={()=>{
                         setMode('login')
                    }}
                    style={styles.logBtn}>
                    <Text style={styles.btnText}>로그인</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                         setMode('signup')
                         console.log('signup')
                    }}
                    style={styles.logBtn}>
                    <Text style={styles.btnText}>회원가입</Text> 
                    </TouchableOpacity>
                    </>
                    }
          </View>
     )
}
export default Setting

const styles = StyleSheet.create({
     container:{
          flex: 1,
          alignItems : 'center',
          justifyContent : 'flex-end',
          backgroundColor : 'pink',
          width : SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          
        },

     logBtn : {
          width: SCREEN_WIDTH/1.5,
          height: 50,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems : 'center',
          backgroundColor: 'teal',
          color: 'snow',
          marginBottom: 100,
     },

     btnText : {
          color: 'snow',
          fontSize: 20,
     }
})