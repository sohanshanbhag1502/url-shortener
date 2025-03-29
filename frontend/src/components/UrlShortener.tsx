import { useState } from "react";
import { Copy, Link, ExternalLink, Loader } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const apiUrl = process.env.REACT_APP_API_URI!;

interface ShortenResponse {
    message: string;
}

if (!apiUrl) {
    throw new Error("API URL is not defined in environment variables.");
}

export default function UrlShortener() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleShorten = async () => {
        if (!url) return;
        setLoading(true);
        try {
            const response = await fetch(apiUrl+"/shorten", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    original: url,
                    shortened: shortUrl,
                }),
            })

            const res: ShortenResponse =await response.json();
            if (response.ok) {
                setShortUrl(res.message);
            }
            else {
                console.error("Error shortening URL", res.message);
            }
        } catch (error) {
            console.error("Error shortening URL", error);
        }
        setLoading(false);
    };

    const handleCopy = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-500 via-purple-700 to-pink-600 animate-fade-in">
            <div className="w-full max-w-lg p-8 shadow-2xl bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 rounded-2xl text-white transform transition-all hover:scale-105 hover:shadow-3xl">
                <div className="space-y-10">
                    <h2 className="text-3xl font-bold text-center animate-pulse">URL Shortener</h2>
                    <div className="flex flex-col space-y-4 bg-purple-700 p-4 rounded-lg shadow-md border border-purple-500 hover:border-pink-500 transition-all">
                        <input 
                            type="text" 
                            placeholder="Enter URL" 
                            value={url} 
                            onChange={(e) => setUrl(e.target.value)} 
                            className="px-4 py-3 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-all hover:border-pink-400 text-lg"
                        />
                        <button onClick={handleShorten} disabled={loading} className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-pink-500 transition duration-300 flex items-center justify-center min-w-[10rem] text-lg">
                            {loading ? <Loader className="animate-spin mr-2" size={20} /> : <Link className="mr-2" size={20} />}
                            {loading ? "Shortening..." : "Shorten"}
                        </button>
                    </div>
                    {shortUrl && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-purple-600 rounded-lg shadow-md border border-purple-500 transition-all hover:border-pink-500">
                                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-200 font-medium truncate hover:text-pink-300 text-lg">
                                    {shortUrl}
                                </a>
                                <button onClick={handleCopy} className="hover:bg-purple-500 p-3 rounded-full transition-all hover:scale-110">
                                    <Copy size={20} />
                                </button>
                            </div>
                            <div className="flex justify-center">
                            <QRCodeCanvas value={shortUrl} size={120} bgColor="#fff" fgColor="#000" className="rounded-lg shadow-md p-2 bg-white" />
                            </div>
                            <button onClick={() => window.open(shortUrl, "_blank")} className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center text-lg">
                                <ExternalLink className="mr-2" size={20} />
                                Open Shortened URL
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
