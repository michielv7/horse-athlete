import { demos } from '#/lib/demos';
import clsx from 'clsx';
import Link from 'next/link';
import { isAdmin, isFitter } from '#/lib/helpers/serverAuthorization';
import { ClientNavComponent } from '#/components/nav/ClientNavComponent';

export default function GlobalNav() {
  const isUserAdmin = isAdmin(),
    isUserFitter = isFitter();

  return (
    <div className="space-y-5">
      {demos.map((demo) => {
        return (
          <div key={demo.name}>
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <div>{demo.name}</div>
            </div>

            {demo.items.map((item) => {
              const isActive = false;

              if (
                !item.isHidden &&
                (item.isPublic ||
                  (item.forAdmin && isUserAdmin) ||
                  (item.forFitter && isUserFitter))
              ) {
                return item.slug === 'log-out' ? (
                  <ClientNavComponent
                    key={item.slug}
                    item={item}
                    isActive={isActive}
                  />
                ) : (
                  <NavComponent
                    key={item.slug}
                    item={item}
                    isActive={isActive}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

const NavComponent = ({ item, isActive }: { item: any; isActive: boolean }) => (
  <div>
    {item.isDisabled ? (
      <div
        className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600"
        title="Coming Soon"
      >
        {item.name}
      </div>
    ) : (
      <Link
        href={`/${item.slug}`}
        className={clsx(
          'block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-gray-100',
          {
            'text-gray-400': !isActive,
            'text-white': isActive,
          },
        )}
      >
        {item.name}
      </Link>
    )}
  </div>
);
