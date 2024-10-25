'use client';

import { useState } from 'react';
import bookSlot from '@/app/actions/bookSlot';
import { toast } from 'react-toastify';

type User = {
  id: number;
  phoneNumber: string;
  role: 'COACH' | 'STUDENT';
};

type Slot = {
  id: number;
  startTime: string;
  duration: number;
  isBooked: boolean;
};

type SlotListProps = {
  slots: Slot[];
  user: User;
};

const SlotList = ({ slots: initialSlots, user }: SlotListProps) => {
  const [slots, setSlots] = useState(initialSlots);

  const handleBookSlot = async (slotId: number) => {
    try {
      const studentId = 2;
      const updatedSlot = await bookSlot(slotId, studentId);

      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === slotId
            ? { ...slot, ...updatedSlot, isBooked: true }
            : slot
        )
      );

      toast.success('Slot booked successfully');
    } catch (error) {
      console.error('Failed to book slot:', error);
      toast.error('Failed to book slot');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Available Slots</h2>
      <ul className="space-y-4">
        {slots.map((slot) => (
          <li key={slot.id} className="border rounded-lg p-4">
            <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
            <p>Duration: {slot.duration} minutes</p>
            <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>

            {slot.isBooked && (
              <div className="mt-2">
                {user.role === 'COACH' && user.phoneNumber && (
                  <p>Student Phone: {user.phoneNumber}</p>
                )}
                {user.role === 'STUDENT' && user.phoneNumber && (
                  <p>Coach Phone: {user.phoneNumber}</p>
                )}
              </div>
            )}

            {user.role === 'STUDENT' && !slot.isBooked && (
              <button
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => handleBookSlot(slot.id)}
              >
                Book Slot
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotList;
