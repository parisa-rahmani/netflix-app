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

    const handleSingOut = async e => {
        e.preventDefault();
        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // => `false`
        } catch (error) {
            console.log(
                '🚀 ~ file: navbar.js ~ line 19 ~ Navbar ~ error',
                error
            );
        } finally {
            router.push('/login');
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { email } = await magic.user.getMetadata();
                if (email) {
                    setUsername(email);
                }
            } catch (error) {
                console.log(
                    '🚀 ~ file: navbar.js ~ line 21 ~ useEffect ~ error',
                    error
                );
            }
        };
        getUserData();
    }, []);
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
                    <li className={styles.navItem}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/browse/my-list">
                            <a>My List</a>
                        </Link>
                    </li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button
                            className={styles.usernameBtn}
                            onClick={() => setShowSubMenu(prev => !prev)}
                        >
                            <p className={styles.username}>{username}</p>
                        </button>
                        {showSubMenu && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <a
                                        className={styles.linkName}
                                        onClick={handleSingOut}
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
