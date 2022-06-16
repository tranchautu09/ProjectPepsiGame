import {requestOtp, signOut, verifyOtp} from '../provider/FirebaseAPI';
import {Observable, from} from 'rxjs';
import {
  RequestOtpResult,
  SignInResult,
  SignOutResult,
  SignUpResult,
  VerifyOtpResult,
} from '../../domain/entities/authentication';
import {AuthenticationRepository} from '../../domain/repository/AuthenticationRepository';
import {getUser, signUp} from '../provider/FirebaseAPI';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  signOut(): Observable<SignOutResult> {
    return from(signOut());
  }
  verifyOtp(otp: string, confirm: any): Observable<VerifyOtpResult> {
    return from(verifyOtp(otp, confirm));
  }
  requestOtp(phoneNumber: string): Observable<RequestOtpResult> {
    return from(requestOtp(phoneNumber));
  }
  signUp(credential: any): Observable<SignUpResult> {
    return from(signUp(credential));
  }
  signIn(credential: any): Observable<SignInResult> {
    return from(getUser(credential.phone_number));
  }
}
