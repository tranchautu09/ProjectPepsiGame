import {AuthenticationEpics} from './epics/authentication.epics';
import {AuthorizedEpics} from './epics/authorzied.epics';
import {combineEpics} from 'redux-observable';

export const RootEpic = combineEpics(AuthenticationEpics, AuthorizedEpics);
