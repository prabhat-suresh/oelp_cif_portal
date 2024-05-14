"use client"
import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function Booking() {
    return (
        <div>
            <h2><b> Check Available Slots</b> </h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
            <h2><b> Book Slot</b> </h2>
            <h3><b> Pick Start Time:</b> </h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker />
                </DemoContainer>
            </LocalizationProvider>

            <h3><b> Pick End Time:</b> </h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}