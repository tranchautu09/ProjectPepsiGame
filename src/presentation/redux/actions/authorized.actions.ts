import {
    UpdateUserPayload,
    SaveGiftDataInput,
  } from './../../../domain/entities/authorized';
  import {createAction} from '@reduxjs/toolkit';
  
  export const getReward = createAction('authorized/getReward');
  export const updateUser = createAction<UpdateUserPayload>(
    'authorized/updateUser',
  );
  export const exchangeCombo = createAction<number>('authorized/exchangeCombo');
  export const getGiftStore = createAction('authorized/getGiftStore');
  export const saveGiftData = createAction<SaveGiftDataInput>(
    'authorized/saveGiftData',
  );
  