import { getCookie, hasCookie } from 'cookies-next';
import { CookieType } from '../types/login';

export const isLoggedIn = () => hasCookie('user');

export const isAdmin = () =>
  hasCookie('user') ? getType().user.type === 'admin' : false;

export const isFitter = () =>
  hasCookie('user') ? getType().user.type === 'fitter' : false;

const getType = () => <CookieType>JSON.parse(<string>getCookie('user'));
