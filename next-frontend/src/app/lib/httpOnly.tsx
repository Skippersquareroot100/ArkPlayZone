"use client";
import { useEffect } from "react";
import { useCookie } from "next-cookie";

function MyApp({ Component, pageProps }: any) {
   const [cookie, setCookie] = useCookie('jwtToken');

  useEffect(() => {
    if (cookie) {
      setCookie('jwtToken',
         cookie,
          { 
            httpOnly: true, 
            secure: true,
             sameSite: 'Strict' ,
             maxAge: 60 * 60 * 24 * 7 ,// 1 week
            });
    }
  }, [cookie, setCookie]);

  return <Component {...pageProps} />;
}

export default MyApp;
