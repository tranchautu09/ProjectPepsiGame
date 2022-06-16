import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import RectangleButton from '../buttons/RectangleButton';
import {BUTTON_WHITE} from '../../../../assets/images';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../../redux/actions/authentication.actions';
import {RootState} from '../../redux/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface LogoutPopup {
  visible: boolean;
  onPressConfirm: () => void;
  onPressCancel: () => void;
  sideEffect: () => void;
}

const LogoutPopup: React.FC<LogoutPopup> = props => {
  const {visible, onPressCancel, onPressConfirm, sideEffect} = props;
  const dispatch = useDispatch();
  const isSignedOut = useSelector(
    (state: RootState) => state.authentication.isSignedOut,
  );

  useEffect(() => {
    if (isSignedOut === true) {
      sideEffect();
    }
  }, [isSignedOut]);

  const handleConfirm = () => {
    onPressConfirm();
    dispatch(signOut());
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{'Bạn có chắc chắn muốn'}</Text>
            <View style={styles.subTextContainer}>
              <Text style={styles.textBold}>{'đăng xuất'}</Text>
              <Text style={styles.text}>{' không?'}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <RectangleButton
              title="Đăng xuất"
              titleStyle={styles.textConfirmButton}
              activeStyle={styles.confirmButton}
              disabled={false}
              onPress={handleConfirm}
            />
            <RectangleButton
              title="Huỷ"
              titleStyle={styles.textCancelButton}
              activeStyle={styles.canelButton}
              disabled={false}
              onPress={onPressCancel}
              backgroundImage={BUTTON_WHITE}
            />
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
  },
  modalContent: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.2,
    backgroundColor: '#fcd01e',
    borderRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: windowHeight * 0.01,
  },
  subTextContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    color: '#0063A7',
    fontSize: 13,
  },
  textBold: {
    color: '#0063A7',
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: windowHeight * 0.02,
  },
  confirmButton: {
    // backgroundColor: 'red',
    width: windowWidth * 0.25,
    height: windowHeight * 0.055,
    marginTop: windowHeight * 0.01,
  },
  textConfirmButton: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
  },
  canelButton: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.055,
    marginTop: windowHeight * -0.01,
    // backgroundColor: 'white',
  },
  textCancelButton: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LogoutPopup;
