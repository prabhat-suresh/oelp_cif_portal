"use client"
import React from 'react';

export default function EquipmentDesc(props: { equipName: string, imageUrl: string, descUrl: string }) {
    return <div>
        <h2><b>{props.equipName}</b></h2>
        <img src={props.imageUrl} alt="" />
        <a href={props.descUrl}> Book equipment </a>
    </div>
}