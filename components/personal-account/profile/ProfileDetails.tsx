import { DetailsType } from 'types/personalAccount';
import Image from 'next/image';
import Link from 'next/link';
import { PencilIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

export default function ProfileDetails({ data }: { data: DetailsType }) {
  const { username, email, type, isSubscribed, profilePicture } = data;
  return (
    <div className="rounded-md bg-slate-600 p-3">
      <div className="details">
        <div className="personDetails mb-2">
          <figure className="flex flex-col rounded-md bg-slate-800 p-8">
            <Image
              className="mx-auto h-24 w-24 rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}${profilePicture.url}`}
              alt={profilePicture.alternativeText}
              width={profilePicture.width}
              height={profilePicture.height}
            />
            <div className="space-y-4 p-8 pt-6 text-center text-lg font-medium">
              <blockquote>
                <p>Your email is {email}.</p>
                <p>
                  {`You are currently ${
                    isSubscribed ? '' : 'not'
                  } subscribed to the newsletter.`}
                </p>
              </blockquote>
              <figcaption>
                <div className="text-sky-500">{username}</div>
                <div className="uppercase text-slate-400">{type}</div>
              </figcaption>
            </div>
          </figure>
        </div>
        <div className="buttons grid grid-cols-2 divide-x">
          <Link
            href={{
              pathname: '/personal-account/edit/details',
              query: {
                username,
                email,
                isSubscribed,
              },
            }}
            className="flex flex-row items-center justify-center gap-2 rounded-tl rounded-bl bg-slate-800 p-3 text-center hover:bg-slate-900"
            passHref
          >
            <PencilIcon className="h-4 w-4" />
            Change Information
          </Link>
          <Link
            href={{ pathname: '/personal-account/edit/password' }}
            className="flex flex-row items-center justify-center gap-2 rounded-tr rounded-br bg-slate-800 p-3 text-center hover:bg-slate-900"
            passHref
          >
            <FingerPrintIcon className="h-4 w-4" />
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
}
