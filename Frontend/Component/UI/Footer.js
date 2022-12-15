import {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckAuth } from '../lib/CheckAuth'


const Footer = ({ chaingingMode, display, mode}) => {
     const [me, setMe] = useContext(CheckAuth)
     const [on, setOn] = useState(false)
     
     const modeText = ['home', 'album', 'people']
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
                         <View style={styles.sliderBtn}>
                              <Ionicons name="home-sharp" size={24} color="snow"/>
                         </View>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(modeText[1])
                         }} style={on === 1 ? {opacity:1} : {opacity:0.5}}>
                         <View style={styles.sliderBtn}>
                              <Ionicons name="albums" size={24} color="snow" />
                         </View></TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(modeText[2])
                         }} style={on === 2 ? {opacity:1} : {opacity:0.5}}>
                         <View style={styles.sliderBtn}>
                              <Ionicons name="ios-people" size={24} color="snow" />
                         </View></TouchableOpacity>
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