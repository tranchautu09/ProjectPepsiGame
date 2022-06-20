import {UseCase} from '../../../core/usecase/UseCase';
import {AuthorizedRepository} from '../../repositories/AuthorziedRepository';
import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';
import {GetGiftStoreResult} from '../../entities/authorized';

@injectable()
export class GetGiftStoreUseCase implements UseCase {
  constructor(
    @inject('AuthorizedRepository')
    private readonly authorizedRepository: AuthorizedRepository,
  ) {}

  call(param?: any): Observable<GetGiftStoreResult> {
    return this.authorizedRepository.getGiftStore();
  }
}
