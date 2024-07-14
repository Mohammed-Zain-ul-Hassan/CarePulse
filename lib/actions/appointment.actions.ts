// Inside appointment.actions.ts or equivalent file

'use server'

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const CreateAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        console.log('Database ID ',DATABASE_ID);
        console.log("Creating appointment with data:", appointment);
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        );

        console.log("Appointment created successfully:", newAppointment);

        return parseStringify(newAppointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        //throw error; // Re-throw the error to propagate it back to the caller
    }
}


export const getAppointment = async (appointmentId : string) => {
    try {
         const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
         )

        return parseStringify(appointment);
    } catch (error) {
        console.log("Error getting the appointment details : ",error)
    }
}
