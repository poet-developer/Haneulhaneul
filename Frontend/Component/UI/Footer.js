import { useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * 고정적으로 user에게 띄우는 화면 footer
 * 사용자가 세가지 화면을 이동할때마다 footer에 있는 아이콘은 opacity가 활성화된다.
 */

const Footer = ({ chaingingMode, display, mode}) => {
     const [on, setOn] = useState(false) // 아이콘 활성화 상태 확인
     const modeText = ['home', 'album', 'people'] // First, Second, Third Page Mode
     const ChangeMode = (mode) => {
          chaingingMode(mode);
     }

     useEffect(()=>{
          modeText.forEach((item)=>{if(item === mode) setOn(modeText.indexOf(item))})
     },[mode]) 

     return(
          <View style={{...styles.footer, display: display}}>
               <View style={styles.container}>
                    <View style={styles.sliderBar}>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(modeText[0])
                         }} style={on === 0 ? {opacity:1} : {opacity:0.5}}> 
                         {/* 상태가 켜지면 opacity가 1이 될것  */}
                         <View style={styles.sliderBtn}>
                              <Ionicons name="home-sharp" size={24} color="snow"/>
                         </View> 
                         {/* Home Icon - FirstPage.js */}
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(modeText[1])
                         }} style={on === 1 ? {opacity:1} : {opacity:0.5}}>
                         {/* 상태가 켜지면 opacity가 1이 될것  */}
                         <View style={styles.sliderBtn}>
                              <Ionicons name="albums" size={24} color="snow" />
                         </View>
                         {/* Album Icon - SencondPage.js */}
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(modeText[2])
                         }} style={on === 2 ? {opacity:1} : {opacity:0.5}}>
                         {/* 상태가 켜지면 opacity가 1이 될것  */}
                         <View style={styles.sliderBtn}>
                              <Ionicons name="ios-people" size={24} color="snow" />
                         </View>
                         {/* People Icon - ThirdPage.js */}
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     )

}

const styles = StyleSheet.create({
     footer : {
          flex: 0.8,
          backgroundColor : 'teal',
     },

     container : {
          flex: 1,
     },

     sliderBar : {
          flexDirection: 'row',
          marginTop : 13,
          justifyContent: 'space-around',
          alignItems : 'center',
          flex: 1,
     }, 
     
     sliderBtn :{
          width: 80,
          alignItems: 'center',
          marginTop : -10,
     },

     circle : {
          fontSize: 7, 
          color: 'snow',  
          marginTop: 3,
     }
})



export default Footer