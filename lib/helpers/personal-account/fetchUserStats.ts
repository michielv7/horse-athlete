import { Stats } from '#/lib/types/personalAccount';
import { fetchServerSideData } from '../fetchServer';

export const fetchUserStats = async () => {
  return await fetchServerSideData({
    url: '/api/orders/me/stats',
    method: 'GET',
    authorized: true,
  }).then(Stats.safeParse);
};
