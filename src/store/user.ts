import { createContext } from 'react';
import { action, makeObservable, observable } from 'mobx';
class UserStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  isSignedIn: boolean = false;

  @action
  setIsSignedIn(value: boolean): void {
    this.isSignedIn = value;
  }
}

export default createContext(new UserStore());
