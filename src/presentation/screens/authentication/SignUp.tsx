import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputField from '../../../components/inputs/TextInputField';
import RectangleButton from '../../../components/buttons/rectangle-button';
import TextButton from '../../../components/buttons/text-button';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {BUTTON_WHITE, SCREEN_SIGN} from '../../../../../resource/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  requestOtp,
  signUp,
} from '../../../redux/actions/authentication.actions';
import {RootState} from '../../../redux/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signInSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Cần nhập số điện thoại!')
    .min(9, 'Số điện thoại có tối thiểu 9 số.')
    .max(12, 'Số điện thoại có tối đa 12 số.')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ!'),
  userName: Yup.string()
    .min(2, 'Tên phải có tối thiểu 2 kí tự')
    .max(100, 'Tên phải có tối đa 100 kí tự')
    .required('Cần nhập họ tên!'),
});

const SignUp: React.FC = (props: any) => {
  const {navigation} = props;
  const [termRead, setTermRead] = useState(false);
  const dispatch = useDispatch();
  const isSignUpSuccessful = useSelector(
    (state: RootState) => state.authentication.isSignUpSuccessful,
  );
  const otpConfirmation = useSelector(
    (state: RootState) => state.authentication.otpConfirmation,
  );

  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [fixedPhoneNumber, setFixedPhoneNumber] = useState('');

  useEffect(() => {
    let strings = inputPhoneNumber.split('');
    strings[0] = '+84';
    let result = strings.join('');
    setFixedPhoneNumber(result);
  }, [inputPhoneNumber]);

  useEffect(() => {
    if (isSignUpSuccessful === true) {
      handleSignUpSuccess();
    }
  }, [isSignUpSuccessful]);

  useEffect(() => {
    handleRequestOtpComplete();
  }, [otpConfirmation]);

  const isAllTrue = (isTermRead: boolean, formikValid: boolean) => {
    if (isTermRead === true || formikValid === true) {
      return true;
    }
    return false;
  };

  const handleSignUp = async (phoneNumber: string, userName: string) => {
    if (phoneNumber.charAt(0) === '0') {
      dispatch(signUp({name: userName, phone_number: phoneNumber}));
    } else {
      Alert.alert(
        'Số điện thoại không hợp lệ. Số điện thoại tại Việt Nam bắt đầu bằng số 0.',
      );
    }
  };

  const handleSignUpSuccess = async () => {
    dispatch(requestOtp(fixedPhoneNumber));

    // Default OTP 123456 from 0971721198
    // dispatch(requestOtp('+84971721198'));
  };

  const handleRequestOtpComplete = () => {
    if (otpConfirmation != null) {
      navigation.navigate('VerifyOTP', {phone_number: fixedPhoneNumber});
    }
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
          <Text style={styles.textFunction}>{'Đăng ký'}</Text>
          <Formik
            initialValues={{phoneNumber: '', userName: ''}}
            validationSchema={signInSchema}
            onSubmit={values => {
              handleSignUp(values.phoneNumber, values.userName);
            }}>
            {formik => (
              <KeyboardAwareScrollView>
                <TextInputField
                  errorLabel={formik.errors.phoneNumber}
                  placeholder="Nhập số điện thoại"
                  numKeyboard={true}
                  inputProps={{
                    value: formik.values.phoneNumber,
                    onChangeText: (value: string) => {
                      formik.setFieldValue('phoneNumber', value, true);
                      setInputPhoneNumber(value);
                    },
                  }}
                  isInputInValid={
                    formik.errors.phoneNumber === undefined ? false : true
                  }
                />
                <TextInputField
                  errorLabel={formik.errors.userName}
                  placeholder="Nhập họ tên"
                  inputProps={{
                    value: formik.values.userName,
                    onChangeText: (value: string) => {
                      formik.setFieldValue('userName', value, true);
                    },
                  }}
                  isInputInValid={
                    formik.errors.userName === undefined ? false : true
                  }
                />
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    style={styles.checkbox}
                    value={termRead}
                    onValueChange={() => setTermRead(!termRead)}
                    boxType={'square'}
                    onFillColor={'white'}
                    tintColor="white"
                  />
                  <View style={styles.viewCheckboxText}>
                    <Text style={styles.checkboxText}>
                      {'Tôi đã đọc và đồng ý với'}
                    </Text>
                    <TextButton
                      title=" thể lệ chương trình "
                      onPress={() => navigation.navigate('Term of Service')}
                    />
                    <Text style={styles.checkboxText}>{'Pepsi Tết'}</Text>
                  </View>
                </View>
                <RectangleButton
                  onPress={formik.submitForm}
                  title="Lấy mã OTP"
                  disabled={isAllTrue(!termRead, !formik.isValid)}
                />
                <Text style={styles.textOr}>{'Hoặc'}</Text>
                <RectangleButton
                  title="Đăng nhập"
                  titleStyle={styles.titleSignUp}
                  // activeStyle={styles.buttonSignUp}
                  onPress={() => navigation.navigate('Sign in')}
                  backgroundImage={BUTTON_WHITE}
                />
              </KeyboardAwareScrollView>
            )}
          </Formik>
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
  checkbox: {
    width: windowWidth * 0.04,
    height: windowHeight * 0.02,
    marginLeft: windowWidth * 0.01,
  },
  textWelcome: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  textTitle: {
    fontSize: 40,
    fontWeight: '400',
    color: 'white',
  },
  textFunction: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    alignSelf: 'center',
  },
  textOr: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonSignUp: {
    width: '70%',
    height: windowHeight * 0.08,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.01,
  },
  titleSignUp: {
    color: '#3486eb',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  viewCheckboxText: {
    marginLeft: windowWidth * 0.02,
    flexDirection: 'row',
  },
  checkboxText: {
    fontSize: 12,
    color: 'white',
  },
});

export default SignUp;
