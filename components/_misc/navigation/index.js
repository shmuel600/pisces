import styles from '@/styles/Navigation.module.scss'
import * as React from 'react'

import Chat from '../../chat'
import Profile from '../../profile'
import Settings from '../../settings'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

export default function Navigation({ setPage }) {
    const [selected, setSelected] = React.useState();

    const handleNavigation = (selection, component) => {
        setSelected(selection);
        setPage(component);
    }

    return (
        <div className={styles.center}>
            <div className={styles.navigation}>
                <AccountCircleRoundedIcon
                    sx={{ fontSize: 40 }}
                    className={selected === 'profile' ? styles.selectedColor : styles.defaultColor}
                    onClick={() => handleNavigation('profile', <Profile />)}
                />
                <QuestionAnswerIcon
                    sx={{ fontSize: 40 }}
                    className={selected === 'chat' ? styles.selectedColor : styles.defaultColor}
                    onClick={() => handleNavigation('chat', <Chat />)}
                />
                <SettingsRoundedIcon
                    sx={{ fontSize: 40 }}
                    className={selected === 'settings' ? styles.selectedColor : styles.defaultColor}
                    onClick={() => handleNavigation('settings', <Settings />)}
                />
            </div>
        </div>
    )
}