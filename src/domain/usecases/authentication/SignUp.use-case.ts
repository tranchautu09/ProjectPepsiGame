import {Observable} from 'rxjs';
import {UseCase} from '../../../core/usecase/UseCase';
import {SignUpResult} from '../../entities/authentication';
import {AuthenticationRepository} from '../../repository/AuthenticationRepository';
import {injectable, inject} from 'tsyringe';

@injectable()
export class SignUpUseCase implements UseCase<SignUpResult, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(param?: any): Observable<SignUpResult> {
    return this.authenticationRepository.signUp(param);
  }
}
