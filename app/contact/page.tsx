import Backdrop from "../components/Backdrop";
import ContactForm from "../components/Contact";
import Link from "next/link";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white">
      <Backdrop />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>

          {/*ERROR: Link Tag (FIXED)*/}


          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
            Contact me.
          </h1>
          <p className="text-white text-base max-w-lg ">
            Say hi, present a bug in the website, or ask about collobarating. 
            <br />
            Keep my database alive.
          </p>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
