import { prisma } from '@/lib/prisma';

export async function assignRole(userId: string, roleName: string) {
  // 1. Ensure role exists
  const role = await prisma.role.upsert({
    where: { name: roleName },
    update: {},
    create: { name: roleName },
  });

  // 2. Create or update user role
  const userRole = await prisma.userRole.findFirst({
    where: { userId },
  });

  if (userRole) {
    // Update existing role
    await prisma.userRole.update({
      where: { id: userRole.id },
      data: { roleId: role.id },
    });
  } else {
    // Create new user role
    await prisma.userRole.create({
      data: {
        userId,
        roleId: role.id,
      },
    });
  }

  return { role, userRole };
}
