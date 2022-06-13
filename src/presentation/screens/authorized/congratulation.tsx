// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Dimensions,
//   View,
//   ImageBackground,
//   Image,
//   Text,
// } from 'react-native';
// import Header from '../../components/header/header';
// import RectangleButton from '../../../components/buttons/rectangle-button';
// import LogoutPopup from '../../../components/popup/logout-popup';
// import {
//   SCREEN_CONGRATULATION,
//   CAN_PEPSI,
//   CAN_MIRINDA,
//   CAN_SEVENUP,
//   COIN_BADGE,
// } from '../../../../assets/images';
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../redux';
// import {updateUser} from '../../../redux/actions/authorized.actions';
// import {resetReward} from '../../../redux/slices/authorized';
// import { signOut } from '../../../redux/actions/authentication.actions';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const Congratulation: React.FC = (props: any) => {
//   const {navigation} = props;
//   const [logoutModalVisible, setLogoutModalVisible] = useState(false);
//   const dispatch = useDispatch();
//   const reward = useSelector((state: RootState) => state.authorized.reward);
//   const user = useSelector((state: RootState) => state.authorized.user);

//   const getRewardImage = (name: string) => {
//     // console.log('name: ', name);

//     switch (name) {
//       case 'pepsi':
//         return CAN_PEPSI;
//       case 'mirinda':
//         return CAN_MIRINDA;
//       case 'sevenup':
//         return CAN_SEVENUP;
//       default:
//         return CAN_PEPSI;
//     }
//   };

//   const renderText = (rewardInfor: any) => {
//     let name = '';
//     switch (rewardInfor.can) {
//       case 'pepsi':
//         name = '1 lon Pepsi AN';
//         break;
//       case 'mirinda':
//         name = '1 lon Mirinda PHÚC';
//         break;
//       case 'sevenup':
//         name = '1 lon 7Up LỘC';
//         break;
//       default:
//         name = '';
//     }
//     return (
//       <View style={{flexDirection: 'row'}}>
//         <Text style={styles.textCongratulationHightlight}>{name}</Text>
//         <Text style={styles.textCongratulation}>{' ứng với '}</Text>
//         <Text
//           style={
//             styles.textCongratulationHightlight
//           }>{`${rewardInfor.coins} coins`}</Text>
//       </View>
//     );
//   };

//   const renderReward = () => {
//     if (reward !== undefined && reward != null) {
//       return (
//         <View style={{flex: 1}}>
//           <View style={styles.firstSection}>
//             <Image
//               source={COIN_BADGE}
//               resizeMode="contain"
//               style={styles.imageCoinBadge}
//             />
//             <Text style={styles.textCoin}>{reward.coins}</Text>
//             <Image
//               source={getRewardImage(reward.can)}
//               resizeMode="contain"
//               style={styles.imageCan}
//             />
//             <View style={styles.textSection}>
//               <Text style={styles.textCongratulation}>
//                 {'Chúc mừng bạn đã nhận được'}
//               </Text>
//               {renderText(reward)}
//             </View>
//           </View>
//           <View style={styles.secondSection}>
//             <RectangleButton
//               title={'Xác nhận'}
//               onPress={handleConfirm}
//               activeStyle={styles.buttonConfirm}
//             />
//           </View>
//         </View>
//       );
//     }
//   };

//   const handleConfirm = () => {
//     let newUserData = JSON.parse(JSON.stringify(user));
//     newUserData.collection.coins += reward.coins;
//     switch (reward.can) {
//       case 'pepsi':
//         newUserData.collection.pepsi_cans += 1;
//         break;
//       case 'mirinda':
//         // console.log('mirinda');

//         newUserData.collection.mirinda_cans += 1;
//         break;
//       case 'sevenup':
//         // console.log('sevenup');

//         newUserData.collection.sevenup_cans += 1;
//         break;
//     }
//     dispatch(updateUser({user: newUserData}));
//     dispatch(resetReward());
//     navigation.navigate('Main screen');
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={SCREEN_CONGRATULATION}
//         style={styles.container}
//         resizeMode="cover">
//         <View style={styles.headerContainer}>
//           <Header
//             leftButtonAvailable={false}
//             rightButtonAvailable={true}
//             onPressRightButton={() =>
//               setLogoutModalVisible(!logoutModalVisible)
//             }
//           />
//         </View>
//         <View style={styles.contentContainer}>{renderReward()}</View>
//         <LogoutPopup
//           visible={logoutModalVisible}
//           onPressConfirm={() => {
//             setLogoutModalVisible(!logoutModalVisible);
//           }}
//           onPressCancel={() => setLogoutModalVisible(!logoutModalVisible)}
//           sideEffect={() => {
//             navigation.navigate('Sign in');
//           }}
//         />
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   contentContainer: {
//     flex: 9,
//   },
//   firstSection: {
//     alignItems: 'center',
//   },
//   secondSection: {
//     marginTop: windowHeight * 0.025,
//   },
//   textSection: {
//     marginTop: windowHeight * 0.04,
//   },
//   imageCan: {
//     marginTop: windowHeight * 0.05,
//     zIndex: 1,
//   },
//   imageCoinBadge: {
//     position: 'absolute',
//     left: windowWidth * 0.55,
//     top: 0,
//     zIndex: 2,
//   },
//   textCoin: {
//     color: 'white',
//     fontSize: 36,
//     fontWeight: 'bold',
//     position: 'absolute',
//     left: windowWidth * 0.59,
//     top: windowHeight * 0.031,
//     zIndex: 3,
//   },
//   textCongratulation: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   textCongratulationHightlight: {
//     color: 'yellow',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   buttonConfirm: {
//     width: '50%',
//   },
// });

// export default Congratulation;
