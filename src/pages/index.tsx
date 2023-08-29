import Router from 'next/router';
import React, { useEffect } from 'react';
import { trpc } from 'utils/trpc';

export default function Home() {
  useEffect(() => {
    Router.push('/admin/dashboards/default');
  });

  return <></>;
}
