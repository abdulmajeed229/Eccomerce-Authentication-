"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; // Remove the unused import

function SignIn() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInUser() {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        setLoading(false);
        alert("Logged in Successfully");
        router.push("/"); // Redirect after successful login
      })
      .catch((error) => {
        const errorMessage = error.message;
        
        setLoading(false);
        alert(errorMessage); // Display error message
      });
  }

  return (
    <div className="min-h-[100vh] w-full flex justify-center items-center">
      <div className="createBgMy h-[90vh] w-[60%]"></div>

      <div className="h-[90vh] w-[40%] flex justify-center items-center p-10">
        <div className="min-h-[60vh] w-[400px] p-10">
          <h1 className="text-[28px]">Sign In</h1> {/* Changed from "Create an account" to "Sign In" */}
          <p className="text-[15px] mt-2 mb-5">Enter your details below</p>

          <div>
            <input
              type="email" // Changed to "email" for better semantics
              placeholder="Email"
              className="bormyown h-[40px] w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />

            <input
              type="password"
              placeholder="Password"
              className="bormyown h-[40px] w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />

            <button
              className="h-[40px] w-full text-white rounded bg-[#DB4444] text-[14px]"
              onClick={signInUser}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <div className="text-center mt-5">
              <span className="text-[13px]">Don't have an account?</span>
              <Link href="/sign-up">
                <span className="text-[#DB4444] text-[13px]"> Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
