import React, { ReactElement } from 'react';
import { formatDistance } from 'date-fns';

interface Props {
  text: string;
  date: Date | null;
}

function ReviewResponse({ text, date }: Props): ReactElement {
  return (
    <div className="ml-6 mt-2">
      <span className="font-bold text-gray-500">Response from the owner</span>
      <span className="ml-4 pt-1 text-gray-600">
        {date &&
          formatDistance(date, new Date(), {
            addSuffix: true,
          })}
      </span>
      <p>{text}</p>
    </div>
  );
}

export default ReviewResponse;
