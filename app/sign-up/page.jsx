"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  async function CreateMy(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        profileImage: profileImage,
        authProvider: "local",
        email: email,
      });

      setLoading(false);
      alert("Account Created Successfully");
      router.push("/");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-[100vh] w-full flex justify-center items-center">
      <div className="createBgMy h-[90vh] w-[60%]"></div>

      <div className="h-[90vh] w-[40%] flex justify-center items-center p-10">
        <div className="min-h-[60vh] w-[400px] p-10">
          <h1 className="text-[28px]">Create an account</h1>
          <p className="text-[15px] mt-2 mb-5">Enter your details below</p>

          <div>
            <input
              type="text"
              placeholder="Name"
              className="bormyown h-[40px] w-full"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />

            <input
              type="text"
              className="bormyown h-[40px] w-full"
              placeholder="Enter Profile Img Url"
              onChange={(e) => setProfileImage(e.target.value)}
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="Email or Phone Number"
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
              onClick={CreateMy}
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <button className="h-[40px] w-full text-[#DB4444] rounded border border-[#DB4444] text-[14px] mt-5">
              <img src="/google-icon.png" alt="Google Icon" className="inline ml-2 h-7" />
              Sign in with Google
            </button>

            <div className="text-center mt-5">
              <span className="text-[13px]">Already have an account?</span>
              <Link href="/sign-in">
                <span className="text-[#DB4444] text-[13px]"> Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
