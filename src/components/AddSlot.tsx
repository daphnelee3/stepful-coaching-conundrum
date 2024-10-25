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
import { cn } from '@/lib/utils';

const AddSlot = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));

      const formData = new FormData();
      formData.append('startTime', dateTime.toISOString());

      await addSlot(formData);
      setSelectedDate(undefined);
      setSelectedTime('');
    } catch (error) {
      console.error('Failed to add slot:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (!selectedDate && !selectedTime) return 'Pick a date and time';
    if (!selectedDate) return 'Pick a date';
    if (!selectedTime) return `${format(selectedDate, 'PPP')} (pick time)`;

    const dateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    dateTime.setHours(parseInt(hours), parseInt(minutes));
    return format(dateTime, 'PPP p');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Add Availability Slot</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-[400px]"
      >
        <div className="space-y-2">
          <label htmlFor="datetime" className="block text-sm font-medium">
            Select Date and Time:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !selectedDate && 'text-muted-foreground'
                )}
              >
                {getButtonText()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    return date < now;
                  }}
                  className="rounded-md border"
                />

                <div className="flex flex-col gap-2">
                  <label htmlFor="time" className="text-sm font-medium">
                    Select Time:
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select a time</option>
                    {generateBusinessHourSlots().map((time) => (
                      <option key={time} value={time}>
                        {formatTime(time)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          type="submit"
          disabled={!selectedDate || !selectedTime || isSubmitting}
          className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add Slot'}
        </Button>
      </form>
    </div>
  );
};

function generateBusinessHourSlots() {
  const times: string[] = [];
  // Start from 8AM(8) to 8PM(20)
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');
      // Don't add 8:30PM
      if (hour === 20 && minute === 30) continue;
      times.push(`${hourStr}:${minuteStr}`);
    }
  }
  return times;
}

// 12-hour format
function formatTime(time: string) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export default AddSlot;
