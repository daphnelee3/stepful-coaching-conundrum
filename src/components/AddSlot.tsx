'use client';

import addSlot from '@/app/actions/addSlot';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const AddSlot = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const formData = new FormData();
    formData.append('startTime', selectedDate.toISOString());

    try {
      await addSlot(formData);
      setSelectedDate(undefined);
    } catch (error) {
      console.error('Failed to add slot:', error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mt-4">Add Availability Slot</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-[400px] pb-8"
      >
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium mb-2">
            Select Date and Time:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {selectedDate
                  ? format(selectedDate, 'PPP p')
                  : 'Pick a date and time'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-lg"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          type="submit"
          disabled={!selectedDate}
          className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-700"
        >
          Add Slot
        </Button>
      </form>
    </>
  );
};

export default AddSlot;
