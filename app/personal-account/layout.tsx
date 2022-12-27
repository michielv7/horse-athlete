import { ReactNode } from 'react';
import { fetchUserDetails } from '#/lib/helpers/personal-account/fetchingUserInfo';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Profile } from '#/components/personal-account/profile/Profile';
import { fetchUserStats } from '#/lib/helpers/personal-account/fetchUserStats';
import Statistics from '#/components/personal-account/stats/Stats';

export default async function PersonalAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const nextCookies = cookies();
  if (!nextCookies.has('user'))
    return (
      <div>
        <p>You are not logged in right, please login</p>
        <Link href={'/login'}>Go to login page</Link>
      </div>
    );

  const userData = await fetchUserDetails();
  const userStats = await fetchUserStats();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 text-white">
        <Profile userData={userData} />
        <Statistics statsData={userStats} />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
