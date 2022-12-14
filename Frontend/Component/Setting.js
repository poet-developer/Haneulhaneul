import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text, Alert} from 'react-native';
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

     const DeleteHandler = () => {
               Alert.alert(
                    "Are your sure?",
                    "정말 떠나실건가요??",
                    [
                      {
                        text: "네",
                        onPress: async () => {
                         await axios.patch(`${SERVER}/users/delete_process`,{id : me.name}).then(res => {alert("Deleted!")}).then(setMe()).catch(console.log)
                         setDisplay(true)
                         setMode('home')
                    // TODO: AWS cloud 사용
                        },
                      },
                      {
                        text: "다음에요",
                      },
                    ]
                  );
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
                    <View style={styles.infoContainer}>
                     <Text style={styles.infoText}>내 닉네임 | {me.nick || ''}</Text>
                     <Text style={styles.infoText}>내 아이디 | {me.name || ''}</Text>
                    </View>
                    <TouchableOpacity onPress={LogoutHandler} style={styles.logBtn}>
                    <Text style={styles.btnText}>로그아웃</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={DeleteHandler}
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
          fontFamily: 'main',
     },

     infoContainer : {
               marginBottom: 90, 
               borderWidth: 3,
               width: SCREEN_WIDTH/1.2,
               borderRadius: 20,
               borderColor: 'gold',
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