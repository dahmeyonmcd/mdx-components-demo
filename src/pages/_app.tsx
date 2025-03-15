"use client"

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {HeroUIProvider} from "@heroui/react";
import {useEffect, useState} from "react";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import LoadingView from "@/components/LoadingView";
import {useSearchParams} from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {

    const _searchParams = useSearchParams();

    const [validated, setValidated] = useState(false);
    const [initialized, setInitialized] = useState(false);

    async function validate() {
        const { searchParams } = new URL(window.location.href);
        const token = searchParams?.get('token');

        // const parts = params.split("?token=")
        // let token;
        // if (params.includes("?instructor=")) {
        //     const token_parts = params.split("?token=")
        //     const token_first = token_parts[token_parts.length - 1]
        //     const token_split = token_first.split('?instructor=')
        //     token = token_split[0]
        // } else if (params.includes("token=")) {
        //     console.log("parts", parts[parts.length - 1]);
        //     token = parts[parts.length - 1]
        // }

        if (token) {
            try {
                const dataResponse = await NetworkingAPI.fetchDataFullResponse('livestream/schedule', 'GET', undefined, token);
                console.log(dataResponse)
                const status = dataResponse?.status ?? 401
                if (status === 401) {
                    setValidated(false);
                    setInitialized(true);
                } else {
                    setValidated(true);
                    setInitialized(true);
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setInitialized(true);
            setValidated(false)
        }
    }

    useEffect(() => {
        validate();
    },[])

    useEffect(() => {

    }, [validated, initialized]);

    // return(
    //     <HeroUIProvider>
    //         <Component {...pageProps} />
    //     </HeroUIProvider>
    // );

    return(
        <HeroUIProvider>
            {initialized ? (
                <>
                    { validated ? (
                        <Component {...pageProps} />
                    ): (
                        <></>
                    )}
                </>
            ): (
                <LoadingView />
            )}
        </HeroUIProvider>
    );
}
