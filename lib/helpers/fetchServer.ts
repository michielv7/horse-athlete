import { cookies } from 'next/headers';
import { CookieType } from '../types/login';

export const fetchServerSideData = async ({
  url,
  method,
  body,
  authorized,
  options,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Object;
  authorized: boolean;
  options?: Omit<RequestInit, 'headers' | 'method' | 'body'>;
}) => {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authorized) {
    const nextCookie = cookies();
    const cookie = JSON.parse(nextCookie.get('user')?.value!) as CookieType;
    headers['Authorization'] = `Bearer ${cookie.jwt}`;
  }

  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method,
    headers,
    body: JSON.stringify(body),
    ...options,
  }).then((res) => res.json());
};
