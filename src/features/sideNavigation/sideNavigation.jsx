import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
export const SideNavigation =()=>{
    const [showSideNavigationMenu,setShowSideNavigationMenu] = useState(false)
    const token =localStorage.getItem("token")
    return(
        <>
            {token&&<button onClick={()=>setShowSideNavigationMenu(true)} className="flex justify-center items-center rounded-md hover:bg-primaryColor stroke-current text-white hover:text-black" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 m-2 stroke-current " fill="none " viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>}
            {
                showSideNavigationMenu && <SideNavigationMenu menuStyle="flex  bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm w-screen h-screen fixed z-10 top-0 left-0" toggleMenuView={setShowSideNavigationMenu} />
            }
        </>
    )

}
export const SideNavigationMenu =({toggleMenuView,menuStyle}) =>{

    const {currentUser} = useSelector(state => state.user)
    const {username} = currentUser || {}

    const linkStyle = "flex py-4 px-5 mb-4 md:text-xl rounded-md hover:bg-primaryColor-dark"
    const activeLinkStyle = {
        display:"flex",
        padding:"1rem 1.25rem 1rem 1.25rem",
        marginBottom:"1rem",
        backgroundColor:"#fbbf24",
        // opacity:"0.7"
    }
    const iconStyle = "h-6 w-6 mr-5 md:h-8 md:h8"
    const navigate = useNavigate()
    const handleLogout =(toggleMenuView)=>{
        localStorage.removeItem("token")
        navigate("/login")
        toggleMenuView(false)
    }

    return(
        <div className={menuStyle}>
            <div className="md:w-1/3 bg-white p-5 ">
                <div className="flex flex-col items-end mb-5 ">
                    <button onClick={()=>toggleMenuView(false)} className="flex justify-center items-center rounded-md bg-gray-200 hover:bg-primaryColor" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2 stroke-current" fill="none " viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col justify-center">
                    <NavLink className={linkStyle} activeStyle={activeLinkStyle} onClick={()=>toggleMenuView(false)} end to="/">
                        <svg  xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </NavLink>

                    <NavLink className={linkStyle} activeStyle={activeLinkStyle} onClick={()=>toggleMenuView(false)} to={`/${username}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                    </NavLink>
                    <NavLink className={linkStyle} activeStyle={activeLinkStyle} onClick={()=>toggleMenuView(false)} to="/notifications" >
                        <svg xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notifications
                    </NavLink>
                    <NavLink className={linkStyle} activeStyle={activeLinkStyle} onClick={()=>toggleMenuView(false)} to="/connect" >
                        <svg xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Connect
                    </NavLink>
                    <button onClick={()=>handleLogout(toggleMenuView)} className={`${linkStyle} hover:bg-grey `} >
                        <svg xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                    {/* <NavLink></NavLink> */}

                </div>
            </div>
            <div onClick={()=>toggleMenuView(false)} className="hidden h-screen md:flex md:w-2/3 ">

            </div>
        </div>
    )
}