import {createAction} from '@reduxjs/toolkit';
import {
  Credential,
  VerifyOtpPayload,
} from '../../../domain/entities/authentication';

export const signIn = createAction<Credential>('authentication/signIn');
export const signUp = createAction<Credential>('authentocation/signUp');
export const requestOtp = createAction<string>('authentication/requestOtp');
export const verifyOtp = createAction<VerifyOtpPayload>(
  'authentication/verifyOtp',
);
export const signOut = createAction('authentication/signOut');
