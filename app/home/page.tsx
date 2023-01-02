import { demos } from '#/lib/demos';
import { isAdmin } from '#/lib/helpers/serverAuthorization';
import Link from 'next/link';

export default function Page() {
  const admin = isAdmin();
  return (
    <div className="space-y-6">
      <div className="space-y-8 text-white">
        {demos
          .filter((section) =>
            section?.items?.some((x) => typeof x.isDisabled === 'undefined'),
          )
          .map((section) => {
            return (
              <div key={section.name} className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {section.name}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {section.items
                    .filter(
                      (item) =>
                        !item.isDisabled &&
                        (item.forAdmin === admin ||
                          item.forFitter === !admin ||
                          item.isPublic),
                    )
                    .map((item) => {
                      return (
                        <Link
                          href={`/${item.slug}`}
                          key={item.name}
                          className="block space-y-1.5 rounded-lg border border-white/10 px-4 py-3 hover:border-white/20"
                          passHref
                        >
                          <div>{item.name}</div>

                          {item.description ? (
                            <div className="line-clamp-3 text-sm text-gray-400">
                              {item.description}
                            </div>
                          ) : null}
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
