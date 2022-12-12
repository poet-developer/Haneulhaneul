import axios from "axios";
import React,{ useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, ActivityIndicator} from "react-native";
import ViewPic from "../UI/ViewPic";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ImageList = ({page, viewMode, setMode}) => {
     const [images, setImages] = useState([]);
     const [preview, setPreview] = useState(false);
     const [target, setTarget] = useState('');
     let imageList;
     useEffect(()=>{
       setTimeout(() => {
        axios
        //TODO: .env 처리
          .get("http://192.168.0.26:5000/readImages")
          .then(res => {
            setImages(res.data.reverse()); //Latest Order
          })
          .catch(console.log)
       }, 1000);
     },[])
     if(images.length){
      imageList = images.map(item => {
      return <TouchableOpacity onPress={()=>{
        setTarget(item.key);
        setPreview(true);
      }} key ={images.indexOf(item)}><Image style={styles.square} source ={{uri : `http://192.168.0.26:5000/uploads/${item.key}`}}/></TouchableOpacity>
      }) 
     }else{
      imageList = <View style ={styles.emptyData}><ActivityIndicator size="large" color="white"/><Text style={styles.text}>{page === 'second' ? '하늘을 채워주세요:)' : '다른 사람들의 하늘을 감상하세요.'}</Text></View>
    }

    if(preview){
      return <ViewPic id = {target} exit = {()=>{
      setPreview(false);
      setMode('album')
    }} viewMode ={viewMode}/>
    }
    return imageList
   }; //Read

   export default ImageList

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
   }
})