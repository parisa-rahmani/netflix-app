import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import { magic } from '../utils/magic-client';

export default function Login() {
    const [userMsg, setUserMsg] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false);
        };
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    const handleOnChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
        setUserMsg('');
    };

    const handleLoginWithEmail = async e => {
        e.preventDefault();
        if (email) {
            try {
                setIsLoading(true);
                const DIDtoken = await magic.auth.loginWithMagicLink({
                    email: email,
                });
                if (DIDtoken) {
                    const result = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${DIDtoken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const response = await result.json();
                    if (response.success) {
                        router.push('/');
                    } else {
                        setIsLoading(false);
                        setUserMsg('something went wrong logging in!');
                    }
                }
            } catch (error) {
                setIsLoading(false);
                setUserMsg('Enter a valid email address');
            }
        } else {
            setUserMsg('Email is required!');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix SignIn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a className={styles.logoLink} href="/">
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/static/netflix.svg"
                                alt="Netflix logo"
                                width="128px"
                                height="34px"
                            />
                        </div>
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signinHeader}>Sign In</h1>

                    <input
                        type="text"
                        placeholder="Email address"
                        className={styles.emailInput}
                        onChange={handleOnChangeEmail}
                    />

                    <p className={styles.userMsg}>{userMsg}</p>
                    <button
                        onClick={handleLoginWithEmail}
                        className={styles.loginBtn}
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </div>
            </main>
        </div>
    );
}
