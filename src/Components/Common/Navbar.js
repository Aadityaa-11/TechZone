import React, { useEffect , useState} from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, matchRoutes, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import {ProfileDropDown} from "../Core/Auth/PricefileDropDown"
import { apiConnector } from '../../Services/apiconnector'
import { Categories } from '../../Services/apis'

const Navbar = () => {

    const Location = useLocation();

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
        return matchPath({path : route} , Location.pathname);
    }
    return(
        <div className='flex h-14 items-center justify-center'>
            <div className='w-11/12 flex justify-between'>
                {/* Logo  */}
                <div>
                    <Link to="/">
                        <img src={logo} width={160} height={32} loading='lazy' />
                    </Link>
                </div>

                {/* Navigation links  */}
                <nav className='flex justify-between'>
                    <ul className='flex text-white '>
                        {
                         NavbarLinks.map( (links , index) => (
                            <li key={index}>
                                {
                                links.title == "Catalog" ? 
                                (
                                    <p>{links.title}</p>
                                ) : 
                                ( 
                                <Link to={links.path} >
                                    <p className={`${MatchRoute(links?.path) ? 
                                        "text-yellow-400" : "text-richblack-25"
                                    }`}>
                                    {links?.title}
                                    </p>
                                </Link>
                                )
                                 
                                }
                              
                            </li>
                         ))
                                   
                            
                        }
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


