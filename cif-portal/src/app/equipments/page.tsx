"use client"
import React from "react"
import equipment from "@/components/equipment"
import Equipment from "@/models/equipmentModel";

export default function Equipments() {
    const equipDetails = { equipName: "kdfhbadksfj", imageUrl: "/TCS PS_0.jpg", descUrl: "./eqipment/1" };
    return (
        <div>
            <Equipment props={equipDetails} />
        </div>
    );
}