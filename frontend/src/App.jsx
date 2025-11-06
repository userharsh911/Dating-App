import {Outlet} from "react-router-dom"
import Header from "../pages/Header"
import Footer from "../pages/Footer"
import toast, { Toaster } from 'react-hot-toast';
import userStore from "../store/userStore"
import { useEffect } from "react"

function App() {
  const {getUser} = userStore((state)=>state);
  useEffect(()=>{
    getUser();
    console.log("workingg...")
  },[getUser])

  return (
    <>
      <div className="flex h-lvh bg-base-300 w-full">
        <Toaster />
        <Header/>
          <main className="w-full">
            <Outlet/>
          </main>
      </div>
    </>
  )
}

export default App
