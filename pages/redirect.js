import { useRef, useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import LoginModal from "../components/modal/login";
import { useRouter } from "next/router";
import LoadingDefault from "../components/loading/default";

export default function Redirect() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const router = useRouter();
    
    useEffect(() => {
        const pb = new PocketBase('http://127.0.0.1:8090');
        const params = (new URL(window.location.href)).searchParams
        const redirectUrl = 'http://localhost:3000/redirect';

        // load the previously stored provider's data
        const provider = JSON.parse(localStorage.getItem('provider'))

        if (provider === null) return;

        // compare the redirect's state param and the stored provider's one
        if (provider.state !== params.get("state")) {
            alert("State parameters don't match.");
        }

        // authenticate
        pb.collection('users').authWithOAuth2(
            provider.name,
            params.get("code"),
            provider.codeVerifier,
            redirectUrl
        ).then((authData) => {
            localStorage.removeItem("provider")
            setTimeout(() => {
                // window.location.href = '/dashboard'
                router.push("/dashboard")
            }, 2000);
        }).catch((err) => {
            setIsOpenModal(true)
        });
        
    }, []);


    return (
        <>
            {isOpenModal ? <LoginModal isOpenModalProps={isOpenModal} closeModal={() => {setIsOpenModal(false)}} /> : ''}
            <LoadingDefault/>
        </>
    )
}