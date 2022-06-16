import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
import RectangleButton from '../buttons/RectangleButton';
import {SingleButtonsPopupProps} from './SingleButtonPopup';
import {
  POPUP_GIFT_FORM,
  CLOSE_BUTTON,
  BUTTON_SCAN_NOW,
} from '../../../../assets/images';
import ImageButton from '../buttons/ImageButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from '../inputs/TextInputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {saveGiftData} from '../../redux/actions/authorized.actions';
import {RootState} from '../../redux/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Cần nhập số điện thoại!')
    .min(9, 'Số điện thoại có tối thiểu 9 số.')
    .max(12, 'Số điện thoại có tối đa 12 số.')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ!'),
  userName: Yup.string()
    .min(2, 'Tên phải có tối thiểu 2 kí tự')
    .max(100, 'Tên phải có tối đa 100 kí tự')
    .required('Cần nhập họ tên!'),
  userAddress: Yup.string()
    .required('Cần nhập địa chỉ')
    .min(3, 'Tối thiểu 3 kí tự')
    .max(200, 'Tối đa 200 kí tự'),
});

const GiftFormModal: React.FC<SingleButtonsPopupProps> = props => {
  const {onPress, onClose, visible, payload, backgroundImage} = props;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authorized.user);

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContentContainer}>
          <ImageButton
            imageSource={CLOSE_BUTTON}
            onPress={onClose}
            buttonContainerStyle={styles.buttonClose}
          />
          <View style={styles.viewTextTitle}>
            <Text style={styles.textTitle}>{'Thông tin nhận quà'}</Text>
          </View>
          <View style={styles.viewTextGiftInfo}>
            <Text style={styles.textGiftInfo}>{'Quà của bạn: '}</Text>
            <Text style={styles.textGiftName}>{`${payload.description}`}</Text>
            {/* <Text style={styles.textGiftName}>{'Gift'}</Text> */}
          </View>
          <View style={styles.formsSection}>
            <Formik
              initialValues={{
                phoneNumber: '',
                userAddress: '',
                userName: '',
                note: '',
              }}
              validationSchema={formSchema}
              onSubmit={values => {
                // console.log('values: ', values);
                // console.log('payload: ', payload);
                onPress();
                let input = {
                  gift: payload,
                  receiver: {
                    phone_number: values.phoneNumber,
                    name: values.userName,
                  },
                  purchaser: {
                    phone_number: user.phone_number,
                    name: user.name,
                  },
                };
                dispatch(saveGiftData(input));
              }}>
              {formik => (
                <KeyboardAwareScrollView>
                  <Text style={styles.textFormName}>{'Họ và tên'}</Text>
                  <TextInputField
                    placeholder="Nguyễn Văn A"
                    inputProps={{
                      value: formik.values.userName,
                      onChangeText: (value: string) => {
                        formik.setFieldValue('userName', value, true);
                      },
                    }}
                    errorLabel={formik.errors.userName}
                    errorStyle={styles.textInputError}
                    isInputInValid={
                      formik.errors.userName === undefined ? false : true
                    }
                  />
                  <Text style={styles.textFormName}>{'Số điện thoại'}</Text>
                  <TextInputField
                    placeholder="0235467985"
                    inputProps={{
                      value: formik.values.phoneNumber,
                      onChangeText: (value: string) => {
                        formik.setFieldValue('phoneNumber', value, true);
                      },
                    }}
                    errorLabel={formik.errors.phoneNumber}
                    errorStyle={styles.textInputError}
                    numKeyboard={true}
                    isInputInValid={
                      formik.errors.phoneNumber === undefined ? false : true
                    }
                  />
                  <Text style={styles.textFormName}>{'Địa chỉ'}</Text>
                  <TextInputField
                    inputContainerStyle={styles.bigFormInput}
                    containerStyle={styles.bigFormContainer}
                    multiLine={true}
                    placeholder="Nhập địa chỉ của bạn"
                    inputProps={{
                      value: formik.values.userAddress,
                      onChangeText: (value: string) => {
                        formik.setFieldValue('userAddress', value, true);
                      },
                    }}
                    errorLabel={formik.errors.userAddress}
                    errorStyle={styles.textInputError}
                    isInputInValid={
                      formik.errors.userAddress === undefined ? false : true
                    }
                  />
                  <Text style={styles.textFormName}>{'Ghi chú'}</Text>
                  <TextInputField
                    containerStyle={styles.bigFormContainer}
                    inputContainerStyle={styles.bigFormInput}
                    multiLine={true}
                    placeholder="Nhập ghi chú (nếu có)"
                    inputProps={{
                      value: formik.values.note,
                      onChangeText: (value: string) => {
                        formik.setFieldValue('note', value, true);
                      },
                    }}
                  />
                  <RectangleButton
                    title="Xác nhận"
                    titleStyle={styles.textTitleButtonConfirm}
                    onPress={formik.submitForm}
                    activeStyle={styles.buttonConfirm}
                    inactiveStyle={styles.buttonConfirm}
                    backgroundImage={BUTTON_SCAN_NOW}
                    disabled={!formik.isValid}
                  />
                </KeyboardAwareScrollView>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalContentContainer: {
    height: windowHeight * 0.85,
    width: windowWidth * 0.9,
    backgroundColor: '#edb047',
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    marginTop: windowHeight * 0.01,
    marginRight: windowWidth * 0.02,
  },
  viewTextTitle: {
    marginTop: windowHeight * 0.01,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  viewTextGiftInfo: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.02,
    marginLeft: windowWidth * 0.04,
  },
  textGiftInfo: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 18,
  },
  textGiftName: {
    fontSize: 21,
    color: 'red',
    fontWeight: 'bold',
    marginTop: -windowHeight * 0.002,
  },
  formsSection: {
    width: '91%',
    alignSelf: 'center',
    marginTop: windowHeight * 0.02,
  },
  textFormName: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 14,
  },
  bigFormContainer: {
    marginVertical: windowHeight * 0.01,
  },
  bigFormInput: {
    height: windowHeight * 0.12,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'column',
  },
  buttonConfirm: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
  },
  textTitleButtonConfirm: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputError: {
    fontSize: 14,
    color: 'red',
    marginTop: windowHeight * 0.005,
  },
});

export default GiftFormModal;
