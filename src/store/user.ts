import { JwtToken } from './../models/JwtToken';
import { createContext } from 'react';
import { action, makeObservable, observable } from 'mobx';
class UserStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  isSignedIn: boolean = false;

  @observable
  token: JwtToken = {} as JwtToken;

  @action
  setIsSignedIn(value: boolean): void {
    this.isSignedIn = value;
  }

  @action
  setToken(value: JwtToken): void {
    this.token = value;
  }
}

export default createContext(new UserStore());
