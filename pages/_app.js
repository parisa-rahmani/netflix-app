import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/loading/loading';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true);
        };
        const handleComplete = () => {
            setIsLoading(false);
        };
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    return (
        <AnimatePresence exitBeforeEnter>
            {isLoading ? (
                <Loading />
            ) : (
                <Component {...pageProps} key={router.route} />
            )}
        </AnimatePresence>
    );
}

export default MyApp;
