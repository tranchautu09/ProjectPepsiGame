import {registerDataDependencies} from './DataModule';
import {registerRepositoryDependencies} from './RepositoryModule';

export function registerDependencies() {
  registerDataDependencies();
  registerRepositoryDependencies();
}
