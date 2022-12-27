import { DetailsType } from '#/lib/types/personalAccount';
import { SafeParseError, SafeParseSuccess } from 'zod';

import ProfileDetails from './ProfileDetails';

export const Profile = ({
  userData,
}: {
  userData: SafeParseSuccess<DetailsType> | SafeParseError<DetailsType>;
}) => {
  if (!userData.success) return <div>Unable to retrieve your data</div>;

  const { data: user } = userData;
  return <ProfileDetails data={user} />;
};
