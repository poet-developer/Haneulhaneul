import axios from "axios";
import React,{ useState, useEffect, useContext } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import {SERVER} from "@env"
import { CheckAuth } from "../lib/CheckAuth";
import ShareButton from "./ShareButton";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ViewPic = ({info, exit, setDisplay, share, finDelete, currentMode}) => {
     const [me, setMe] = useContext(CheckAuth)

     const ConfirmDelete = () => {
          Alert.alert(
               "Are your sure?",
               "정말 삭제할까요?",
               [
                 {
                   text: "네",
                   onPress: async () => {
                    await axios
                         .post(`${SERVER}/images/delete_process`, {id : info.id})
                         .then(alert('삭제완료'))
                         .then(finDelete)
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
          setDisplay(false)
          console.log(currentMode)
     },[])

     return(
          <View style ={styles.view}>
          <Image source = {{uri: `${SERVER}/uploads/${info.key}`}} style={styles.view}/>
          <Pressable style={styles.btn} onPress={exit} color = {'snow'}>
          <Fontisto name="close-a" size={20} color="white"/></Pressable>
          {info.author === me.nick
          ? <TouchableOpacity style={styles.btn} onPress={ConfirmDelete} color = {'snow'}>
          <AntDesign name="delete" size={20} color="white"/></TouchableOpacity>
          : ''} 
          {info.author === me.nick 
          ? <ShareButton currentMode={currentMode}/>
          : '' }
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
     }
})

//TODO: BackHandler 공부