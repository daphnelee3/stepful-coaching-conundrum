import AddSlot from '@/components/AddSlot';
import SlotList from '@/components/SlotList';
import prisma from '@/lib/db';

const CoachDashboard = async () => {
  const coachId = 1;
  const coach = await prisma.user.findUnique({
    where: { id: coachId },
  });

  return (
    <div className="container mx-auto p-16">
      <h1 className="text-3xl font-bold mb-4">Coach Dashboard</h1>
      <p className="text-lg">Welcome {coach?.firstName}</p>
      <div className="space-y-8">
        <AddSlot />
        <SlotList />
      </div>
    </div>
  );
};

export default CoachDashboard;
