import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RectangleButton from '../../components/buttons/RectangleButton';
import {SCREEN_SIGN} from '../../../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {
  verifyOtp,
  requestOtp,
} from '../../redux';
import TextButton from '../../components/buttons/TextButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VerifyOtp: React.FC = (props: any) => {
  const {navigation} = props;
  const {phone_number} = props.route.params;
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [wrongOtp, setWrongOtp] = useState(false);
  const [codeFilled, setCodeFilled] = useState(false);
  const dispatch = useDispatch();
  const otpConfirmation = useSelector(
    (state: RootState) => state.authentication.otpConfirmation,
  );
  const isOtpValid = useSelector(
    (state: RootState) => state.authentication.isOtpValid,
  );
  const verifyOtpFailureNote = useSelector(
    (state: RootState) => state.authentication.verifyOtpFailureNote,
  );

  const passcode1Ref = useRef();
  const passcode2Ref = useRef();
  const passcode3Ref = useRef();
  const passcode4Ref = useRef();
  const passcode5Ref = useRef();
  const passcode6Ref = useRef();

  useEffect(() => {
    handleOtpVerificationConplete();
  }, [isOtpValid]);

  useEffect(() => {
    handleWrongOtp();
  }, [verifyOtpFailureNote]);

  const handleOtpVerificationConplete = () => {
    if (isOtpValid === true) {
      navigation.navigate('Main screen');
    }
  };

  const handleWrongOtp = () => {
    if (verifyOtpFailureNote === 'wrong otp code') {
      setWrongOtp(true);
    }
  };

  const checkCodeFilled = otpCode => {
    let notFilled = otpCode.filter(item => item === '');

    if (notFilled.length === 0) {
      setCodeFilled(true);
    } else {
      setCodeFilled(false);
    }
  };

  const handleChange = (text: string, index: number) => {
    let newOtp = otp;
    newOtp[index] = text;
    setOtp(newOtp);
    checkCodeFilled(newOtp);
  };

  const handleVerifyOtp = async () => {
    // try {
    //   let res = await confirm.confirm(otp.join(''));
    //   console.log('res: ', res);

    //   navigation.navigate('Main screen');
    // } catch (error) {
    //   console.log('error: ', error);

    //   setWrongOtp(true);
    // }
    dispatch(verifyOtp({otp: otp.join(''), confirm: otpConfirmation}));
  };

  const handleResendOTP = (phoneNumber: string) => {
    dispatch(requestOtp(phoneNumber));
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ImageBackground
        source={SCREEN_SIGN}
        resizeMode="cover"
        style={styles.fullScreenContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.textWelcome}>{'Hey, chào mừng bạn đến với'}</Text>
          <Text style={styles.textTitle}>{'Pepsi Tết'}</Text>
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.textFunction}>{'Xác minh OTP'}</Text>
          <Text style={styles.textInstruction}>
            {wrongOtp
              ? 'Mã OTP không đúng, vui lòng nhập lại!'
              : 'Nhập mã OTP vừa được gửi đến điện thoại của bạn'}
          </Text>
          <KeyboardAwareScrollView>
            <View style={styles.otpContainer}>
              <TextInput
                ref={passcode1Ref}
                style={
                  wrongOtp
                    ? styles.passcodeContainerIncorrect
                    : styles.passcodeContainer
                }
                onChangeText={value => {
                  handleChange(value, 0);
                  if (value != '') passcode2Ref.current.focus();
                }}
                maxLength={1}
                keyboardType="number-pad"
              />
              <TextInput
                ref={passcode2Ref}
                style={
                  wrongOtp
                    ? styles.passcodeContainerIncorrect
                    : styles.passcodeContainer
                }
                onChangeText={value => {
                  handleChange(value, 1);
                  if (value != '') passcode3Ref.current.focus();
                }}
                maxLength={1}
                keyboardType="number-pad"
              />
              <TextInput
                ref={passcode3Ref}
                style={
                  wrongOtp
                    ? styles.passcodeContainerIncorrect
                    : styles.passcodeContainer
                }
                onChangeText={value => {
                  handleChange(value, 2);
                  if (value != '') passcode4Ref.current.focus();
                }}
                maxLength={1}
                keyboardType="number-pad"
              />
              <TextInput
                ref={passcode4Ref}
                style={
                  wrongOtp
                    ? styles.passcodeContainerIncorrect
                    : styles.passcodeContainer
                }
                onChangeText={value => {
                  handleChange(value, 3);
                  if (value != '') passcode5Ref.current.focus();
                }}
                maxLength={1}
                keyboardType="number-pad"
              />
              <TextInput
                ref={passcode5Ref}
                style={
                  wrongOtp
                    ? styles.passcodeContainerIncorrect
                    : styles.passcodeContainer
                }
                onChangeText={value => {
                  handleChange(value, 4);
                  if (value != '') passcode6Ref.current.focus();
                }}
                maxLength={1}
                keyboardType="number-pad"
              />
              <TextInput
                ref={passcode6Ref}
                style={
                  wrongOtp
                    ? styles.passcodeContainerIncorrect
                    : styles.passcodeContainer
                }
                onChangeText={value => handleChange(value, 5)}
                maxLength={1}
                keyboardType="number-pad"
              />
            </View>
            <View style={{marginTop: windowHeight * 0.035}}>
              <RectangleButton
                title={'Xác nhận'}
                onPress={handleVerifyOtp}
                disabled={!codeFilled}
              />
            </View>
            <View style={styles.viewResendOTP}>
              <Text style={styles.textResendOTP}>
                {'Bạn chưa nhận được mã? '}
              </Text>
              <TextButton
                title={'Gửi lại mã'}
                titleStyle={styles.textButtonResendOTP}
                onPress={() => handleResendOTP(phone_number)}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    // backgroundColor: '#035efc',
    borderRadius: 20,
    flexDirection: 'column',
  },
  greetingContainer: {
    flex: 25,
    // backgroundColor: '#035efc',
    paddingTop: windowHeight * 0.1,
    alignItems: 'center',
  },
  functionContainer: {
    flex: 75,
    // backgroundColor: '#035efc',
    paddingHorizontal: windowWidth * 0.05,
  },
  textWelcome: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  otpContainer: {
    flexDirection: 'row',
    alignContent: 'stretch',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.05,
  },
  passcodeContainer: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.05,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },
  passcodeContainerIncorrect: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.05,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },
  textTitle: {
    fontSize: 40,
    fontWeight: '400',
    color: 'white',
  },
  textFunction: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  textInstruction: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
    alignSelf: 'center',
  },
  textOr: {
    color: 'white',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  buttonActive: {
    width: '70%',
    height: windowHeight * 0.035,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: windowHeight * 0.05,
  },
  titleButton: {
    color: '#0063A7',
    fontSize: 25,
    alignSelf: 'center',
  },
  viewResendOTP: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textResendOTP: {
    fontSize: 16,
    color: 'white',
  },
  textButtonResendOTP: {
    fontSize: 16,
    color: 'yellow',
  },
});

export default VerifyOtp;
