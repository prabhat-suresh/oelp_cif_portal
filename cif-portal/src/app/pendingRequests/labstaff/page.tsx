"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function PendingRequests() {
    const router = useRouter();
    const [email, setEmail] = useState(""); // State to store the email
    const [pendingRequests, setPendingRequests] = useState(null); // State to store pending requests

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/api/whoami");
                const userEmail = resp.data.email;
                setEmail(userEmail);
            } catch (error) {
                console.error("Error fetching email:", error);
            }
        };

        fetchEmail();
    }, []);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:3000/api/request/labstaff",
                    JSON.stringify({ email })
                );
                const dat = res.data;
                const status = dat.status;
                if (status !== 200) {
                    throw new Error("Failed to fetch pending requests");
                }
                setPendingRequests(dat.pendingRequests);
            } catch (err) {
                console.error("Error fetching pending requests:", err.message);
            }
        };

        if (email) {
            fetchPendingRequests();
        }
    }, [email]);

    const takeActionOnRequest = async (requestID, action) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/request/action",
                JSON.stringify({ email, requestID, action })
            );
            console.log(res.data);
            router.refresh(); // Refresh router after action
        } catch (err) {
            console.error(err);
        }
    };

    if (!pendingRequests) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="card p-4">
                <h2 className="text-center mb-4">Pending Requests</h2>
                {Object.keys(pendingRequests).map((projectName) => (
                    <div key={projectName}>
                        <h3>{projectName}</h3>
                        {pendingRequests[projectName].map((request) => (
                            <div
                                key={request.id}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div>
                                    <strong>Start Time:</strong>{" "}
                                    {dayjs(request.startTime).format("YYYY-MM-DD HH:mm:ss")}
                                    <br />
                                    <strong>End Time:</strong>{" "}
                                    {dayjs(request.endTime).format("YYYY-MM-DD HH:mm:ss")}
                                </div>
                                <div>
                                    <button
                                        className="btn me-2"
                                        style={{ backgroundColor: "#28a745", color: "white" }}
                                        onClick={() => takeActionOnRequest(request._id, true)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: "#dc3545", color: "white" }}
                                        onClick={() => takeActionOnRequest(request._id, false)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
