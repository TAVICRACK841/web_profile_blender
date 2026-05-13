import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBg94E3D3KSdcYGJATIwFyCsG4kxCH5JDc",
  authDomain: "portafolio-blender.firebaseapp.com",
  projectId: "portafolio-blender",
  storageBucket: "portafolio-blender.firebasestorage.app",
  messagingSenderId: "808177189439",
  appId: "1:808177189439:web:c725cd495536e452946e8a",
  measurementId: "G-0KDPHPKHS1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

