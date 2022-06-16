import { AuthenticationRepositoryImpl } from '../data';
import { AuthorizedRepositoryImpl } from '../data';
import {container} from 'tsyringe';

export function registerRepositoryDependencies() {
  container.register('AuthenticationRepository', {
    useClass: AuthenticationRepositoryImpl,
  });
  container.register('AuthorizedRepository', {
    useClass: AuthorizedRepositoryImpl,
  });
}
