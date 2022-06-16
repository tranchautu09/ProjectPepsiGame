import {UseCase} from '../../../core/usecase/UseCase';
import {Observable} from 'rxjs';
import {AuthorizedRepository} from '../../repository/AuthorziedRepository';
import {injectable, inject} from 'tsyringe';
import {SaveGiftDataResult} from '../../entities/authorized';

@injectable()
export class SaveGiftDataUseCase implements UseCase<SaveGiftDataResult, any> {
  constructor(
    @inject('AuthorizedRepository')
    private readonly authorizedRepository: AuthorizedRepository,
  ) {}

  call(param?: any): Observable<SaveGiftDataResult> {
    return this.authorizedRepository.saveGiftData(param);
  }
}
