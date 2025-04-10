import { useParams } from "react-router-dom"
import { useEffect } from "react";

interface resp{
    message: string;
}

const apiUrl = import.meta.env.VITE_API_URI;

export default function RedirectElement() {
    const params = useParams<{ id: string }>();
    const func = async () => {
        const response = await fetch(apiUrl+'/api/geturl', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "shortened":params.id
            }),
        })
        const originalUrl: resp = await response.json();
        window.open(originalUrl.message, '_parent');
    }
    useEffect(()=>{func()}, [])

    return (
        <>
        </>
    )
}