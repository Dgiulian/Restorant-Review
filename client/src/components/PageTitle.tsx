import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';

interface Props {
  title: string;
}

function PageTitle({ title = 'Restaurant reviews' }: Props): ReactElement {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;
