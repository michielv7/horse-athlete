import { UserOverviewType } from '#/lib/types/userOverview';
import clsx from 'clsx';
import { BlockingButton } from './BlockingButton';

export const TableBody = ({ users }: { users: UserOverviewType }) => {
  return (
    <tbody>
      {users.map((user, i) => (
        <tr
          key={user.id}
          className={clsx('text-center', {
            'bg-slate-400': i % 2 === 0,
            'bg-slate-600': i % 2 !== 0,
          })}
        >
          <th scope="row" className="py-3">
            {user.id}
          </th>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.type}</td>
          <td>{user.isSubscribed ? 'Yes' : 'No'}</td>
          <td>{user.blocked ? 'Yes' : 'No'}</td>
          <td>
            {user.type !== 'admin' ? (
              <>
                <a href={`/user-overview/edit/${user.id}`}>Edit</a> |{' '}
                <BlockingButton userId={user.id} blocking={!user.blocked} />
              </>
            ) : (
              'No action available'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
