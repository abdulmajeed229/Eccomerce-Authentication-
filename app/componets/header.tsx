"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase"; // Import Firestore DB
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { FaShoppingCart  , FaSearch , FaBars } from 'react-icons/fa';



export default function Header() {
    const [user, setUser] = useState<null | User>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null); // State to store profile image URL

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Fetch user data from Firestore
                const fetchUserProfile = async () => {
                    try {
                        const docRef = doc(db, "users", currentUser.uid); // Assuming the 'users' collection stores user data
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            setProfileImage(userData?.profileImage || null); // Assuming 'profileImage' field contains the URL
                        }
                    } catch (error) {
                        console.error("Error fetching user profile: ", error);
                    }
                };

                fetchUserProfile();
            } else {
                setUser(null);
                setProfileImage(null); // Reset profile image if the user logs out
            }
        });

        return () => unsub(); // Cleanup listener
    }, []);

    return (



<>


<header className='flex sticky top-0 bg-white border-b py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide relative z-50'>
      <div className='flex max-w-screen-xl mx-auto w-full'>
        <div className='flex flex-wrap items-center lg:gap-y-2 gap-4 w-full'>
<Link href={'/'}>

          <img src="https://www.logolynx.com/images/logolynx/53/53a96b267e91940d1bdb7ed5c7a5461e.png" alt="logo" className='w-36' />
          
</Link>

          <div id="collapseMenu"
            className='lg:ml-6 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
           

            <ul
              className='lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
              <li className='mb-6 hidden max-lg:block'>
                <div className="flex items-center justify-between gap-4">
                
                  <button
                    className='px-4 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>Sign
                    In</button>
                </div>
              </li>
              <li className='max-lg:border-b max-lg:py-3 px-3'><a 
                className='text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold'>Home</a></li>
              
              <Link href={'/about'}>
              <li className='max-lg:border-b max-lg:py-3 px-3'><span
                className='text-[#333] hover:text-[#007bff] text-[15px] block font-semibold'>About</span></li>
                </Link>
             
             
             <Link href={'/contact'}> <li className='max-lg:border-b max-lg:py-3 px-3'><span
                className='text-[#333] hover:text-[#007bff] text-[15px] block font-semibold'>Contact</span></li></Link>
             
            </ul>
          </div>

          <div className="flex items-center gap-x-6 gap-y-4 ml-auto">
            <div
              className='flex bg-gray-50 border focus-within:bg-transparent focus-within:border-gray-400 rounded-full px-4 py-2.5 overflow-hidden max-w-52 max-lg:hidden'>
              <input type='text' placeholder='Search something...' className='w-full text-sm bg-transparent outline-none pr-2' />

               <FaSearch />
            </div>

            <div className='flex items-center sm:space-x-8 space-x-6'>
              <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                <div className="relative">
               
                
                </div>
               
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                <div className="relative">
                <FaShoppingCart size={22}  />
                 
                </div>
             
              </div>




{
    user ? (

        <Link href={'/profile'}>
                  
                            <img 
                                src={profileImage || "/default-avatar.png"} // Fallback to a default image if no profile image exists
                                className="h-[40px] rounded-full border border-gray-200"
                                alt="User Profile" 
                            />
                        </Link>
    ) : (

        <Link href={'/sign-in'}>
        <button
          className='max-lg:hidden px-4 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>Sign
          In</button>
          </Link> 
    )

}
              <button id="toggleOpen" className='lg:hidden'>
               <FaBars />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

</>
    );
}
