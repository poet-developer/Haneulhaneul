import axios from "axios";
import React,{ useState, useEffect, useContext } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {SERVER} from "@env"
import { CheckAuth } from "../lib/CheckAuth";
import ShareButton from "./ShareButton";
import Toastify from "../lib/Toastify";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

/**
 * ViewPic Comp(선택한 이미지 보기)가 활성화 될 때, 보이는 화면 UI 
 * 로그인 여부를 확인하여 user가 일치하면 삭제버튼과 공유활성/취소 버튼이 뜬다.
 * 
 */
const ViewPic = ({info, exit, setDisplay, finDelete, currentMode}) => {
     const [me, setMe] = useContext(CheckAuth)
     const [created_at, setDate] = useState()

     const ConfirmDelete = () => { // 데이터 삭제 확인
          Alert.alert(
               "Are your sure?",
               "정말 삭제할까요?",
               [
                 {
                   text: "네",
                   onPress: async () => {
                    await axios
                         .post(`${SERVER}/images/delete_process`, {id : info.id})
                         .then(Toastify('삭제완료!','teal'))
                         .then(finDelete)
                         .catch(console.log)
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
          setDate(info.created_at.split("T")[0]);
     },[])

     return(
          <View style ={styles.view}>
               <Image source = {{uri:`${SERVER}/uploads/${info.key}`}} style={styles.view}/> 
               {/* 서버에서 불러온 이미지  */}
               <Text className='byUser' style={{
                 width: 200,
                 fontSize: 17, textAlign: 'right', fontFamily: 'title' , color: 'snow', backgroundColor: 'rgba(50,50,50,0.9)', position: 'absolute', bottom:0,
              marginBottom: 180, marginRight: 3,}}>
               {`날씨 | ${info.weather}${'\n'}Photo by.${info.author}${'\n'}${created_at}`}</Text> 
               {/* 서버에서 불러온 이미지의 날씨 및 날짜, 생성한 user 정보  */}
               <Pressable style={styles.btn} onPress={exit} color = {'snow'}>
               <Fontisto name="close-a" size={20} color="white"/></Pressable>
               {/* 이미지 보기 모드 취소, 뒤로 돌아가기 */}
               {info.author === me.nick
                    ? <TouchableOpacity style={{...styles.btn, top: 50}} onPress={ConfirmDelete} color = {'snow'}>
                    <AntDesign name="delete" size={20} color="white"/></TouchableOpacity>
               : ''} 
               {/* 로그인 여부 확인 후, 이미지 삭제 아이콘 */}
               {info.author === me.nick 
                    ? <ShareButton finDelete={finDelete} info = {info} currentMode={currentMode}/>
               : '' }
               {/* 로그인 여부 확인 후, 공유 아이콘 */}
          </View>
     )
}
// 하늘 나누기 : aws CRUD
export default ViewPic

const styles =  StyleSheet.create({
     view : {
          position: 'relative',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent:'flex-start', 
          alignItems: 'flex-end',
     },

     btn : {
          position: 'absolute',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          marginTop: 20
     },
     
})