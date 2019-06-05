import { BehaviorSubject } from 'rxjs';

export const user$ = new BehaviorSubject(window.localStorage.getItem('user'));

export function updateUser(newUser){
  newUser ? window.localStorage.setItem('user', newUser) : window.localStorage.removeItem('user')
  user$.next(newUser);
}