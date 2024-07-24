import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getUser } from '@/lib/actions/patient.actions'
import * as Sentry from "@sentry/nextjs"

const Register = async ({params : {userId}} : SearchParamProps) => {
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification  | Passkey Modal*/}
      
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col">
          <Image 
            src= "/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user = {user}/>

            <p className="copyright py-12">
              © 2024 CarePulse
            </p>
        </div>
      </section>
      <Image
  	    src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt = "patient"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register