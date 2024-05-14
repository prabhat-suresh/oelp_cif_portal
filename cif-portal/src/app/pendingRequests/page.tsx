"use client"
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default async function PendingRequests() {
    const router = useRouter();
    const takeActionOnRequest = async (email: string, requestID: string, action: boolean) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/request/action",
                JSON.stringify({ email, requestID, action })
            );
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
        router.push("/");
    };

    try {
        const res = await axios.post(
            "http://localhost:3000/api/request/projectadmin",
            JSON.stringify({ email: "unnikrishnan@iitpkd.ac.in" })
        );
        const dat = res.data;
        const status = dat.status;
        if (status != 200) {
            return <div className="alert alert-danger">ERROR</div>;
        }
        return (
            <div className="container">
                <div className="card p-4">
                    <h2 className="text-center mb-4">Pending Requests</h2>
                    {Object.keys(dat.pendingRequests).map((projectName) => (
                        <div key={projectName}>
                            <h3>{projectName}</h3>
                            {dat.pendingRequests[projectName].map((request) => (
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
                                            onClick={() => takeActionOnRequest("unnikrishnan@iitpkd.ac.in", request._id, true)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#dc3545", color: "white" }}
                                            onClick={() => takeActionOnRequest("unnikrishnan@iitpkd.ac.in", request._id, false)}
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
    } catch (err) {
        console.log(err);
        return <div>Error loading data</div>;
    }
}
