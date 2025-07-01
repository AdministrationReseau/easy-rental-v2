'use client';

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarIcon as LucideCalendarIcon, PlusCircle } from "lucide-react"; // Renamed to avoid conflict with react-calendar
import Calendar from "react-calendar"; // Using react-calendar
import 'react-calendar/dist/Calendar.css'; // Default styling for react-calendar
import '@/components/styles/Calendar.css'; // Your custom styles for react-calendar

import { VehicleProps, SchedulingData } from '@/types/classes/Vehicle'; // <<<< UPDATED IMPORT PATH
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button } from "@mui/material"; // For the modal

interface OrgResourceCalendarProps {
  requestedResource: VehicleProps; // Expecting the full VehicleProps
  // showAddButton?: boolean; // To control if the add schedule button is visible
}

interface DateRange {
  start: string | Date;
  end: string | Date;
  type: "day-off" | "scheduled-range"; // From old OrgResourceCalendar
}

// Helper function to check if a date is within any of the defined ranges
const isDateInRange = (date: Date, ranges?: DateRange[]): string | null => {
  if (!ranges || ranges.length === 0) return null;
  const targetDate = new Date(date).setHours(0, 0, 0, 0);
  for (const range of ranges) {
    const start = new Date(range.start).setHours(0, 0, 0, 0);
    const end = new Date(range.end).setHours(0, 0, 0, 0);
    if (targetDate >= start && targetDate <= end) {
      return range.type; // 'day-off' or 'scheduled-range'
    }
  }
  return null;
};

const OrgResourceCalendar: React.FC<OrgResourceCalendarProps> = ({ requestedResource }) => {
  // Extract scheduling from VehicleProps or use a default
  const initialSchedulingData: SchedulingData = requestedResource.scheduling || { days_off: [], scheduled_ranges: [] };

  const [scheduleData, setScheduleData] = useState<DateRange[]>([
    ...(initialSchedulingData.days_off?.map(d => ({ ...d, type: "day-off" as const })) || []),
    ...(initialSchedulingData.scheduled_ranges?.map(d => ({ ...d, type: "scheduled-range" as const })) || []),
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState<DateRange>({
    start: new Date().toISOString().split('T')[0], // Default to today
    end: new Date().toISOString().split('T')[0],   // Default to today
    type: "day-off",
  });

  const handleAddSchedule = () => {
    if (newSchedule.start && newSchedule.end) {
      // Basic validation: end date should not be before start date
      if (new Date(newSchedule.end) < new Date(newSchedule.start)) {
        alert("End date cannot be before start date.");
        return;
      }
      // TODO: Add overlap validation if necessary
      setScheduleData(prev => [...prev, newSchedule]);
      setModalOpen(false);
      // Reset form
      setNewSchedule({
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
        type: "day-off",
      });
      // Here you would typically also call a service to save the schedule update
      console.log("New schedule added (mock):", newSchedule);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle className="flex items-center gap-2">
          <LucideCalendarIcon className="h-5 w-5 text-blue-500" />
          Resource Scheduling
        </CardTitle>
        {/* showAddButton prop can be used here if needed */}
        <Button onClick={() => setModalOpen(true)} startIcon={<PlusCircle size={18}/>} variant="outlined" size="small">
           Add Schedule
        </Button>
      </CardHeader>
      <CardContent>
        <Calendar
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const rangeType = isDateInRange(date, scheduleData);
              if (rangeType === "day-off") return "day-off";
              if (rangeType === "scheduled-range") return "scheduled-range";
              if (date < new Date() && date.toDateString() !== new Date().toDateString()) return "past-date";
            }
            return null;
          }}
          tileDisabled={({ date }) => date < new Date() && date.toDateString() !== new Date().toDateString()} // Disable past dates except today
        />
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 border border-yellow-600 rounded-full"></span><span className="text-xs">Today</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 day-off rounded-full"></span><span className="text-xs">Day Off</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 scheduled-range rounded-full"></span><span className="text-xs">Scheduled</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 past-date rounded-full"></span><span className="text-xs">Past Date</span></div>
        </div>
      </CardContent>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add New Schedule Entry</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Start Date"
            type="date"
            value={newSchedule.start.toString().split('T')[0]}
            onChange={(e) => setNewSchedule({ ...newSchedule, start: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            inputProps={{ min: today }}
          />
          <TextField
            label="End Date"
            type="date"
            value={newSchedule.end.toString().split('T')[0]}
            onChange={(e) => setNewSchedule({ ...newSchedule, end: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            inputProps={{ min: newSchedule.start.toString().split('T')[0] || today }} // End date cannot be before start date
          />
          <TextField
            label="Type"
            select
            value={newSchedule.type}
            onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value as "day-off" | "scheduled-range" })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="day-off">Day Off</MenuItem>
            <MenuItem value="scheduled-range">Scheduled Range</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleAddSchedule} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrgResourceCalendar;
