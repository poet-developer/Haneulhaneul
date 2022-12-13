import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckAuth } from './lib/CheckAuth';


const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

 
 const Setting = ({setDisplay, setMode, logined}) => {
      const [me, setMe] = useContext(CheckAuth)
     useEffect(()=>{
          setDisplay(false);
     },[])
     
      return(
           <View style={styles.container}>
                <TouchableOpacity onPress={()=>{
                         setDisplay(true)
                         setMode('home')
                    }} style={{position:'absolute', top: 30, left: 10,}}>
                    <Ionicons name="chevron-back" size={40} color="snow" /></TouchableOpacity>
                    {me ?
                    <TouchableOpacity onPress={()=>{
                         console.log('logout')
                    }} style={styles.logBtn}>
                    <Text style={styles.btnText}>로그아웃</Text> 
                    </TouchableOpacity>
                    
                    :
                    <>
                    <TouchableOpacity onPress={()=>{
                         setMode('signin')
                         console.log('login')
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