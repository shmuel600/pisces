import styles from '@/styles/Profile.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import { signOut } from "next-auth/react"

export default function Profile() {
    const { user } = React.useContext(Context);

    return (
        <div className={styles.container}>
            {user.name}
            <br />
            {user.email}
            <br />
            <br />
            <button onClick={() => signOut('google')}>Sign out</button>
        </div>
    )
}