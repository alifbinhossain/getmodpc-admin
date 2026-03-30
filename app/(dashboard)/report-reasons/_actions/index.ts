'use server';

import { revalidatePath } from 'next/cache';

import { CreateReportReasonPayload } from '@/types/report-reason';

import { reportReasonsService } from '../_config/report-reasons.service';

export async function updateReportReason<T>(id: string, payload: T) {
  await reportReasonsService.updateReportReason({
    id,
    ...payload,
  });
  revalidatePath('/report-reasons');
}

export async function createReportReason<T>(payload: T) {
  await reportReasonsService.createReportReason(
    payload as CreateReportReasonPayload
  );
  revalidatePath('/report-reasons');
}

export async function deleteReportReason(id: string) {
  await reportReasonsService.deleteReportReason(id);
  revalidatePath('/report-reasons');
}
