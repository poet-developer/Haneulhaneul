import {useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckAuth } from '../lib/CheckAuth'

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

const mode = ['home', 'album', 'people']

const Footer = ({ chaingingMode, display}) => {
     const [me, setMe] = useContext(CheckAuth)

     const ChangeMode = (mode) => {
          chaingingMode(mode);
     }

     return(
          <View style={{...styles.footer, display: display}}>
               <View style={styles.container}>
                    <View style={styles.sliderBar}>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(mode[0])
                         }}>
                         <View style={styles.sliderBtn}>
                              <Ionicons name="home-sharp" size={24} color="snow"/>
                              <Text style={styles.circle}>●</Text>
                         </View>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(mode[1])
                         }}>
                         <View style={styles.sliderBtn}>
                              <Ionicons name="albums" size={24} color="snow" />
                              <Text style={styles.circle}>●</Text>
                         </View></TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                              ChangeMode(mode[2])
                         }}>
                         <View style={styles.sliderBtn}>
                              <Ionicons name="ios-people" size={24} color="snow" />
                              <Text style={styles.circle}>●</Text>
                         </View></TouchableOpacity>
                    </View>
               </View>
          </View>
     )

}


export default Footer