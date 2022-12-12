import axios from "axios";
import React,{ useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, Pressable } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ViewPic = ({id, exit, viewMode}) => {

     useEffect(()=>{
          viewMode();
     },[])

     return(
          <View style ={styles.view}>
          <Image source = {{uri: `http://192.168.0.26:5000/uploads/${id}`}} style={styles.view}/>
          <Pressable style={styles.btn} onPress={exit} color = {'snow'}>
          <Fontisto name="close-a" size={20} color="white" />
          </Pressable>
          <Pressable style={styles.earth} onPress={exit} color = {'snow'}>
          <MaterialCommunityIcons name="earth-arrow-right" size={30} color="white" /></Pressable>
          {/* </View> */}
          </View>
     )
}
// FIXME: 닫기창, 세이브포토, 하늘나누기 기능 , footer camera btn 제거
// 하늘 나누기 : aws CRUD
export default ViewPic

const styles =  StyleSheet.create({
     view : {
          position: 'absolute',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent:'flex-start', 
          alignItems: 'flex-end',
          // flex: 1,
     },

     btn : {
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          marginTop: 20
     },

     earth : {
          marginRight: 25,
          marginTop: 20,
     }
})