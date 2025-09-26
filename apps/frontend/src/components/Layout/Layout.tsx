// components/Layout/Layout.tsx
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Play, Settings, Info, ChevronLeft, ChevronRight, Menu, X, UserRoundPlus,UserCheck } from "lucide-react";

const menuItems = [
  { attribute: "Home", value: "/", icon: <Home className="w-5 h-5" /> },
  { attribute: "Play", value: "/match", icon: <Play className="w-5 h-5" /> },
  { attribute: "Settings", value: "/settings", icon: <Settings className="w-5 h-5" /> },
  { attribute: "About", value: "/about", icon: <Info className="w-5 h-5" /> },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar 
        menuItems={menuItems} 
        open={sidebarOpen} 
        setOpen={setSidebarOpen} 
        navigate={navigate}
        currentPath={location.pathname}
      />
      
      {/* Main Content Area */}
      <div 
        className={`
          flex-1 relative min-h-screen transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}
        `}
      >
        <Outlet />
      </div>
    </div>
  );
}

function Sidebar({ 
  menuItems, 
  open, 
  setOpen, 
  navigate,
  currentPath
}: { 
  menuItems: { attribute: string; value: string; icon: React.ReactElement }[]; 
  open: boolean;
  setOpen: (open: boolean) => void;
  navigate: (path: string) => void;
  currentPath: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignOut = () => {
    // Add your sign out logic here
    setIsSignedIn(false);
    navigate("/");
  };
  
  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-slate-700/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-40">
        <button 
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 backdrop-blur-sm"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-2xl animate-pulse">♟</div>
          <span className="text-white font-bold text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text">
            MyChess
          </span>
        </div>
      </div>

      {/* Mobile spacing div */}
      <div className="md:hidden h-20"></div>

      {/* Desktop Sidebar */}
      <div
        className={`
          hidden md:flex fixed top-0 left-0 h-screen 
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          text-slate-300 flex-col transition-all duration-300 ease-in-out z-50
          border-r border-slate-700/30 backdrop-blur-xl
          shadow-2xl shadow-black/20
          ${open ? "w-64" : "w-20"}
        `}
      >
        {/* Logo Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative flex items-center justify-between px-6 py-6 border-b border-slate-700/50">
            {open && (
              <div className="flex items-center gap-3">
                <div className="text-3xl animate-bounce">♟</div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  MyChess
                </h1>
              </div>
            )}
            {!open && (
              <div className="text-3xl animate-pulse mx-auto">♟</div>
            )}
            <button 
              onClick={() => setOpen(!open)} 
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 text-slate-400 hover:text-white ml-auto"
            >
              {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-2 mt-6 px-3">
          {menuItems.map((item, index) => (
            <NavItem 
              key={index} 
              item={item} 
              open={open} 
              isActive={currentPath === item.value}
              onClick={() => navigate(item.value)}
            />
          ))}
        </nav>

        {/* Company Info & Trademark */}
        <div className={`mt-auto mb-3 ${open ? 'px-4 pt-4 pb-2' : 'px-2 pt-4 pb-2'} border-t border-slate-700/50`}>
          {open ? (
            <div className="text-center space-y-2 mb-8">
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <div className="text-lg">♟</div>
                <span className="text-xs font-medium">GRANDMASTER EDITION</span>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                © 2025 MyChess™<br />
                <span className="text-slate-600">World's #1 Chess Platform</span>
              </div>
              <div className="flex justify-center gap-1 text-xs text-slate-600">
                <span>⭐</span>
                <span>50M+ Players</span>
                <span>⭐</span>
              </div>
            </div>
          ) : (
            <div className="text-center mb-8 mt-4">
              <div className="text-xs text-slate-500 transform -rotate-90 whitespace-nowrap">
                © 2025
              </div>
            </div>
          )}
          
          {/* Auth Buttons */}
          <div className="space-y-3">
            <button className={`
              w-full py-3 rounded-xl font-semibold transition-all duration-300
              bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
              text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20
              transform hover:scale-105 hover:-translate-y-0.5
              ${!open && 'px-0'}
            `}
              onClick={() => navigate("/signin")}
            >
              {open ? "Login" : <UserCheck className="mx-auto"/>}
            </button>
            <button className={`
              w-full py-3 rounded-xl font-semibold transition-all duration-300
              bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700
              text-white border border-slate-600 hover:border-slate-500
              shadow-lg hover:shadow-xl
              transform hover:scale-105 hover:-translate-y-0.5
              ${!open && 'px-0'}
            `}
              onClick={() => navigate("/signup")}
            >
              {open ? "Sign Up" : <UserRoundPlus className="mx-auto"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-80 
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          text-white flex flex-col 
          transform transition-all duration-300 ease-out z-50
          border-r border-slate-700/30 backdrop-blur-xl
          shadow-2xl shadow-black/30
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        {/* Mobile Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-bounce">♟</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                MyChess
              </h1>
            </div>
            <button 
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 flex flex-col gap-2 mt-6 px-4">
          {menuItems.map((item, index) => (
            <NavItem 
              key={index} 
              item={item} 
              open={true} 
              mobile={true}
              isActive={currentPath === item.value}
              onClick={() => {
                setMobileOpen(false);
                navigate(item.value);
              }}
            />
          ))}
        </nav>

        {/* Mobile Auth Buttons */}
        <div className="p-6 space-y-3 border-t border-slate-700/50">
          { isSignedIn ? <button 
            className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
            onClick={() => {
              handleSignOut();
              setMobileOpen(false);
              navigate("/signin");
            }}
          >
            Sign Out
          </button>
          :
          <>
            <button 
              className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              onClick={() => {
                setMobileOpen(false);
                navigate("/signin");
              }}
              >
              Login
            </button>
            <button 
              className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border border-slate-600"
              onClick={() => {
                setMobileOpen(false);
                navigate("/signup");
              }}
              >
              Sign Up
            </button>
          </>
          }
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

function NavItem({ 
  item, 
  open, 
  mobile = false,
  isActive,
  onClick
}: { 
  item: { attribute: string; value: string; icon: React.ReactElement }; 
  open: boolean;
  mobile?: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium
        transition-all duration-300 cursor-pointer overflow-hidden w-full text-left
        ${
          isActive
            ? "text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10"
            : "text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 hover:border-slate-600/30 border border-transparent"
        }
        ${mobile ? 'hover:scale-[1.02] hover:-translate-y-0.5' : ''}
      `}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
      )}
      
      {/* Icon */}
      <div className={`
        relative z-10 p-1 rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-blue-500/20 text-blue-400' 
          : 'group-hover:bg-slate-700/50 group-hover:scale-110'
        }
      `}>
        {item.icon}
      </div>
      
      {/* Text */}
      {open && (
        <span className={`
          relative z-10 transition-all duration-300
          ${isActive ? 'text-white font-semibold' : 'group-hover:text-white'}
        `}>
          {item.attribute}
        </span>
      )}
      
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full transform"></div>
    </button>
  );
}