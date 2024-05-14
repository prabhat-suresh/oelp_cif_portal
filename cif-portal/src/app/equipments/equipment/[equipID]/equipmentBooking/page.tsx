"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Assuming you're using a custom DemoContainer
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button, Snackbar, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

export default function Booking({ params }: { params: { equipID: string } }) {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()));
    const [requestList, setRequestList] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');

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

        // Fetch projects when component mounts
        fetchProjects();
    }, [selectedDate, params.equipID]);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/whoami');
            console.log(res, "yoooo")
            const email = res.data.email;
            const projectResponse = await axios.post(`/api/profile/project`, JSON.stringify({ email: email }));
            if (projectResponse.data && projectResponse.data.currentProject) {
                setProjects(projectResponse.data.currentProject);
            } else {
                console.error("Error fetching projects:", projectResponse.data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleSubmitRequest = async () => {
        try {
            const res = await axios.get('/api/whoami');
            const email = res.data.email;
            const response = await axios.post("http://localhost:3000/api/request", {
                date: selectedDate.format('YYYY-MM-DD'),
                equipmentID: params.equipID,
                email: email,
                projectName: selectedProject
            });
            if (response.data && response.data.status === 200) {
                setPopupMessage(response.data.message);
            } else {
                setPopupMessage(response.data.error || "Unknown error occurred");
            }
        } catch (error : any) {
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
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker ampm={false} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div>
                    <h3><b>Pick End Time:</b></h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker ampm={false} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            <FormControl style={{ minWidth: 200, margin: '20px 0' }}>
                <InputLabel id="project-select-label">Select Your Project</InputLabel>
                <Select
                    labelId="project-select-label"
                    id="project-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    {projects.map((project, index) => (
                        <MenuItem key={index} value={project}>{project}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSubmitRequest} style={{ backgroundColor: '#1976d2', color: '#fff' }}>
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
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Assuming you're using a custom DemoContainer
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { Button, Snackbar } from '@mui/material';
//
// export default function Booking({ params }: { params: { equipID: string } }) {
//     const [selectedDate, handleDateChange] = useState(dayjs(new Date()));
//     const [requestList, setRequestList] = useState([]);
//     const [popupMessage, setPopupMessage] = useState('');
//     const [openPopup, setOpenPopup] = useState(false);
//
//     useEffect(() => {
//         const fetchRequestList = async () => {
//             try {
//                 const response = await axios.post("http://localhost:3000/api/bookedslot", {
//                     date: selectedDate.format('YYYY-MM-DD'),
//                     equipmentID: params.equipID
//                 });
//                 console.log("Response from API:", response);
//                 if (response.data && response.data.status === 200) {
//                     setRequestList(response.data.request_list);
//                 } else {
//                     console.error("Error fetching request list:", response.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching request list:", error);
//             }
//         };
//
//         fetchRequestList();
//     }, [selectedDate, params.equipID]);
//
//     const handleSubmitRequest = async () => {
//         try {
//             const res = await axios.get('/api/whoami');
//             console.log(res);
//             const email = res.data.email
//             const response = await axios.post("http://localhost:3000/api/request", {
//                 date: selectedDate.format('YYYY-MM-DD'),
//                 equipmentID: params.equipID,
//                 email: email,
//                 projectName: /*<add via a textbox>*/
//             });
//             if (response.data && response.data.status === 200) {
//                 setPopupMessage(response.data.message);
//             } else {
//                 setPopupMessage(response.data.error || "Unknown error occurred");
//             }
//         } catch (error: any) {
//             setPopupMessage("Error submitting request: " + error.message);
//         }
//         setOpenPopup(true);
//     };
//
//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h1><b>Select a date to see booked slots</b></h1>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar
//                     value={selectedDate}
//                     onChange={(value) => handleDateChange(value)}
//                 />
//             </LocalizationProvider>
//             <div>{selectedDate.format('YYYY-MM-DD')}</div>
//             <h2><b>Request List</b></h2>
//             <div style={{ margin: 'auto', border: '1px solid black', padding: '10px', maxWidth: '500px' }}>
//                 {requestList.length > 0 ? (
//                     <table style={{ width: '100%' }}>
//                         <thead>
//                             <tr>
//                                 <th>Start Time</th>
//                                 <th>End Time</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {requestList.map((request, index) => (
//                                 <tr key={index}>
//                                     <td>{dayjs(request.startTime).format('YYYY-MM-DD HH:mm')}</td>
//                                     <td>{dayjs(request.endTime).format('YYYY-MM-DD HH:mm')}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No requests found for this date.</p>
//                 )}
//             </div>
//             <h2><b>Book Slot</b></h2>
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <div style={{ marginRight: '20px' }}>
//                     <h3><b>Pick Start Time:</b></h3>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DemoContainer components={['TimePicker']}>
//                             <TimePicker ampm={false} />
//                         </DemoContainer>
//                     </LocalizationProvider>
//                 </div>
//
//                 <div>
//                     <h3><b>Pick End Time:</b></h3>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DemoContainer components={['TimePicker']}>
//                             <TimePicker ampm={false} />
//                         </DemoContainer>
//                     </LocalizationProvider>
//                 </div>
//             </div>
//             <Button variant="contained" onClick={handleSubmitRequest} style={{ backgroundColor: '#1976d2', color: '#fff' }}>
//                 Submit Request
//             </Button>
//             <Snackbar
//                 open={openPopup}
//                 autoHideDuration={6000}
//                 onClose={() => setOpenPopup(false)}
//                 message={popupMessage}
//             />
//         </div>
//     );
// }
