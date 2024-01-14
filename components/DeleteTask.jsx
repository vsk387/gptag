'use client';

import { deleteTask2 } from "@/utils/actions";
import React from 'react'


const DeleteTask = ({id}) => {
  return (
    <form action={deleteTask2}>
        <input type='hidden' name='id' value={id}></input>
        <button className="btn btn-neutral">Delete</button>
    </form>
  )
}

export default DeleteTask