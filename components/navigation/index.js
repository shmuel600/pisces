import styles from '@/styles/Navigation.module.scss'
import Chat from '../chat'
import Pisces from '../pisces'
import Profile from '../profile'
import Settings from '../settings'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function Navigation({ setComponent }) {
    return (
        <div className={styles.center}>
            <div className={styles.navigation}>
                {/* <div style={{ cursor: 'pointer', margin: 6 }} onClick={() => setComponent(<Pisces />)}>Home</div> */}
                {/* <div style={{ cursor: 'pointer', margin: 6 }} onClick={() => setComponent(<Profile />)}>Profile</div> */}
                <AccountCircleRoundedIcon sx={{ fontSize: 40 }} onClick={() => setComponent(<Profile />)} />
                {/* <div style={{ cursor: 'pointer', margin: 6 }} onClick={() => setComponent(<Chat />)}>Chat</div> */}
                <QuestionAnswerIcon sx={{ fontSize: 40 }} onClick={() => setComponent(<Chat />)} />
                {/* <div style={{ cursor: 'pointer', margin: 6 }} onClick={() => setComponent(<Settings />)}>Settings</div> */}
                <SettingsRoundedIcon sx={{ fontSize: 40 }} onClick={() => setComponent(<Settings />)} />
            </div>
        </div>
    )
}