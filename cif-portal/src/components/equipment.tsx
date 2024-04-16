// "use client"
// import React from 'react';
// export default function equipment({equipDetails}){
//   return <div>
//       h2{equipDetails.name}
//       <a href={equipDetails.imageUrl}>link</a>
//       <a href={equipDetails.descUrl}>link</a>
//   </div>
// }
import React from "react";

interface EquipmentProps {
  equipDetails: Record<string, any>; // JSON object type
}

const Equipment: React.FC<EquipmentProps> = ({ equipDetails }) => {
  return (
    <div>
      <h2>{equipDetails.name}</h2>
      <a href={equipDetails.imageUrl}>Image Link</a>
      <a href={equipDetails.descUrl}>Description Link</a>
    </div>
  );
};
export default Equipment;
