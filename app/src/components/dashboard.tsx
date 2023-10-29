import NavBar from "./navbar.tsx";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.tsx";
import axios from "axios";
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Dashboard() {


    const generateUID = (length: number): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uid = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uid += characters.charAt(randomIndex);
        }

        return uid;
    };


    const { user, authTokens }: any = useContext(AuthContext);
    const [openModal, setOpenModal] = useState<string | undefined>(undefined);
    const [sessionName, setSessionName] = useState<string>("");
    const props = { openModal, setOpenModal, sessionName, setSessionName };
    const [getSessions, setGetSessions] = useState<any>([]);
    const [refresh, setRefresh] = useState<boolean>(false);


    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        try {

            const code = generateUID(6);

            console.log("Request Data:",
                {
                    code,
                    user: user.user_id,
                }

            ); // Log the request data before sending

            const response = await axios.post(
                "http://127.0.0.1:8000/sessions/",
                {
                    code,
                    user: user.id,
                    session_name: sessionName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access as string}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 201) {
                setOpenModal(undefined);
                setRefresh(!refresh);
                console.log("Session created successfully.");
                console.log("Response Data:", response.data); // Log the response data
            }
            else {
                console.log("Something went wrong.");
            }
        } catch (error) {
            console.log("Error:", error); // Log any errors
        }
    };

    useEffect(() => {
        axios.get("http://127.0.1:8000/sessions/", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access as string}`,
            },
        }).then((response) => {
            setGetSessions(response.data);
            console.log(response.data);
        });
    }, [refresh]);


    const onDelete = (code: string) => {
        axios.delete(`http://127.0.1:8000/sessions/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access as string}`,
            },
            data: {
                code: code,
            },
        }).then((response) => {
            setRefresh(!refresh);
            console.log(response.data);
        });
    }


    return (
        <>
            <NavBar />
            <main className="flex-grow container mx-auto p-4">
                <div className="relative mb-4 bg-blue-300">
                    <button onClick={() => props.setOpenModal('form-elements')} className="absolute top-0 right-0 btn btn-info rounded-full w-10 h-10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </button>
                </div>

                <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header />
                    <Modal.Body>
                        <form className="flex max-w-md flex-col gap-4" onSubmit={handleOnSubmit}>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a new poll session</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="session-name" className="text-gray-900 dark:text-white">
                                            Session name
                                        </Label>
                                        <TextInput
                                            id="session-name"
                                            placeholder="Enter a name for your session"
                                            onChange={(e) => props.setSessionName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit">Create session</Button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <h1 className="text-3xl font-semibold mb-4">Hello {user?.username}</h1>
                <h2 className="text-2xl font-semibold mb-4">Welcome to My App</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getSessions.map((session: any) => (
                        <div key={session.id}>
                            <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg font-semibold">{session.session_name}</h2>
                                    <p className="text-gray-700 dark:text-gray-400">{session.code}</p>
                                </div>
                                <div className="flex justify-end p-4 space-x-2">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                        onClick={() => localStorage.setItem("session", session.code)}
                                    >
                                        <Link to={"/view/question"}>View session</Link>
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                        onClick={() => onDelete(session.code)}
                                    >
                                        Delete session
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>

        </>
    );
}
