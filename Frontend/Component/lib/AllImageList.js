import axios from "axios";
import React,{ useState, useEffect, useContext } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, ActivityIndicator} from "react-native";
import ViewPic from "../UI/ViewPic";
import {SERVER} from '@env';
import { CheckAuth } from "./CheckAuth";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ALLImageList = ({page, setDisplay, setMode, currentMode}) => {
     const [images, setImages] = useState([]);
     const [preview, setPreview] = useState(false)
     const [targetData, setTargetData] = useState();
     const [me, setMe] = useContext(CheckAuth);
     let imageList;

     useEffect(()=>{
       setTimeout(() => {
        axios
          .get(`${SERVER}/images/readImages`)
          .then(res => {
            setImages(res.data.reverse()); //Latest Order
          })
          .catch(console.log)
       }, 800);
     },[preview])
     if(images.length){
       if(currentMode === 'people'){
        imageList = images.map(item => {
            return <TouchableOpacity style = {{position:'relative'}}onPress={()=>{
              setTargetData({
                id : item._id,
                key : item.key,
                author : item.author,
                public : item.public,
                created_at : item.createdAt,
                weather : item.weather,
              })
              setPreview(true);
            }} key ={images.indexOf(item)}>
              {me 
              ? <Image style={item.author !== me.nick ? styles.square: styles.strokeSqure} source ={{uri : `${SERVER}/uploads/${item.key}`}}/>
              : <Image style={styles.square} source ={{uri : `${SERVER}/uploads/${item.key}`}}/>
              }
              </TouchableOpacity>
        })
        }
     }else{
      imageList = <View style ={styles.emptyData}><ActivityIndicator size="large" color="#8bd5d0"/><Text style={styles.text}>{page === 'second' ? '당신의 하늘을 채워주세요:)' : '다른 사람들의 하늘을 감상하세요!'}</Text></View>
    }

    if(preview){
      return <ViewPic info = {targetData} exit = {()=>{
        setPreview(false);
        setDisplay(true)
        setMode('people')
        }} 
      finDelete = {()=>{
        setPreview(false);
        setMode('people')
        setDisplay(true);
        }} 
      setDisplay ={setDisplay}
      currentMode = {currentMode}
    />
    }
    return imageList
   }; //Read

   export default ALLImageList

   const styles = StyleSheet.create({
    square : {
     height: SCREEN_WIDTH/2 -2,
     width: SCREEN_WIDTH/2 -2,
     borderRadius : 10,
     margin: 1,
   },

   strokeSqure : {
    height: SCREEN_WIDTH/2 -2,
    width: SCREEN_WIDTH/2 -2,
    borderRadius : 10,
    margin: 1,
    borderWidth : 4,
    borderColor: 'gold',
   },

   emptyData : {
    position: 'absolute', top:0, left:0, height: SCREEN_HEIGHT, width: SCREEN_WIDTH,justifyContent:'center', alignItems: 'center', 
    backgroundColor: 'teal'
   },

   text: {
     color: 'snow',
     fontSize: 24,
     marginTop: 20,
     fontFamily: 'main'
   }
})