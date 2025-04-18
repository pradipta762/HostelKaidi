import { useState } from 'react'
import QRScanner from './Components/QRCode/QRScanner'
import './App.css'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto px-4 pb-16"> {/* pb-16 to avoid overlap with footer */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
