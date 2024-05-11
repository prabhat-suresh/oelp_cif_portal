"use client"
import React from "react"
import { useRouter } from 'next/router'
import Equipment1 from "@/components/equipment"
// import Equipment from "@/models/equipmentModel";

export default function Equipment() {
    const router = useRouter();

    const { id } = router.query;
    const equipDetails = { equipName: "kdfhbadksfj", imageUrl: "/TCS PS_0.jpg", descUrl: `./${id}/equipmentBooking` };
    return (
        <div>
            {/* <Equipment1 props={equipDetails} /> */}
            <h2>{equipDetails.equipName}</h2>
            <img src={equipDetails.imageUrl} alt="" />
            <a href={equipDetails.descUrl}> Book Equipment </a>
        </div>
    );
}