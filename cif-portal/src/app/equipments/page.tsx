// "use client"
import React from "react"
import Equipment1 from "@/components/equipment"
import axios from "axios";
// import Equipment from "@/models/equipmentModel";
import { GET } from "@/app/api/equipment/all/route"

export default async function Equipments() {
    try {
        const res = await axios.get('http://localhost:3000/api/equipment/all')
        const dat = res.data
        const status = dat.status
        if (status != 200) {
            return (
                <div>ERROR</div>
            )
        }
        const equipment_details = dat.equipment_details
        return (
            <div>
                {equipment_details.map(equipment => (
                    <div><Equipment1 {...{ equipName: equipment.equipmentName, imageUrl: "/" + equipment.equipmentName + ".jpeg", descUrl: "./equipments/equipment/" + equipment.equipmentName }} /></div>
                ))}
            </div>
        );
    }
    catch (err) {
        console.log(err)
    }
}