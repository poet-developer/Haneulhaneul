import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { shareAsync } from 'expo-sharing';
import axios from 'axios';
import { Buffer } from "buffer";

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const CameraView = () => {
     const [cameraOk, setCameraOk] = useState();
     const [libraryOk, setLibraryOk] = useState();
     const [photo, setPhoto] = useState();
     let cameraRef = useRef();
     
     useEffect(()=>{
      GetCamera();
     },[])

     const GetCamera = async() =>{
          const { status : cameraState } = await Camera.requestCameraPermissionsAsync();
          const { status : libraryState } = await MediaLibrary.requestPermissionsAsync();
          setCameraOk(cameraState === 'granted');
          setLibraryOk(libraryState === 'granted')
          if(!cameraState) alert('Please Allow to use Your Camera.');
          if(!libraryState) alert('Please Allow to use Your Library.');
        }
      
        const takePic = async () => {
          let options = {
            quality : 1,
            base64 : true,
            exif: false
          };
           let newPhoto = await cameraRef.current.takePictureAsync(options)
           setPhoto(newPhoto);
        }
      
        if(photo){
          let sharePic = () => {
            shareAsync(photo.uri).then(()=>{
              setPhoto(undefined)
            });
          }
      
          let savePhoto = async () => {
            const formData = new FormData();
            let bf = Buffer.from(photo.base64,"base64")
            formData.append('image',bf)
            await axios
            .post("http://192.168.0.26:5000/create_process", formData, {headers: { "Content-Type": "multipart/form-data"}}).then(setPhoto(undefined))
            alert('저장완료')
            // MediaLibrary.saveToLibraryAsync(photo.uri).then(()=>{
            //   alert('저장완료')
            //   // 서버로 보내기(Create)
            //   setPhoto(undefined);
            // })
          }
      
          return (
            <SafeAreaView>
              <Image style ={styles.preview} source={{url: `data:image/jpg;base64,${photo.base64}`}}/>
              <Button title = "Share" onPress={sharePic}/>
              <Button title = "Save" onPress={savePhoto}/>
              <Button title = "Cancel" onPress={() => {
                setPhoto(undefined)
              }}/>
            </SafeAreaView>
          )
        }
     
     return(
          <Camera
            style={{flex: 1,width:"100%"}}
            ref ={cameraRef}
          >
            <View style={styles.container}>
              <Button style={styles.buttonContainer} title="Take Pic" onPress={takePic}/>
            </View>
          </Camera>
     )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems : 'center',
    justifyContent : 'center',
    width : SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  buttonContainer : {
    backgroundColor : 'black',
    alignSelf : 'flex-end'
  },

  preview : {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
})

export default CameraView