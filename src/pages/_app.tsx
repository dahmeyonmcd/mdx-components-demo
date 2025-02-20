"use client"

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {HeroUIProvider} from "@heroui/react";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import LoadingView from "@/components/LoadingView";

export default function App({ Component, pageProps }: AppProps) {

    const [validated, setValidated] = useState(false);
    const [initialized, setInitialized] = useState(false);

    async function validate() {
        const params = location.search
        const parts = params.split("?token=")
        if (parts.length > 1) {
            const token = parts[parts.length - 1]
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

    return(
        <HeroUIProvider><Component {...pageProps} /></HeroUIProvider>
    )
      // return(
      //     <HeroUIProvider>
      //         {initialized ? (
      //             <>
      //                 { validated ? (
      //                     <Component {...pageProps} />
      //                 ): (
      //                     <></>
      //                 )}
      //             </>
      //         ): (
      //             <LoadingView />
      //         )}
      //     </HeroUIProvider>
      // );
}
