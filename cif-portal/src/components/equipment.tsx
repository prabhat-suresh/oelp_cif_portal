"use client"
import React from 'react';

export default function Equipment1(props: { equipName: string, imageUrl: string, descUrl: string }) {
  return <div>
    <h2>{props.equipName}</h2>
    <img src={props.imageUrl} alt="" />
    <a href={props.descUrl}> Book Equipment </a>
  </div>
}
// import React from "react";

// interface EquipmentProps {
//   equipDetails: Record<string, any>; // JSON object type
// }

// const Equipment: React.FC<EquipmentProps> = ({ equipDetails }) => {
//   return (
//     <div>
//       <h2>{equipDetails.name}</h2>
//       <a href={equipDetails.imageUrl}>Image Link</a>
//       <a href={equipDetails.descUrl}>Description Link</a>
//     </div>
//   );
// };
// export default Equipment;
