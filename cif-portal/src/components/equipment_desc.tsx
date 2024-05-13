"use client"
import React from 'react';

export default function EquipmentDesc(props: { equipName: string, imageUrl: string, bookUrl: string }) {
    return <div>
        <h2><b>{props.equipName}</b></h2>
        <img src={props.imageUrl} alt="" />
        <a href={props.bookUrl}> Book equipment </a>
    </div>
}