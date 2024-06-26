"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button, Snackbar, TextField } from '@mui/material';

export default function Booking({ params }: { params: { equipID: string } }) {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()));
    const [startTime, setStartTime] = useState(dayjs().startOf('hour'));
    const [endTime, setEndTime] = useState(dayjs().add(1, 'hour'));
    const [requestList, setRequestList] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        const fetchRequestList = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/bookedslot", {
                    date: selectedDate.format('YYYY-MM-DD'),
                    equipmentID: params.equipID
                });
                console.log("Response from API:", response);
                if (response.data && response.data.status === 200) {
                    setRequestList(response.data.request_list);
                } else {
                    console.error("Error fetching request list:", response.data);
                }
            } catch (error) {
                console.error("Error fetching request list:", error);
            }
        };

        fetchRequestList();
    }, [selectedDate, params.equipID]);

    const handleSubmitRequest = async () => {
        try {
            const res = await axios.get("/api/whoami")
            const email = res.data.email
            const response = await axios.post("http://localhost:3000/api/request", {
                equipmentID: params.equipID,
                email,
                startTime: selectedDate.format('YYYY-MM-DD') + "T" + startTime.format('HH:mm'),
                endTime: selectedDate.format('YYYY-MM-DD') + "T" + endTime.format('HH:mm'),
                projectName: projectName
            });
            if (response.data && response.data.status === 200) {
                setPopupMessage(response.data.message);
            } else {
                setPopupMessage(response.data.error || "Unknown error occurred");
            }
        } catch (error: any) {
            setPopupMessage("Error submitting request: " + error.message);
        }
        setOpenPopup(true);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1><b>Select a date to see booked slots</b></h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate}
                    onChange={(value) => handleDateChange(value)}
                />
            </LocalizationProvider>
            <div>{selectedDate.format('YYYY-MM-DD')}</div>
            <h2><b>Request List</b></h2>
            <div style={{ margin: 'auto', border: '1px solid black', padding: '10px', maxWidth: '500px' }}>
                {requestList.length > 0 ? (
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestList.map((request, index) => (
                                <tr key={index}>
                                    <td>{dayjs(request.startTime).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>{dayjs(request.endTime).format('YYYY-MM-DD HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No requests found for this date.</p>
                )}
            </div>
            <h2><b>Book Slot</b></h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <h3><b>Pick Start Time:</b></h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            value={startTime}
                            onChange={(newValue) => setStartTime(newValue)}
                            ampm={false}
                        />
                    </LocalizationProvider>
                </div>

                <div>
                    <h3><b>Pick End Time:</b></h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            value={endTime}
                            onChange={(newValue) => setEndTime(newValue)}
                            ampm={false}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TextField
                    label="Project Name"
                    variant="outlined"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </div>
            <Button variant="contained" onClick={handleSubmitRequest} style={{ backgroundColor: '#1976d2', color: '#fff', marginTop: '20px' }}>
                Submit Request
            </Button>
            <Snackbar
                open={openPopup}
                autoHideDuration={6000}
                onClose={() => setOpenPopup(false)}
                message={popupMessage}
            />
        </div>
    );
}
