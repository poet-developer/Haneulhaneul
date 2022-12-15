import axios from "axios";
import React,{ useState, useEffect, useContext, useReducer } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import {SERVER} from "@env"
import { CheckAuth } from "../lib/CheckAuth";

const ShareButton = ({finDelete, info}) => {
     const [me, setMe] = useContext(CheckAuth)

     useEffect(()=>{
     },[])

     const ShareModal = () => {
          Alert.alert(
               "Are your sure?",
               "다른 사람들과 하늘을 공유할까요?",
               [
                 {
                   text: "네",
                   onPress: async() => {
                    await axios
                    .patch(`${SERVER}/images/public_process`, {info})
                    .then(alert('공유 완료!'))
                    .then(finDelete)
                    //Latest Order
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

     const CancelShareModal = () => {
          Alert.alert(
               "Are your sure?",
               "공유를 취소 할까요?",
               [
                 {
                   text: "네",
                   onPress: async() => {
                    await axios
                    .patch(`${SERVER}/images/public_process`, {info})
                    .then(alert('공유 취소!'))
                    .then(finDelete)
                    //Latest Order
                    .catch(console.log)}
                },
                 {
                   text: "다음에요",
                 },
               ]
             );
     }

     return(
          <>
          { info.public
           ? 
               <TouchableOpacity style={styles.earth} onPress={CancelShareModal} color = {'snow'}>
               <MaterialCommunityIcons name="web-cancel" size={45} color="tomato" />
               </TouchableOpacity>
          : 
               <TouchableOpacity style={styles.earth} onPress={ShareModal} color = {'snow'}><MaterialCommunityIcons name="earth-arrow-right" size={45} color="tomato" />
               </TouchableOpacity>
          }
          </>
     )
}

export default ShareButton

const styles =  StyleSheet.create({
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
