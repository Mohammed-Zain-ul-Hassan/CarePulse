import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import AppointmentForm from '@/components/forms/AppointmentForm'
import * as Sentry from "@sentry/nextjs"

const NewAppointment = async ({params : {userId}} : SearchParamProps) => {
  const patient = await getPatient(userId)
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
            <Image 
                src= "/assets/icons/logo-full.svg"
                height={1000}
                width={1000}
                alt="patient"
                className="mb-12 h-10 w-fit"
            />

            <AppointmentForm
              type="create"
              userId={userId}
              patientId={patient.$id}
            />

            <p className="copyright mt-10 py-12">
              © 2024 CarePulse
            </p>
        </div>
      </section>
      <Image
  	    src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt = "patient"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default NewAppointment