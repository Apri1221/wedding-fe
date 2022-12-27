import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PocketBase from 'pocketbase';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';


export default function LoginModal({isOpenModalProps, closeModal}) {
    let [isOpen, setIsOpen] = useState(isOpenModalProps)
    const [methodLogin, setMethodLogin] = useState([])
    const [loginRequest, setLoginRequest] = useState({
        email: "",
        password: ""
    })

    let pb = null;

    useEffect(() => {
        setIsOpen(isOpenModalProps)
        
        pb = new PocketBase('http://127.0.0.1:8090');
        initMethodLogin()
    }, [isOpenModalProps])

    const initMethodLogin = async () => {
        const result = await pb.collection('users').listAuthMethods();
        setMethodLogin(result.authProviders)
    }

    /**
     * [
            {
                "name": "google",
                "state": "vXXr5UvH0X9C8GMnwDTLksbjM8OUoG",
                "codeVerifier": "6mPr7p5Qn10BT6j2ao5mhweUFf4HfeAcAdXzHUEiaE8",
                "codeChallenge": "yXQOEksbHC2v6zdUamtL0wY6NoryQl99RYT6NV2YNfI",
                "codeChallengeMethod": "S256",
                "authUrl": "https://accounts.google.com/o/oauth2/auth?client_id=334958470583-f449ps02734fpuk2mepdl63omo8m5acm.apps.googleusercontent.com&code_challenge=yXQOEksbHC2v6zdUamtL0wY6NoryQl99RYT6NV2YNfI&code_challenge_method=S256&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=vXXr5UvH0X9C8GMnwDTLksbjM8OUoG&redirect_uri="
            }
        ]
     * 
     */

    const signMethod = (provider, code, verifier, auth_url) => {
        localStorage.setItem("provider", JSON.stringify(methodLogin.filter(e => e.name = provider)[0]))
        window.location.href = auth_url + "http://localhost:3000/redirect"
    }

    const setLogin = (email, password) => {
        const loginRequestTemp = {...loginRequest}
        setLoginRequest({
            email: email === null ? loginRequestTemp.email : email,
            password: password === null ? loginRequestTemp.password : password
        })
    }

    const submitLogin = async (email, password) => {
        const pb = new PocketBase('http://127.0.0.1:8090');
        const authData = await pb.collection('users').create({
            email: email,
            password: password,
            passwordConfirm: password,
        });

        console.log(authData)
        closeModal()
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Login
                                    </Dialog.Title>
                                    {/* <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Input correct email and password.
                                        </p>
                                    </div> */}

                                    {/* <div className='mt-8'>
                                        <input
                                            name="email"
                                            value={loginRequest.email}
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => { setLogin(e.target.value, null) }}
                                            className="bg-white w-full border border-gray-200 text-base sm:text-sm rounded py-2 px-3"
                                        />
                                    </div>
                                    <div className='mt-4 mb-8'>
                                        <input
                                            name="password"
                                            value={loginRequest.password}
                                            type="password"
                                            placeholder="Password"
                                            onInput={(e) => { setLogin(null, e.target.value) }}
                                            className="bg-white w-full border border-gray-200 text-base sm:text-sm rounded py-2 px-3"
                                        />
                                    </div> */}

                                    {/* <div className="mt-4 flex">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {submitLogin(loginRequest.email, loginRequest.password)}}
                                        >
                                            Submit!
                                        </button>
                                    </div> */}

                                    <div className='my-4'>
                                        <div className="my-2">
                                            <p className="text-sm text-gray-500">
                                                Or login via auth below.
                                            </p>
                                        </div>
                                        <div className='flex justify-around'>
                                            {
                                                methodLogin.map((e, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent border-blue-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => {signMethod(e.name, e.codeChallenge, e.codeVerifier, e.authUrl)}}
                                                    >
                                                        <ArrowRightCircleIcon className="h-5 w-5 text-gray-500 mr-2" aria-hidden="true"/>
                                                        {e.name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

LoginModal.propTypes = {
    isOpenModalProps: PropTypes.bool
}