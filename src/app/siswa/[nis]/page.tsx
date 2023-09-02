import { Typography } from '-/components/typography';
import React from 'react';

export default function SiswaDetailsPage({
  params,
}: {
  params: { nis: string };
}) {
  const { nis } = params;

  return <Typography types='h1'>{nis}</Typography>;
}
