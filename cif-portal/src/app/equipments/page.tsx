// "use client"
import React from "react"
import Equipment1 from "@/components/equipment"
// import Equipment from "@/models/equipmentModel";
import { GET } from "@/app/api/equipment/all/route"

export default async function Equipments() {
    const equipDetails = { equipName: "kdfhbadksfj", imageUrl: "/TCS PS_0.jpg", descUrl: "./equipments/equipment/1" };
    try {
        const res = await fetch('http://localhost:3000/api/equipment/all')
        console.log(res)
    }
    catch (err) {
        console.log("API Not working")
    }
    return (
        <div>
            <Equipment1 {...equipDetails} />
            <Equipment1 {...equipDetails} />
            <Equipment1 {...equipDetails} />
        </div>
    );
}