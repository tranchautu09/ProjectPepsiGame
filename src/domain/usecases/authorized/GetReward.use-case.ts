import {UseCase} from '../../../core/usecase/UseCase';
import {AuthorizedRepository} from '../../repositories/AuthorziedRepository';
import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';
import {GetRewardResult} from '../../entities/authorized';

@injectable()
export class GetRewardUseCase implements UseCase<GetRewardResult, any> {
  constructor(
    @inject('AuthorizedRepository')
    private readonly authorizedRepository: AuthorizedRepository,
  ) {}

  call(param?: any): Observable<GetRewardResult> {
    return this.authorizedRepository.getReward();
  }
}
