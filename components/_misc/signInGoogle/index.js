import styles from '@/styles/SignInGoogle.module.scss'
import * as React from 'react'

import { signIn } from "next-auth/react"
import GoogleIcon from './icon'

export default function SignInGoogle() {
    const [white, setWhite] = React.useState(true);
    const handleIcon = () => {
        setTimeout(setWhite(!white), 4000);
    }
    return (
        <div
            onClick={() => signIn('google')}
            onMouseEnter={handleIcon}
            onMouseLeave={handleIcon}
            className={styles.signInButton}
            style={{ position: 'fixed', top: '60vh' }}
        >
            <GoogleIcon color={white} className={styles.icon} />
            <div style={{ paddingBottom: 4, paddingLeft: 8 }}>Sign In With Google</div>
        </div>
    )
}