import {filter} from 'rxjs/operators';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
// import axios from 'axios';
import auth from '@react-native-firebase/auth';

// const baseUrl =
//   'https://firestore.googleapis.com/v1/projects/pepsigameauth/databases/(default)/documents';

export const getUser = async (phoneNumber: string) => {
  const doc = await firestore()
    .collection('users')
    .doc(phoneNumber)
    .get()
    .catch(e => {
      Alert.alert('Error: ', e);
    });

  let user = doc.data();
  if (user !== undefined) {
    user.phone_number = phoneNumber;
  }
  return user;
};

export const signUp = async (credential: any) => {
  let user = await getUser(credential.phone_number);
  if (user === undefined) {
    let rawData = {
      name: credential.name,
      play_time_free: 3,
      play_time_exchange: 0,
      collection: {
        coins: 0,
        pepsi_cans: 0,
        mirinda_cans: 0,
        sevenup_cans: 0,
      },
      gifts: [],
      phone_number: credential.phone_number,
    };
    await firestore()
      .collection('users')
      .doc(credential.phone_number)
      .set(rawData)
      .catch(error => console.log('sign up error: ', error));

    return {success: true, data: rawData};
  } else {
    return {success: false, data: credential, note: 'user is aready exists'};
  }
};

// export const signUp = async (credential: any) => {
//   let user = await getUser(credential.phone_number);
//   if (user === undefined) {
//     let completeUrl = baseUrl.concat('/users/', credential.phone_number);
//     console.log('comple url: ', completeUrl);
//     await axios
//       .post(completeUrl, {
//         fields: {
//           name: credential.name,
//           play_time_exchange: 0,
//           play_time_free: 0,
//         },
//       })
//       .then(res => console.log('res: ', res))
//       .catch(err => console.log('err: ', err));
//     return {success: true, data: credential};
//   } else {
//     return {success: false, data: credential, note: 'user is aready exists'};
//   }
// };

export const requestOtp = async (phoneNumber: string) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return {otp_confirmation: confirmation};
};

export const verifyOtp = async (otp: string, confirm: any) => {
  if (confirm !== undefined) {
    try {
      await confirm.confirm(otp);
      return {success: true};
    } catch {
      return {success: false, note: 'wrong otp code'};
    }
  } else {
    return {success: false, note: 'no otp confirmation'};
  }
};

export const getReward = async () => {
  const doc = await firestore()
    .collection('rewards')
    .doc('1')
    .get()
    .catch(e => {
      Alert.alert('Error: ', e);
    });
  // console.log('reward: ', doc.data());

  if (doc.data() != undefined) {
    return {reward: doc.data(), success: true};
  } else {
    return {success: false, note: 'no reward'};
  }
};

export const getGift = async (id: string) => {
  const doc = await firestore()
    .collection('gifts')
    .doc(id)
    .get()
    .catch(e => {
      Alert.alert('Error: ', e);
    });

  return doc.data();
};

export const updateUser = async (user: any) => {
  let tempUser = JSON.parse(JSON.stringify(user));
  delete tempUser.phone_number;
  // console.log('temp user: ', tempUser);
  await firestore().collection('users').doc(user.phone_number).update(tempUser);
  return {success: true, user: user};
};

export const exchangeCombo = async (combo_amount: number) => {
  let temp_rewards = [
    {name: 'coins', description: '300 coins'},
    {name: 'hat', description: 'Pepsi Bucket Hat'},
    {name: 'jacket', description: 'Pepsi Jacket'},
    {name: 'bag', description: 'Pepsi Tote Bag'},
    {name: 'tumbler', description: 'Pepsi Tumbler'},
  ];

  let result = [];
  for (var i = 0; i < combo_amount; i++) {
    let reward = temp_rewards[Math.floor(Math.random() * temp_rewards.length)];
    result.push(reward);
  }
  return {success: true, combo_rewards: result};
};

export const getGiftStore = async () => {
  const snapshot = await firestore()
    .collection('gifts')
    .get()
    .catch(e => {
      console.log('error: ', e);
    });

  let result = [];
  if (snapshot.size > 0) {
    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      let item = doc.data();
      item.id = doc.id;
      result.push(item);
    });

    return {success: true, gifts: result};
  } else {
    return {success: false, note: 'no gift'};
  }
};

export const saveGiftData = async (input: any) => {
  let receiver = await getUser(input.receiver.phone_number);
  let purchaser = await getUser(input.purchaser.phone_number);

  let gift = await getGift(input.gift.id);
  // console.log('gift: ', gift);

  if (receiver === undefined) {
    return {
      success: false,
      gift: input.gift,
      user_information: input.user_information,
      note: 'Thông tin người nhận không tồn tại!',
    };
  } else {
    // Update reveiver
    let tempReceiver = JSON.parse(JSON.stringify(receiver));
    tempReceiver.gifts.push({
      delivered: false,
      name: input.gift.name,
      description: input.gift.description,
    });

    await firestore()
      .collection('users')
      .doc(tempReceiver.phone_number)
      .update(tempReceiver);

    // Update gift store
    let temptGift = JSON.parse(JSON.stringify(gift));
    temptGift.quantity -= 1;
    await firestore().collection('gifts').doc(input.gift.id).update(temptGift);

    // Update purchaser
    let tempPurchaser = JSON.parse(JSON.stringify(purchaser));
    tempPurchaser.collection.coins -= input.gift.coins;
    if (tempPurchaser.phone_number === tempReceiver.phone_number) {
      tempPurchaser.gifts = tempReceiver.gifts;
    }
    await firestore()
      .collection('users')
      .doc(tempPurchaser.phone_number)
      .update(tempPurchaser);

    return {
      success: true,
      gift: input.gift,
      purchaser: tempPurchaser,
      receiver: tempReceiver,
      note: 'save gift data successful',
    };
  }
};

export const signOut = async () => {
  await auth()
    .signOut()
    .then(() => {
      console.log('signed out!');
    })
    .catch(error => console.log('sign out error: ', error));
  return {success: true};
};
