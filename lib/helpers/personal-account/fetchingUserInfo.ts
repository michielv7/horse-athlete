import { Details } from '#/lib/types/personalAccount';
import { stringify } from 'qs';
import { fetchServerSideData } from '../fetchServer';

export const fetchUserDetails = async () => {
  const query = stringify(
    {
      fields: ['username', 'email', 'isSubscribed', 'type'],
      populate: {
        profilePicture: {
          fields: ['name', 'alternativeText', 'width', 'height', 'url'],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  return await fetchServerSideData({
    url: `/api/users/me?${query}`,
    method: 'GET',
    authorized: true,
  }).then(Details.safeParse);
};
