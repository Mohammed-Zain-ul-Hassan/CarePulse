// Inside appointment.actions.ts or equivalent file

'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

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


export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc(`$createdAt`)]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if(appointment.status === 'scheduled'){
                acc.scheduledCount += 1;
            }else if(appointment.status === 'pending'){
                acc.pendingCount += 1;
            }else if(appointment.status === 'cancelled'){
                acc.cancelledCount += 1;
            }
            return acc;
        },initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents,
        }
        return parseStringify(data);
    } catch (error) {
        console.log('Error in Fetching the recent appointment list : ',error)
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type} : UpdateAppointmentParams) => {

}