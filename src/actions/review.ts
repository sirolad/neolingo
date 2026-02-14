'use server';

import { prisma } from '@/lib/prisma'; // Assuming prisma client is exported from here
import { RequestStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getPendingRequests(limit = 10, offset = 0) {
  try {
    const requests = await prisma.translationRequest.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        user: true,
        sourceLanguage: true,
        targetLanguage: true,
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: requests };
  } catch (error) {
    console.error('Failed to fetch pending requests:', error);
    return { success: false, error: 'Failed to fetch requests' };
  }
}

export async function reviewRequest(
  requestId: number,
  status: RequestStatus,
  reviewerId: string,
  reason?: string
) {
  try {
    await prisma.translationRequest.update({
      where: { id: requestId },
      data: {
        status,
        approvedById: status === 'APPROVED' ? reviewerId : null,
        rejectionReason: reason,
      },
    });

    revalidatePath('/admin/requests');
    revalidatePath('/home');
    return { success: true };
  } catch (error) {
    console.error('Failed to review request:', error);
    return { success: false, error: 'Failed to update request status' };
  }
}
