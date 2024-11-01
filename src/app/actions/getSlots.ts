'use server';

import prisma from '@/lib/db';

async function getSlots(coachId: number) {
  const slots = await prisma.slot.findMany({
    where: {
      coachId: coachId,
      startTime: {
        gte: new Date(),
      },
    },
    include: {
      coach: { select: { id: true, phoneNumber: true } },
      booking: {
        include: {
          student: { select: { id: true, phoneNumber: true } },
        },
      },
    },
    orderBy: {
      startTime: 'asc',
    },
  });

  return slots;
}

export default getSlots;
