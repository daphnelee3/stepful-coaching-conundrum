import getSlots from '@/app/actions/getSlots';
import { format, addHours } from 'date-fns';

const SlotList = async () => {
  const coachId = 1;
  const slots = await getSlots(coachId);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Upcoming Available Slots</h1>
      {slots.length > 0 ? (
        <ul className="list-disc">
          {slots.map((slot) => {
            const startTime = new Date(slot.startTime);
            const endTime = addHours(startTime, 2);
            return (
              <li key={slot.id}>
                <p>
                  Time: {format(startTime, 'PPp')} - {format(endTime, 'p')}
                </p>
                <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No upcoming slots available.</p>
      )}
    </>
  );
};
export default SlotList;
