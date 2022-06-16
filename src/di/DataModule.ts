import {GetGiftStoreUseCase} from './../domain/usecases/authorized/GetGiftStore.use-case';
import {ExchangeComboUseCase} from './../domain/usecases/authorized/ExchangeCombo';
import {UpdateUserUseCase} from './../domain/usecases/authorized/UpdateUser.use-case';
import {GetRewardUseCase} from './../domain/usecases/authorized/GetReward.use-case';
import {SignUpUseCase} from './../domain/usecases/authentication/SignUp.use-case';
import {container} from 'tsyringe';
import {SignInUseCase} from '../domain/usecases/authentication/SignIn.use-case';
import {RequestOtpUseCase} from '../domain/usecases/authentication/RequestOtp.use-case';
import {VerifyOtpUseCase} from '../domain/usecases/authentication/VerifyOtp.use-case';
import {SaveGiftDataUseCase} from '../domain/usecases/authorized/SaveGiftData';
import {SignOutUseCase} from '../domain/usecases/authentication/SignOut.use-case';

export function registerDataDependencies() {
  container.register('SignInUseCase', {
    useClass: SignInUseCase,
  });
  container.register('SignUpUseCase', {
    useClass: SignUpUseCase,
  });
  container.register('RequestOtpUseCase', {
    useClass: RequestOtpUseCase,
  });
  container.register('VerifyOtpUseCase', {
    useClass: VerifyOtpUseCase,
  });
  container.register('GetRewardUseCase', {
    useClass: GetRewardUseCase,
  });
  container.register('UpdateUserUseCase', {
    useClass: UpdateUserUseCase,
  });
  container.register('ExchangeComboUseCase', {
    useClass: ExchangeComboUseCase,
  });
  container.register('GetGiftStoreUseCase', {
    useClass: GetGiftStoreUseCase,
  });
  container.register('SaveGiftDataUseCase', {
    useClass: SaveGiftDataUseCase,
  });
  container.register('SignOutUseCase', {
    useClass: SignOutUseCase,
  });
}
