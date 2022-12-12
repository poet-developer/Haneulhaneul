import axios from "axios";
import React,{ useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity} from "react-native";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ImageList = () => {
     const [images, setImages] = useState([]);
     // try {
         axios
         //TODO: .env 처리
           .get("http://192.168.174.253:5000/readImages")
           .then(res => {
             setImages(res.data);
           })
           .catch(console.log)
     // } catch (err) {
     //   throw new Error(err);
     // }
    const imageList = images.map(item => {
     return <TouchableOpacity onPress={()=>{
      console.log(item.key) 
     }} key ={images.indexOf(item)}><Image style={styles.square} source ={{uri : `http://192.168.174.253:5000/uploads/${item.key}`}}/></TouchableOpacity>
    })

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
})