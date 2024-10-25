'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function bookSlot(slotId: number, studentId: number) {
  const slot = await prisma.slot.findUnique({
    where: { id: slotId },
  });

  if (!slot) {
    throw new Error('Slot not found');
  }

  if (slot.isBooked) {
    throw new Error('This slot is already booked');
  }

  const booking = await prisma.booking.create({
    data: {
      slotId: slotId,
      studentId: studentId,
    },
  });

  await prisma.slot.update({
    where: { id: slotId },
    data: { isBooked: true },
  });

  revalidatePath('/student');
  return booking;
}

export default bookSlot;
