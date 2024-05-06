"use client";
import Link from "next/link"
import { useSession,signOut } from "next-auth/react"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { useState} from "react"
import { 
  DropdownMenuTrigger,
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu } from "/components/ui/dropdown-menu"
import { Textarea } from "/components/ui/textarea"
import { useRef } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";
import { useEffect } from "react";


export default function Dashboard() {
   const { data: session, status } = useSession()
   console.log(session)
    const fileInputRef = useRef(null)
   const [text , setText] = useState('')
   const [isimage , setIsImage] = useState(false)
   const [previewImage , setPreviewImage] = useState(null)
  const handleTextChange = (e) => {
        setText(e.target.value)
    }

  const handleImageUpload = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsImage(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      };
      reader.readAsDataURL(file)
    }
  }

  const PostContent = async () => {
    // check if is image false
    const useridresponse = await fetch('/api/fetchid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    const userid = await useridresponse.json();
    if(useridresponse.status === 401){
      toast.error('User Not Found')
    }

    if(isimage === true){
      // make api call to create asset
      const assetresponse = await fetch('/api/registerimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userid.id
        }),
      });
  
      const asset = await assetresponse.json();

      if(assetresponse.status === 200)
        {
           const formData = new FormData()
           formData.append('uploadUrl',asset.uploadUrl)
           formData.append('file',fileInputRef.current.files[0])
          const uploadresponse = await fetch('/api/uploadimage', {
            method: 'POST',
            body: formData
          });

          const upload = await uploadresponse.json();

          if (uploadresponse.status === 200){
            // make api call to post image and text
            const postresponse = await fetch('/api/postimage',{
              method:"POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: userid.id,
                text: text,
                uploadid: asset.uploadId
              })
            });
      
            const post = await postresponse.json();
        
            if(postresponse.status === 200){
              toast.success("Post Created Successfully")
            }
            else{
              toast.error("Posting Failed")
            }
        
          }
        }else{
          toast.error('Asset Creation Failed, Try Again')
        }
  
  
      
    }else{  //       
  
      // make api call to post text
      const postresponse = await fetch('/api/posttext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userid.id,
          text: text
        }),
      }
      )
  
      const post = await postresponse.json();
  
      if(postresponse.status === 200){
        toast.success('Post Created Successfully')
      }else{
        toast.error('Post Creation Failed')
      }
      
  }  
}
  return (
    <>
    <ToastContainer/>
    <div className="flex min-h-screen w-full">
      <div className="hidden max-h-screen w-[280px] flex-col border-r bg-gray-100/40 p-4 dark:bg-gray-800/40 lg:flex">

        {/* Side Bar */}
        <div className="flex h-[60px]  items-center justify-between">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <MountainIcon className="h-6 w-6" />
            <span>Lica World</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 overflow-auto h-full py-4">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>

          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
          <Link className="lg:hidden" href="#">
            <MountainIcon className="h-6 w-6 mr-3" />
            <span className="sr-only">Lica World</span>
          </Link>
          <div className="flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search Post Templates..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/profile.jpg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {session && (
                  <>
                  {session.user?.name}
                  </>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: '/'})}
              >
                Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Create Your LinkedIn Post</h1>
          </div>
          <div className="mt-6 gap-6">
            <div className="m-12 h-56">
              <div className="relative group">
                <Textarea
                  name="textarea"
                  onChange={handleTextChange}
                  className="min-h-[500px] w-full rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-none transition-colors focus:border-gray-900 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
                  placeholder="Start creating your post..."
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    size="icon"
                    variant="ghost"
                    onClick={handleImageUpload}
                  >
                    <UploadIcon className="h-5 w-5" />
                    <span className="sr-only">Upload Image</span>
                  </Button>
                  <Button
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    size="icon"
                    variant="ghost"
                    onClick={PostContent}
                  >
                    <SendIcon className="h-5 w-5" />
                    <span className="sr-only">Post</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {isimage && (
        
            <div className="flex items-center justify-center">
              <img
                className="w-1/4 mt-64 h-1/4 object-cover shadow-sm rounded-lg"
                alt="Preview"
                src={previewImage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  )
}
function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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


function SaveIcon(props) {
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
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

