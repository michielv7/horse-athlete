import { cookies } from 'next/headers';
import { CookieType } from '../types/login';

export const isLoggedIn = () => cookies().has('user');

export const isAdmin = () =>
  cookies().has('user') ? getType() === 'admin' : false;

export const isFitter = () =>
  cookies().has('user') ? getType() === 'fitter' : false;

const getType = () =>
  (<CookieType>JSON.parse(cookies().get('user')?.value!)).user.type;

export const getUser = () =>
  (<CookieType>JSON.parse(cookies().get('user')?.value!)).user;
