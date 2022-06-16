import {Observable} from 'rxjs';
import {UseCase} from '../../../core/usecase/UseCase';
import {SignOutResult} from '../../entities/authentication';
import {AuthenticationRepository} from '../../repository/AuthenticationRepository';
import {injectable, inject} from 'tsyringe';

@injectable()
export class SignOutUseCase implements UseCase<SignOutResult, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  call(param?: any): Observable<SignOutResult> {
    return this.authenticationRepository.signOut();
  }
}
