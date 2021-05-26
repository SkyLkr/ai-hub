import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

import Button from './Button';

import styles from '../styles/components/Header.module.css';

function Header() {
  const [ session, sessionLoading ] = useSession();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function getFirstName() {
    if (sessionLoading || !session.user) {
      return '';
    }
    
    const [ firstName ] = session.user.name.split(' ');
    return firstName ?? '';
  }

  return (
    <header className={styles.header}>
      <Link href="/dashboard">
        <a>
          <img src="/assets/logo.svg" alt="AI Hub" className={styles.logo} />
        </a>
      </Link>

      <div className={styles.controls}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input type="text" placeholder="Buscar repositórios" />

          <button
            className={`${styles.searchButton} ${styles.roundButton}`}
            type="submit"
          >
            <MdSearch />
          </button>
        </form>

        <Link href="/repos/new">
          <button className={styles.roundButton} type="button">
            <MdAdd />
          </button>
        </Link>

        <span className={styles.userName}>{getFirstName()}</span>

        <Button onClick={() => signOut()}>
          <FiLogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
