import axios from "axios";
import React,{ useState, useEffect, useContext } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, ActivityIndicator} from "react-native";
import ViewPic from "../UI/ViewPic";
import {SERVER} from '@env';
import { CheckAuth } from "./CheckAuth";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const MyImageList = ({page, setDisplay, setMode, currentMode}) => {
     const [myImages, setMyImages] = useState([]);
     const [preview, setPreview] = useState(false);
     const [targetData, setTargetData] = useState();
     const [me, setMe] = useContext(CheckAuth)
     let myImageList;

     useEffect(()=>{
       setTimeout(() => {
        axios
          .get(`${SERVER}/images/readMyImages`, {params : {author :me.nick}})
          .then(res => {
            setMyImages(res.data.reverse());
             //Latest Order
          })
          .catch(console.log)
       }, 1000);
     },[])
     if(myImages.length){
        myImageList = myImages.map(item => {
            return <TouchableOpacity onPress={()=>{
               setTargetData({
                    id : item._id,
                    key : item.key,
                    author : item.author,
                    public : item.public,
                    created_at : item.createdAt
                  })
              setPreview(true);
            }} key ={myImages.indexOf(item)}><Image style={styles.square} source ={{uri : `${SERVER}/uploads/${item.key}`}}/></TouchableOpacity>
        })
     }else{
      myImageList = <View style ={styles.emptyData}><ActivityIndicator size="large" color="white"/><Text style={styles.text}>{page === 'second' ? '당신의 하늘을 채워주세요:)' : '다른 사람들의 하늘을 감상하세요!'}</Text></View>
    }

    if(preview){
      return <ViewPic info = {targetData}
      exit = {()=>{ 
      setPreview(false);
      setDisplay(true)
      setMode('album')
      }} 
      finDelete = {()=>{
        setPreview(false);
        setMode('album')
        setDisplay(true);
        }} 
      setDisplay ={setDisplay}
      currentMode = {currentMode}
    />
    }
    return myImageList
   }; //Read

   export default MyImageList

   const styles = StyleSheet.create({
    square : {
     height: SCREEN_WIDTH/2 -2,
     width: SCREEN_WIDTH/2 -2,
     borderRadius : 10,
     margin: 1,
   },

   emptyData : {
    position: 'absolute', top:0, left:0, height: SCREEN_HEIGHT, width: SCREEN_WIDTH,justifyContent:'center', alignItems: 'center', 
    backgroundColor: 'teal'
   },

   text: {
     color: 'snow',
     fontSize: 20,
     marginTop: 20,
   }
})