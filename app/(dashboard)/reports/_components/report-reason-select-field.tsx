import React from 'react';

import { FormSelect } from '@/components/forms';

import { useActiveReportReasons } from '../../report-reasons/_config/report-reason.hooks';

type Props = {
  control: any;
};
function ReportReasonSelectField({ control }: Props) {
  const { data, isLoading } = useActiveReportReasons();

  return (
    <FormSelect
      isLoading={isLoading}
      control={control}
      name='reason'
      required
      options={
        data?.data?.map((reason) => ({
          label: reason.title,
          value: reason.id,
        })) ?? []
      }
    />
  );
}

export default ReportReasonSelectField;
