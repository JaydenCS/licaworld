"use client";
import Image from "next/image";
import { Button } from "/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react"
import { SignalIcon } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
  const { data: session, status } = useSession()
    
  
  return (
<>
<div className="grid min-h-[100dvh] w-full grid-cols-1 lg:grid-cols-2">
  <div className="flex flex-col items-start justify-center gap-6 bg-gray-100 p-8 dark:bg-gray-800 lg:p-12">
  <div className="flex items-center -mt-80 gap-2">
  <MountainIcon className="h-6 w-6"  />
  <h3 className="font-semibold"> Lica World</h3>
</div>
    <div className="space-y-4 mt-52">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Grow your Audience While You Sleep</h1>
      <p className="text-gray-500 dark:text-gray-400 md:text-xl">Craft, Schedule, Test and Automate your linkedIn post in a single place.</p>
      <ul class="list-disc list-inside space-y-1.5 ">
                    <li class="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 shrink-0 opacity-75"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
                    Craft your LinkedIn post with Pre-built Templates
                    </li>
                    <li class="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 shrink-0 opacity-75"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
                    AI Assist for Brain Storming
                    </li>
                    <li class="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 shrink-0 opacity-75"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
                        Once Created, Save as Note for Lifetime
                        </li>
                        <li class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 shrink-0 opacity-75"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
                        A/B Test your Content and Analyze
                        </li>
                        <li class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 shrink-0 opacity-75"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
                        Get Clear Insights and Clarity
                        </li>
                </ul>
    </div>
    <Button
      type="submit"
      className="flex w-1/3 items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
      size="icon"
      variant="outline"
      onClick={() => signIn('linkedin', { callbackUrl: '/dashboard' })}
    >
      <LinkedinIcon className="h-5 w-5" />
      Sign in with LinkedIn
    </Button>
  </div>
  <div className="hidden lg:block">
    <img
      alt="Login"
      className="h-full w-full object-cover"
      height={800}
      src="/hero-image.jpg"
      style={{
        aspectRatio: "800/800",
        objectFit: "cover",
      }}
      width={800}
    />
  </div>
</div>
</>
  );
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}