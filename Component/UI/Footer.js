import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
     footer : {
          flex: 0.8,
          backgroundColor : 'tomato',
     },

     container : {
          flex: 1,
     },

     sliderBtn : {
          flexDirection: 'row',
          marginTop : 13,
          justifyContent: 'space-around',
          alignItems : 'center',
     },     
})

const Footer = () => {
     return(
          <View style={styles.footer}>
               <View style={styles.container}>
                    <View style={styles.sliderBtn}>
                         <Ionicons name="home-sharp" size={24} color="snow"/>

                         <Ionicons name="albums" size={24} color="snow" />

                         <Ionicons name="musical-notes" size={24} color="snow" />
                    </View>
                    <View style={{...styles.sliderBtn, marginTop: 4}}>
                         <Text style={{fontSize: 7, color: 'snow'}}>●</Text>
                         <Text style={{fontSize: 7}}>●</Text>
                         <Text style={{fontSize: 7}}>●</Text>
                    </View>
               </View>
          </View>
     )

}


export default Footer