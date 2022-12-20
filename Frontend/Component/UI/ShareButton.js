import axios from "axios";
import React,{ useEffect} from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {SERVER} from "@env"
import Toastify from "../lib/Toastify";

/**
 * ViewPic Comp가 활성화 될 때, 보이는 공유 버튼
 * RestAPI가 해당 이미지 데이터가 public이 true일 때, 공유 취소 버튼이, => CancelShareModal :41
   public이 false일 때, 공유 승인 버튼이 뜨도록 설계. => ShreModal " 18"
 */

const ShareButton = ({finDelete, info}) => {
     useEffect(()=>{
     },[])

     const ShareModal = () => {
          Alert.alert(
               "Are your sure?",
               "다른 사람들과 하늘을 공유할까요?",
               [
                 {
                   text: "네",
                   onPress: () => {
                    axios
                    .patch(`${SERVER}/images/public_process`, {info}) 
                    .then(Toastify('공유 완료!','teal'))
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

     const CancelShareModal = () => {
          Alert.alert(
               "Are your sure?",
               "공유를 취소 할까요?",
               [
                 {
                   text: "네",
                   onPress: () => {
                     axios
                    .patch(`${SERVER}/images/public_process`, {info})
                    .then(Toastify('공유 취소!','teal'))
                    .then(finDelete)
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
