import React from 'react';
import Head from '@docusaurus/Head';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const target = useBaseUrl('/docs/getting-started/overview');
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
      </Head>
      <Redirect to={target} />
    </>
  );
}
