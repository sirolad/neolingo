'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/lib/auth/server-auth';
import { logAudit } from '@/lib/audit';

type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

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
  reason?: string
) {
  try {
    // Verify user has permission to review requests
    const { user } = await requirePermission('review:requests');

    await prisma.translationRequest.update({
      where: { id: requestId },
      data: {
        status,
        approvedById: status === 'APPROVED' ? user.id : null,
        rejectionReason: reason,
      },
    });

    // Log the review action for audit trail
    await logAudit({
      userId: user.id,
      action: `review:request:${status.toLowerCase()}`,
      resourceId: requestId.toString(),
      metadata: { reason },
    });

    revalidatePath('/admin/requests');
    revalidatePath('/home');
    return { success: true };
  } catch (error) {
    // Handle authorization errors specifically
    if (
      error instanceof Error &&
      (error.message.includes('Unauthorized') ||
        error.message.includes('Forbidden'))
    ) {
      return { success: false, error: error.message };
    }

    console.error('Failed to review request:', error);
    return { success: false, error: 'Failed to update request status' };
  }
}
