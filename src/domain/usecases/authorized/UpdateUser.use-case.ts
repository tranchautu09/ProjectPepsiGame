import {UseCase} from '../../../core/usecase/UseCase';
import {Observable} from 'rxjs';
import {AuthorizedRepository} from '../../repositories/AuthorziedRepository';
import {injectable, inject} from 'tsyringe';
import {UpdateUserResult} from '../../entities/authorized';

@injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserResult, any> {
  constructor(
    @inject('AuthorizedRepository')
    private readonly authorizedRepository: AuthorizedRepository,
  ) {}

  call(param?: any): Observable<UpdateUserResult> {
    return this.authorizedRepository.updateUser(param);
  }
}
