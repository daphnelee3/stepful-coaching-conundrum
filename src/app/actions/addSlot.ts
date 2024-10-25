'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addSlot(formData: FormData) {
  const startTime = formData.get('startTime')?.toString();

  if (!startTime) {
    throw new Error('Start time is required');
  }

  try {
    const startDate = new Date(startTime);
    const twoHours = 2 * 60 * 60 * 1000;
    const existingSlots = await prisma.slot.findMany({
      where: {
        coachId: 1,
        startTime: {
          gte: new Date(startDate.getTime() - twoHours),
          lt: new Date(startDate.getTime() + twoHours),
        },
      },
    });

    if (existingSlots.length > 0) {
      throw new Error(
        'A slot already exists within 2 hours of the selected time.'
      );
    }

    const newSlot = await prisma.slot.create({
      data: {
        coachId: 1,
        startTime: startDate,
      },
    });

    revalidatePath('/coach');
    return newSlot;
  } catch (error) {
    console.error('Error adding slot:', error);
    throw new Error('Failed to add the slot. Please try again.');
  }
}

export default addSlot;
