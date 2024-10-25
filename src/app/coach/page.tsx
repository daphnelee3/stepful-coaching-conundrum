import AddSlot from '@/components/AddSlot';

const CoachDashboard = async () => {
  return (
    <div className="container mx-auto p-16">
      <h1 className="text-3xl font-bold mb-4">Coach Dashboard</h1>
      <p className="text-lg">Welcome *insert name*</p>
        <AddSlot />
    </div>
  );
};

export default CoachDashboard;
