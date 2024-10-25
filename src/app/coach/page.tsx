import AddSlot from '@/components/AddSlot';
import SlotList from '@/components/SlotList';
import getSlots from '@/app/actions/getSlots';

import prisma from '@/lib/db';

const CoachDashboard = async () => {
  const coachId = 1;
  const coach = await prisma.user.findUnique({
    where: { id: coachId },
    select: { id: true, firstName: true, phoneNumber: true, role: true },
  });

  if (!coach) {
    throw new Error('User is null');
  }

  const slots = await getSlots(coachId);
  const slotList = slots.map((slot) => ({
    ...slot,
    startTime: slot.startTime.toISOString(),
  }));

  return (
    <div className="container mx-auto p-16">
      <h1 className="text-3xl font-bold mb-4">Coach Dashboard</h1>
      <p className="text-lg">Welcome {coach?.firstName}</p>
      <div className="space-y-8">
        <AddSlot />
        <SlotList slots={slotList} user={coach} />
      </div>
    </div>
  );
};

export default CoachDashboard;
