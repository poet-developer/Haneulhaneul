import React,{ useEffect, useContext} from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {SERVER} from "@env"
import Toastify from "../lib/Toastify";
import { Ionicons } from '@expo/vector-icons';
import { CheckAuth } from "../lib/CheckAuth";

const CarmeraBtn = ({display ,setMode}) => {
     const [me, setMe] = useContext(CheckAuth)

     const OnCameraMode = async() => {
          if(me) setMode('camera')
          else Toastify("로그인이 필요해요.",'red')
        }

     useEffect(()=>{
     },[setMode])

     return(
          <TouchableOpacity style={{...styles.carmeraBtn, display: display }} onPress={OnCameraMode}>
          <Ionicons name="md-camera" size={50} color="teal" /></TouchableOpacity>
     )
}

export default CarmeraBtn

const styles =  StyleSheet.create({
     carmeraBtn : {
          position:'absolute', right: 0, bottom: 60, zIndex: 5, backgroundColor:'white',
            width: 55, height: 55, 
            borderRadius: 20,
            overflow: 'hidden', 
            paddingLeft: 3,
            margin: 10,
        }
})

