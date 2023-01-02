'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { Details } from '#/lib/types/personalAccount';
import { LoadingElement } from '#/ui/SkeletonCard';
import { stringify } from 'qs';
import { Toaster, toast } from 'react-hot-toast';
import useSWR from 'swr';
import ProfileDetails from './ProfileDetails';

export const Profile = () => {
  const query = stringify(
    {
      fields: ['username', 'email', 'isSubscribed', 'type'],
      populate: {
        profilePicture: {
          fields: ['name', 'alternativeText', 'width', 'height', 'url'],
        },
      },
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );
  const fetchUserDetails = (url: string) =>
    toast.promise(
      fetchData({
        url,
        method: 'GET',
        authorized: true,
      }).then(Details.parse),
      {
        loading: 'Loading your details',
        success: 'Loaded your details',
        error: 'There was an error loading your details',
      },
    );

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(`/api/users/me${query}`, fetchUserDetails, {
    dedupingInterval: 120_000,
    revalidateOnFocus: false,
  });

  if (isLoading)
    return (
      <>
        <Toaster position="top-center" reverseOrder={true} />
        <LoadingElement />
      </>
    );

  if (error)
    return (
      <>
        <Toaster position="top-center" reverseOrder={true} />
        <div>Error</div>
      </>
    );

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <ProfileDetails data={user!} />
    </>
  );
};
