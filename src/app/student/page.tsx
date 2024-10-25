import SlotList from '@/components/SlotList';
import prisma from '@/lib/db';
import getSlots from '@/app/actions/getSlots';

const StudentDashboard = async () => {
  const coachId = 1;
  const studentId = 2;
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: { id: true, firstName: true, phoneNumber: true, role: true },
  });
  if (!student) {
    throw new Error('User is null');
  }

  const slots = await getSlots(coachId);
  const slotList = slots.map((slot) => ({
    ...slot,
    startTime: slot.startTime.toISOString(),
  }));

  return (
    <div className="container mx-auto p-16">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-lg">Welcome {student?.firstName}</p>
      <div className="space-y-8">
        <div>Book time with a coach!</div>
        <SlotList slots={slotList} user={student} />
      </div>
    </div>
  );
};

export default StudentDashboard;
