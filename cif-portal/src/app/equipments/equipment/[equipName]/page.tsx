// "use client"
import React from "react"
// import { useRouter } from 'next/router'
// import { useParams } from 'next/navigation'
import EquipmentDesc from "@/components/equipment_desc"
import axios from "axios";
// import Equipment from "@/models/equipmentModel";
import { GET } from "@/app/api/equipment/all/route"

export default async function Equipment({
    params,
}: {
    params: { equipName: string };
}) {
    // const params = useParams<{ equipName: string }>();
    // console.log(params)

    // const { equipName } = router.query;
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
                {equipment_details.filter((element, index, array) => params.equipName == element.equipmentName.replaceAll(" ", "%20")).map(equipment => (
                    <div><EquipmentDesc {...{ equipName: equipment.equipmentName, imageUrl: "/" + equipment.equipmentName + ".jpeg", description: equipment.description, bookUrl: "./" + equipment.equipmentName + "/equipmentBooking", availableQuantity: equipment.availableQuantity }} /></div>
                ))}
            </div>
        );
    }
    catch (err) {
        console.log(err)
    }

}