import {Observable} from 'rxjs';
import {UseCase} from '../../../core/usecase/UseCase';
import {SignInResult} from '../../entities/authentication';
import {AuthenticationRepository} from '../../repositories/AuthenticationRepository';
import {injectable, inject} from 'tsyringe';

@injectable()
export class SignInUseCase implements UseCase<SignInResult, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(param?: any): Observable<SignInResult> {
    return this.authenticationRepository.signIn(param);
  }
}
