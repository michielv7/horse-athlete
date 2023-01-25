import { getCookie, hasCookie } from 'cookies-next';
import { CookieType } from 'types/login';

export const fetchData = async ({
  url,
  method,
  body,
  authorized,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Object;
  authorized: boolean;
}) => {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authorized) {
    const cookie = <CookieType>JSON.parse(getCookie('user', { path: '/' })!.toString());
    headers['Authorization'] = `Bearer ${cookie.jwt}`;
  }

  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method,
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
