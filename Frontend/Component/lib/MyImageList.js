import axios from "axios";
import React,{ useState, useEffect, useContext } from "react";
import { StyleSheet, Image, Dimensions, View , TouchableOpacity, Text, ActivityIndicator} from "react-native";
import ViewPic from "../UI/ViewPic";
import {SERVER} from '@env';
import { CheckAuth } from "./CheckAuth";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
/**
 *  공유여부 와 상관없이 로그인 한 유저가 촬영한 모든 하늘 사진 데이터를 가져오는 기능
 *  사진들을 누르면, 공유 여부를 결정하거나 데이터를 삭제 할 수 있다.
 */
const MyImageList = ({page, setDisplay, setMode, currentMode}) => {
     const [myImages, setMyImages] = useState([]);
     const [preview, setPreview] = useState(false);
     const [targetData, setTargetData] = useState();
     const [me, setMe] = useContext(CheckAuth)
     let myImageList;

     useEffect(()=>{
        axios
          .get(`${SERVER}/images/readMyImages`, {params : {author :me.nick}})
          .then(res => {
            setMyImages(res.data.reverse());
             //Latest Order
          })
          .catch(console.log)
     },[preview])

     if(myImages.length){
        myImageList = myImages.map(item => {
            return <TouchableOpacity onPress={()=>{
               setTargetData({
                    id : item._id,
                    key : item.key,
                    author : item.author,
                    public : item.public,
                    created_at : item.createdAt,
                    weather : item.weather,
                  })// 클릭한 사진에 대한 정보를 State에 저장
              setPreview(true); // 사진 보기 모드를 켠다.
            }} key ={myImages.indexOf(item)}><Image style={styles.square} source ={{uri : SERVER+`/uploads/${item.key}`}}/></TouchableOpacity>
        })
     }else{
      myImageList = <View style ={styles.emptyData}><ActivityIndicator size="large" color="#8bd5d0"/><Text style={styles.text}>{page === 'second' ? '당신의 하늘을 채워주세요:)' : '다른 사람들의 하늘을 감상하세요!'}</Text></View> // 데이터 출력전 로딩화면
    }

    if(preview){
      return <ViewPic 
        info = {targetData}
        exit = {()=>{ 
        setPreview(false);
        setDisplay(true)
        setMode('album')
      }} // 사진 보기를 끝내고 나서 보여주는 화면 SecondPage
      finDelete = {()=>{
        setPreview(false);
        setMode('album')
        setDisplay(true);
        }} // 사진을 삭제하고 나서 보여주는 화면 설정 SecondPage
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
     fontSize: 24,
     marginTop: 20,
     fontFamily: 'main'
   }
})