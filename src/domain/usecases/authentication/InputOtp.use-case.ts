import {Observable} from 'rxjs';
import {UseCase} from '../../../core/usecase/UseCase';
import {VerifyOtpResult} from '../../entities/authentication';
import {AuthenticationRepository} from '../../repository/AuthenticationRepository';
import {injectable, inject} from 'tsyringe';

@injectable()
export class InputOtpUseCase implements UseCase<VerifyOtpResult, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(param?: any): Observable<VerifyOtpResult> {
    return this.authenticationRepository.verifyOtp(param.otp, param.confirm);
  }
}
