import React, {useState, useEffect, useRef} from 'react';
import { Button, View, Text , StyleSheet, KeyboardAvoidingView} from 'react-native';
//import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {TextInput,TouchableOpacity} from 'react-native';
//import {TextInput,TouchableOpacity} from 'react-native-gesture-handler';
//import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';


export function InputOTPScreen({ navigation }) {
    let textInput = useRef(null)
    let clockCall = null
    const lengthInput = 6;
    const defaultCountdown = 5;
    const [internalVal, setInternalVal] = useState("")
    const [countdown, setCountdown] = useState(defaultCountdown)
    const [enableResend, setEnableResend] = useState(false)

    useEffect(() =>{
        clockCall = setInterval(() => { 
            decrementClock();
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    })

    const decrementClock = () =>{
        if(countdown === 0){
            setEnableResend(true)
            setCountdown(0)
            clearInterval(clockCall)
        }else{
            setCountdown(countdown -1)
        }
      
    }

    const onChangeText = (val) => {
        setInternalVal(val)
        if(val.length === lengthInput){
            navigation.navigate('Home')
        }
    }

    const onResendOTP = () =>{
        if(enableResend){
            setCountdown(defaultCountdown)
            setEnableResend(false)
            clearInterval(clockCall)
            clockCall = setInterval(() =>{
                decrementClock()
            },1000)
        }
    }

    const onChangeNumber = () =>{
        setInternalVal("")
    }

    useEffect(() =>{ 
        textInput.focus() 
      },[])

    
    
    return (
      <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={styles.textTile}>{"Xác minh OTP"}</Text>
                    <View>
                        <TextInput
                            ref={(input) => textInput = input}
                            onChangeText={onChangeText}
                            style={{width:0, height: 0}}
                            value = {internalVal}
                            maxLength = {lengthInput}
                            returnKeyType = "done"
                            keyboardType = "numeric"
                        />
                        <View style={styles.containerInput }>
                            {
                                Array(lengthInput).fill().map((data,index)=>(
                                    <View 
                                    key={index}
                                    style={[styles.cellView, {
                                        borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DB7'
                                    }
                                    ]}>
                                        <Text style={styles.cellText}
                                        onPress = {() => textInput.focus()}
                                        >{internalVal && internalVal.length > 0 ? internalVal[index]:""}</Text>
                                    </View>
                                ))  
                            }
                            
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                            <TouchableOpacity onPress={onChangeNumber}>
                                <View style={styles.btnChangeNumber}>
                                    <Text style={styles.textChange}>Xác nhận</Text>
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={onResendOTP}>
                                <View style={styles.btnResendOTP}>
                                    <Text style={[
                                        styles.textResend,
                                        {
                                            color: enableResend ? '#234DB7' : 'gray'
                                        }
                                    ]}>Gửi lại mã OTP ({countdown})</Text>
                                </View>

                            </TouchableOpacity>
                    </View>
        
        
            </KeyboardAvoidingView>
        
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
      
      },
    containerAvoidingView: {
        flex: 1,
        alignItems: 'center',
        padding: 10
      },


    textTile:{
        marginTop:50,
        marginBottom:50,
        fontSize: 16
    },
    containerInput:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    cellView:{
        paddingVertical:11,
        width:40,
        margin:5,
        justifyContent:'center',
        alignItems: 'center',
        borderBottomWidth: 1.5
    },
    cellText:{
        textAlign: 'center',
        fontSize:16
    },
    bottomView:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50,
        alignItems: 'flex-end'
    },
    btnChangeNumber:{
        width:150,
        height:50,
        borderRadius:10, 
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textChange:{
        color: '#234DB7',  
        alignItems:'center',
        fontSize: 15
    },
    btnResendOTP:{
        width:150,
        height:50,
        borderRadius:10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textResend:{
        alignItems:'center',
        fontSize: 15
    }

  })
  