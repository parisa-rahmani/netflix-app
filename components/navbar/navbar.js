import Image from 'next/image';
import React, { useState } from 'react';
import styles from './navbar.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar({ username }) {
    const router = useRouter();
    const [showSubMenu, setShowSubMenu] = useState(false);
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
                                    <Link href="/login">
                                        <a className={styles.linkName}>
                                            sign out
                                        </a>
                                    </Link>
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
