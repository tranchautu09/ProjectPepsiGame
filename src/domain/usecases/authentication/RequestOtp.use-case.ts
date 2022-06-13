import {Observable} from 'rxjs';
import {UseCase} from '../../../core/usecase/UseCase';
import {RequestOtpResult} from '../../entities/authentication';
import {AuthenticationRepository} from '../../repositories/AuthenticationRepository';
import {injectable, inject} from 'tsyringe';

@injectable()
export class RequestOtpUseCase implements UseCase<RequestOtpResult, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(param?: any): Observable<RequestOtpResult> {
    return this.authenticationRepository.requestOtp(param);
  }
}
