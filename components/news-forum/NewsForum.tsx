import { NewslettersOverviewType } from '#/lib/types/newsletter';
import { SafeParseSuccess } from 'zod';
import { NewsForumShort } from './NewsForumShort';

export const NewsForm = ({
  data,
}: {
  data: SafeParseSuccess<NewslettersOverviewType>;
}) => {
  const {
    data: { data: news, meta },
  } = data;

  return (
    <>
      <div className="gird-cols-2 grid gap-3">
        {news.map((entry) => (
          <NewsForumShort key={entry.id.toString()} news={entry.attributes} />
        ))}
      </div>
    </>
  );
};
