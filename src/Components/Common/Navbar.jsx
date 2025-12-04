import React, { useEffect , useState} from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from "../Core/Auth/ProfileDropDown"
import { apiConnector } from '../../Services/apiconnector'
import { Categories } from '../../Services/apis'
import { BsChevronBarDown } from 'react-icons/bs'

const Navbar = () => {

    const location = useLocation();

    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {TotalItem} = useSelector( (state) => state.cart)

    const[sublinks , setSublinks] = useState([]);
    const[loading , setLoading] = useState(false);


    const fetchsublinks = async() =>{
        setLoading(true);
        // console.log("Calling API URL:", Categories.CATEGORIES_API);
        try{
            const Response  = await apiConnector("GET" , Categories.CATEGORIES_API );
            console.log("Printing the sublinks" , Response.data.AllCategories)
            setSublinks(Response.data.AllCategories);
        }catch(error){
            console.log("Could not able to fetch the category list")
        }
        setLoading(false)
    }

    useEffect(() =>{
       fetchsublinks();
    }, [])


    const MatchRoute = (route) => {
        return matchPath({path : route} , location.pathname);
    }
    return(
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700
            ${location.pathname !=="/" ? "bg-richblack-800" :" "}
            transition-all duration-200`}>
                
            <div className='w-11/12 flex justify-between items-center max-w-maxContent'>

                {/* Logo  */}
                <div>
                    <Link to="/">
                        <img src={logo} width={160} height={32} loading='lazy' />
                    </Link>
                </div>

                {/* Navigation links  */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-richblack-25 '>
                        {
                         NavbarLinks.map( (links , index) => (
                            <li key={index}>
                                {
                                links.title == "Catalog" ? 
                                (
                                    <div
                                    className={`group relative flex cursor-pointer items-center gap-x-1
                                        ${MatchRoute("/catalog/:catalogName")
                                            ? "text-yellow-25"
                                            : "text-richblack-25"
                                        }`}
                                    >
                                        <p>{links.title}</p>
                                        <BsChevronBarDown/>
                                        <div className='invisible absolute left-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3rem] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:tranlate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                            <div></div>
                                                {  loading ? ( <p>Loading...</p>) 
                                                    : (
                                                        sublinks.length ? (
                                                           <> 
                                                            {
                                                                sublinks?.filter(
                                                                    (sublinks) => sublinks?.Courses?.length > 0 
                                                                )?.map( (sublink , index) => (
                                                                    <Link
                                                                    to={`/catalog/${sublink.Name.split(" ").join("-").toLowerCase()}`}
                                                                    className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                                                    key={index}>
                                                                        <p>{sublink.Name}</p>
                                                                    </Link>
                                                                ))}
                                                            </>)    
                                                                : (
                                                                    <p className='text-center'>No Courses Found</p>
                                                                )
                                                            )           
                                                }              
                                        </div>
                                </div>
                                ) : ( 
                                <Link to={links.path} >
                                    <p className={`${MatchRoute(links?.path) ? 
                                        "text-yellow-400" : "text-richblack-25"
                                    }`}>
                                    {links?.title}
                                    </p>
                                </Link>
                                )} 
                            </li>
                         ))}
                    </ul>
                </nav>


                {/* login/signup/dashboard/profile  */}
                <div>
                    {
                        user && user?.AccountType != "Instructor" &&
                        (
                            <Link to="/dashboard/cart" className='relative'>
                                <FaCartShopping/>
                                {
                                    TotalItem > 0 && 
                                    (
                                        <span>
                                            {TotalItem}
                                        </span>
                                    )

                                }
                            </Link>
                        )
                    }

                    {
                        token === null && 
                        (
                            <Link to="/login" >
                              <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'
                              >Login</button>
                            </Link>
                        )
                    }

                    {
                        token === null && 
                        (
                            <Link to="/Signup">
                               <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'
                               >Signup</button>
                            </Link>
                        )
                    }

                    {
                        token != null && <ProfileDropDown/>
                    }
                </div>
              



            </div>
        </div>
    )
}

export default Navbar


