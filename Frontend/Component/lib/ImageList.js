import axios from "axios";
import React,{ useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, ActivityIndicator} from "react-native";
import ViewPic from "../UI/ViewPic";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ImageList = ({page, viewMode, setMode}) => {
     const [images, setImages] = useState([]);
     const [preview, setPreview] = useState(false);
     const [targetKey, setTargetKey] = useState('');
     const [targetId, setTargetId] = useState('')
     let imageList;
     useEffect(()=>{
       setTimeout(() => {
        axios
        //TODO: .env 처리
          .get("http://192.168.0.26:5000/images/readImages")
          .then(res => {
            setImages(res.data.reverse()); //Latest Order
          })
          .catch(console.log)
       }, 1000);
     },[])
     if(images.length){
      imageList = images.map(item => {
      return <TouchableOpacity onPress={()=>{
        setTargetKey(item.key);
        setTargetId(item._id)
        setPreview(true);
      }} key ={images.indexOf(item)}><Image style={styles.square} source ={{uri : `http://192.168.0.26:5000/uploads/${item.key}`}}/></TouchableOpacity>
      }) 
     }else{
      imageList = <View style ={styles.emptyData}><ActivityIndicator size="large" color="white"/><Text style={styles.text}>{page === 'second' ? '당신의 하늘을 채워주세요:)' : '다른 사람들의 하늘을 감상하세요!'}</Text></View>
    }

    if(preview){
      return <ViewPic keyId = {targetKey} id = {targetId} exit = {()=>{
      setPreview(false);
      setMode('album')
      }} 
      finDelete = {()=>{
        setPreview(false);
        setMode('home')
        }} 
      viewMode ={viewMode}
      share = {()=>{
       setMode('people')
     }}
    />
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
     marginTop: 20,
   }
})