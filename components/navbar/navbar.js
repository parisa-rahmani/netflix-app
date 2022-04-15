import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { magic } from '../../utils/magic-client';

export default function Navbar() {
    const router = useRouter();
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [username, setUsername] = useState('');
    const [didToken, setDidToken] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignOut = async e => {
        e.preventDefault();
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${didToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            console.log('🚀 ~ file: navbar.js ~ line 26 ~ Navbar ~ res', res);
        } catch (error) {
            console.error('Error logging out', error);
            router.push('/login');
        }
    };
    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const { email } = await magic.user.getMetadata();
                const token = await magic.user.getIdToken();
                if (email) {
                    setLoading(false);
                    setUsername(email);
                    setDidToken(token);
                }
            } catch (error) {
                setLoading(false);
                console.log(
                    '🚀 ~ file: navbar.js ~ line 21 ~ useEffect ~ error',
                    error
                );
            }
        };
        getUserData();
    }, []);

    const handleOnClickHome = e => {
        e.preventDefault();
        router.push('/');
    };

    const handleOnClickMyList = e => {
        e.preventDefault();
        router.push('/browse/my-list');
    };

    const handleShowDropdown = e => {
        e.preventDefault();
        setShowSubMenu(!showSubMenu);
    };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link href="/">
                    <a className={styles.logoLink}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src={'/static/netflix.svg'}
                                alt="netflix"
                                width={111}
                                height={30}
                            />
                        </div>
                    </a>
                </Link>

                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>
                        Home
                    </li>
                    <li
                        className={styles.navItem}
                        onClick={handleOnClickMyList}
                    >
                        My List
                    </li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button
                            className={styles.usernameBtn}
                            onClick={handleShowDropdown}
                        >
                            <p className={styles.username}>
                                {loading ? 'loading...' : username}
                            </p>
                            <Image
                                src={'/static/expand_more.svg'}
                                alt="Expand dropdown"
                                width="24px"
                                height="24px"
                            />
                        </button>
                        {showSubMenu && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <a
                                        className={styles.linkName}
                                        onClick={handleSignOut}
                                    >
                                        sign out
                                    </a>
                                    <div className={styles.lineWrapper}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
