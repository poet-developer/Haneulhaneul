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

const ViewPic = ({info, exit, setDisplay, finDelete, currentMode}) => {
     const [me, setMe] = useContext(CheckAuth)
     const [created_at, setDate] = useState()

     const ConfirmDelete = () => {
          Alert.alert(
               "Are your sure?",
               "정말 삭제할까요?",
               [
                 {
                   text: "네",
                   onPress: async () => {
                    await axios
                         .post(SERVER+`/images/delete_process`, {id : info.id})
                         .then(Toastify('삭제완료!','teal'))
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
          setDate(info.created_at.split("T")[0]);
     },[])

     return(
          <View style ={styles.view}>
          <Image source = {{uri: SERVER+`/uploads/${info.key}`}} style={styles.view}/>
          <Text className='byUser' style={{
                 width: 200,
                 fontSize: 17, textAlign: 'right', fontFamily: 'title' , color: 'snow', backgroundColor: 'rgba(50,50,50,0.9)', position: 'absolute', bottom:0,
              marginBottom: 180, marginRight: 3,}}>
               {`날씨 | ${info.weather}${'\n'}Photo by.${info.author}${'\n'}${created_at}`}</Text> 
          <Pressable style={styles.btn} onPress={exit} color = {'snow'}>
          <Fontisto name="close-a" size={20} color="white"/></Pressable>
          {info.author === me.nick
          ? <TouchableOpacity style={{...styles.btn, top: 50}} onPress={ConfirmDelete} color = {'snow'}>
          <AntDesign name="delete" size={20} color="white"/></TouchableOpacity>
          : ''} 
          {info.author === me.nick 
          ? <ShareButton finDelete={finDelete} info = {info} currentMode={currentMode}/>
          : '' }
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