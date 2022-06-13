import {SignInResponseData} from './../../models';
import {ApiResult} from '../../models';
import {Observable} from 'rxjs';

export interface RemoteAuthenticationDataSource {
  signIn(body: any): Observable<ApiResult<SignInResponseData>>;
}

export class RemoteAuthenticationDataSourceImpl
  implements RemoteAuthenticationDataSource
{
  signIn(body: any): Observable<ApiResult<SignInResponseData>> {
    throw new Error('Method not implemented.');
  }
}
