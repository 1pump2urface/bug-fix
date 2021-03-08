import React from "react"
import{Text , View , TouchableOpacity, StyleSheet, TextInput, Image} from "react-native"
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from "expo-permissions"
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null ,
            scanned: false ,
            scannedData: "",
            buttonState: "normal",
            scanbookid: "",
            scanstudentid:"",


        }
    }
     getCameraPermission = async (id)=>{
         const {status}= await Permissions.askAsync(Permissions.CAMERA)
         this.setState({
             hasCameraPermissions:status == "granted", scanned:false, buttonState: id
         })
     }
     handleBarcodeScanner = async({type,data}) =>{
         this.setState({scanned:true , scannedData:data , buttonState: "normal"})
     }
     
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState !== "normal" && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanner}
                style = {StyleSheet.absoluteFillObject}/>
            ) 
        }
        else if (buttonState === "normal"){

       

        return (
            <View style = {styles.container}>
                <View>
                    <Image source = {require ("../assets/booklogo.jpg")}
                    style = {{width:200,height:200}}/>
                    <Text style = {{textAlign:"center",fontSize:30}}>
                        WiLib
                    </Text>

                </View>
                <View style = {styles.inputView}>
                    <TextInput style = {styles.inputBox}
                    placeholder = "bookid"
                    value = {this.state.scanbookid}
                    />
                    <TouchableOpacity style = {styles.scanButton}
                    onPress = {()=>{this.getCameraPermission("bookid")}}
                    >
                        <Text style = {styles.buttonText}>

                        </Text>

                    </TouchableOpacity>
                </View>

                <View style = {styles.inputView}>
                    <TextInput style = {styles.inputBox}
                    placeholder = "studentid"
                    value = {this.state.scanstudentid}
                    />
                    <TouchableOpacity style = {styles.scanButton}
                     onPress = {()=>{this.getCameraPermission("studentid")}}
                    >
                        <Text style = {styles.buttonText}>

                        </Text>

                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress = {this.getCameraPermission}>
                    <Text>scan QR code</Text>
                    </TouchableOpacity>
                    </View>
               
        )
    }
 }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });
