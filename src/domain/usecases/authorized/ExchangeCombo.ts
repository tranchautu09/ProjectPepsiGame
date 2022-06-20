import {UseCase} from '../../../core/usecase/UseCase';
import {AuthorizedRepository} from '../../repositories/AuthorziedRepository';
import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';
import {ExchangeComboResult} from '../../entities/authorized';

@injectable()
export class ExchangeComboUseCase implements UseCase {
  constructor(
    @inject('AuthorizedRepository')
    private readonly authorizedRepository: AuthorizedRepository,
  ) {}

  call(param?: any): Observable<ExchangeComboResult> {
    return this.authorizedRepository.exchangeCombo(param);
  }
}
