"use client"
import React from "react"
import Equipment1 from "@/components/equipment"
// import Equipment from "@/models/equipmentModel";

export default function Equipments() {
    const equipDetails = { equipName: "kdfhbadksfj", imageUrl: "/TCS PS_0.jpg", descUrl: "./equipments/equipment/1" };
    return (
        <div>
            <Equipment1 {...equipDetails} />
            <Equipment1 {...equipDetails} />
            <Equipment1 {...equipDetails} />
        </div>
    );
}