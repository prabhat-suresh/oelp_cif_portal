"use client"
import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function Booking({
    params,
}: {
    params: { equipID: string };
}) {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()));

    let res = axios.post("http://localhost:3000/api/bookedslot",
        JSON.stringify({
            date: JSON.stringify(selectedDate).split('T')[0],
            equipmentID: params.equipID
        }))
    const [bookedSlots, changeBookedSlots] = useState(res)
    console.log(bookedSlots)


    const setNewValue = async (value: any) => {
        try {
            handleDateChange(value);
            const res = await axios.post("http://localhost:3000/api/bookedslot",
                JSON.stringify({
                    date: JSON.stringify(selectedDate).split('T')[0],
                    equipmentID: params.equipID
                }));
            changeBookedSlots(res);
            console.log(res);
            console.log("State changed");
        }
        catch {
            console.log("error")
        }
    }
    return (
        <div>
            <h1><b> Select a date to see booked slots </b></h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate}
                    onChange={(value => setNewValue(value))} />
            </LocalizationProvider>
            <div>{JSON.stringify(selectedDate).split('T')[0]}</div>
            <div>{JSON.stringify(bookedSlots)}</div>
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