import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  SCREEN_GIFTS_DETAILS,
  INSTRUCTION_STEP_1,
  INSTRUCTION_STEP_2,
} from '../../../../assets/images';
import Header from '../../components/header/header';
import LogoutPopup from '../../components/popup/LogoutPopup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const steps = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.',
  },
  {text: 'Step 2 instruction'},
];

const Instruction: React.FC = props => {
  const {navigation} = props;
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const renderItem = ({item, index}) => {
    let imgSource = INSTRUCTION_STEP_1;
    switch (index) {
      case 0:
        imgSource = INSTRUCTION_STEP_1;
        break;
      case 1:
        imgSource = INSTRUCTION_STEP_2;
        break;
      default:
        imgSource = INSTRUCTION_STEP_1;
    }
    return (
      <View style={styles.viewStep}>
        <Image source={imgSource} resizeMode="cover" />
        <View style={styles.viewTextStep}>
          <Text>
            <Text style={styles.textStep}>{`Bước ${index + 1}: `}</Text>
            <Text style={styles.textStepDetail}>{item.text}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_GIFTS_DETAILS}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <Header
            title="Hướng dẫn"
            leftButtonAvailable={true}
            rightButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            onPressRightButton={() =>
              setLogoutModalVisible(!logoutModalVisible)
            }
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.flatlistContainer}>
            <FlatList data={steps} renderItem={renderItem} />
          </View>
        </View>
        <LogoutPopup
          visible={logoutModalVisible}
          onPressConfirm={() => {
            setLogoutModalVisible(!logoutModalVisible);
          }}
          onPressCancel={() => setLogoutModalVisible(!logoutModalVisible)}
          sideEffect={() => {
            navigation.navigate('Sign in');
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    width: '90%',
    flex: 1,
    alignItems: 'center',
  },
  viewStep: {
    alignItems: 'center',
    paddingBottom: windowHeight * 0.02,
  },
  viewTextStep: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: windowHeight * 0.03,
  },
  textStep: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
  textStepDetail: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default Instruction;
