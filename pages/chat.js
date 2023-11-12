import Head from 'next/head'
 
import {useEffect, useState} from "react";

export async function getServerSideProps() {
    const initialData = await fetch("http://localhost:8000/handler-initial-data").then(x => x.json());
    return {props: {data: initialData}}
}

export default function Chat(props) {
    const [data, setData] = useState(props.data);
    useEffect(() => {
        fetch("http://localhost:8000/handler")
            .then(x => x.json())
            .then(x => setData(x));
    }, [])
    return (
        <div  >
            <Head>
                <title>OSS Docs</title>
                <meta name="description" content="Fast like SSR, Powerful like WebSockets"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main  >
                <h1  >
                    {props.title || "Untitled Document"}
                </h1>
                <div>Data is: {JSON.stringify(data)}</div>
            </main>
        </div>
    )
}
