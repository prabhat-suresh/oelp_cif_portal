"use client"
import React from 'react';

export default function EquipmentDesc(props: { equipName: string, imageUrl: string, bookUrl: string, description: string, availableQuantity: number }) {
    return <div>
        <h2><b>{props.equipName}</b></h2>
        <img src={props.imageUrl} alt="" />
        <p>{props.description}</p>
        <div>Number of equipments available: {props.availableQuantity}</div>
        <a href={props.bookUrl}> Book equipment </a>
    </div>
}