import styles from '@/styles/Profile.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import { signOut } from "next-auth/react"
import Image from 'next/image'

export default function Profile() {
    const { user } = React.useContext(Context);

    return (
        <div className={styles.container}>
            <Image src={user?.image} alt="" width={120} height={120} style={{ borderRadius: '50%' }} />
            <br />
            {user.name}
            <br />
            {user.email}
            <br />
            <br />
            <button onClick={() => signOut('google')}>Sign Out</button>
        </div>
    )
}