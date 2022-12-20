import axios from "axios";
import React,{ useState, useEffect, useContext } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, ActivityIndicator} from "react-native";
import ViewPic from "../UI/ViewPic";
import {SERVER} from '@env';
import { CheckAuth } from "./CheckAuth";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
/**
 *  공유하기로 한 모든 user의 모든 이미지를 가져오는 기능
 *  그와중에 로그인한 유저의 공유 게시물은 노란 테두리로 표시된다.
 */
const ALLImageList = ({page, setDisplay, setMode, currentMode}) => {
     const [images, setImages] = useState([]); 
     const [preview, setPreview] = useState(false)
     const [targetData, setTargetData] = useState();
     const [me, setMe] = useContext(CheckAuth); //로그인확인
     let imageList;

     useEffect(()=>{
        axios
          .get(`${SERVER}/images/readImages`)
          .then(res => {
            setImages(res.data.reverse()); //Latest Order
          })
          .catch(console.log)
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
              }) // 클릭한 사진에 대한 정보를 State에 저장
              setPreview(true); // 사진 보기 모드를 켠다.
            }} key ={images.indexOf(item)}>
              {me 
              ? <Image style={item.author !== me.nick ? styles.square: styles.strokeSqure} source ={{uri : `${SERVER}/uploads/${item.key}`}}/> //노란색 테두리 내 컨텐츠
              : <Image style={styles.square} source ={{uri : `${SERVER}/uploads/${item.key}`}}/> // 다른 유저의 컨텐츠
              }
              </TouchableOpacity>
        })
        }
     }else{
      imageList = <View style ={styles.emptyData}><ActivityIndicator size="large" color="#8bd5d0"/><Text style={styles.text}>{page === 'second' ? '당신의 하늘을 채워주세요:)' : '다른 사람들의 하늘을 감상하세요!'}</Text></View> // 데이터 출력전 로딩화면
    }

    if(preview){
      return <ViewPic info = {targetData} exit = {()=>{
        setPreview(false);
        setDisplay(true)
        setMode('people')
        }}  // 사진 보기를 끝내고 나서 보여주는 화면 thirdPage
      finDelete = {()=>{
        setPreview(false);
        setMode('people')
        setDisplay(true);
        }} // 사진을 삭제하고 나서 보여주는 화면 설정 thirdPage
      setDisplay ={setDisplay} // event displayHandler App.js
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