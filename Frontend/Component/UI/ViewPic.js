import axios from "axios";
import React,{ useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ViewPic = ({keyId, id, exit, viewMode, share, finDelete}) => {

     const modal = () => {
          Alert.alert(
               "Are your sure?",
               "다른 사람들과 하늘을 공유할까요?",
               [
                 {
                   text: "네",
                   onPress: () => {
                    share(); 
               // TODO: AWS cloud 사용
                   },
                 },
                 {
                   text: "다음에요",
                 },
               ]
             );
     }

     const ConfirmDelete = () => {
          Alert.alert(
               "Are your sure?",
               "정말 삭제할까요?",
               [
                 {
                   text: "네",
                   onPress: () => {
                    axios
                         .post("http://192.168.0.26:5000/delete_process", {id})
                         .then(alert('삭제완료')
                         ).then(finDelete)
                         .catch(console.log)
               // TODO: AWS cloud 사용
                   },
                 },
                 {
                   text: "다음에요",
                 },
               ]
             );
     }


     useEffect(()=>{
          viewMode();
     },[])

     return(
          <View style ={styles.view}>
          <Image source = {{uri: `http://192.168.0.26:5000/uploads/${keyId}`}} style={styles.view}/>
          <Pressable style={styles.btn} onPress={exit} color = {'snow'}>
          <Fontisto name="close-a" size={20} color="white" /></Pressable>
          <Pressable style={styles.btn} onPress={ConfirmDelete} color = {'snow'}>
          <AntDesign name="delete" size={20} color="white" /></Pressable>
          <Pressable style={styles.earth} onPress={modal} color = {'snow'}>
          <MaterialCommunityIcons name="earth-arrow-right" size={45} color="tomato" /></Pressable>
          </View>
     )
}
// FIXME: 하늘나누기 기능 , footer camera btn 제거
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
          position:'absolute',
          marginTop: 20,
          right: 0, bottom: 0, zIndex: 5, backgroundColor:'white',
          width: 55, height: 55, 
          borderRadius: 20,
          overflow: 'hidden', 
          margin: 10,
          justifyContent: 'center',
          alignItems : 'center',
     }
})