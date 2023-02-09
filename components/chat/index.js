import styles from '@/styles/Chat.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function Chat() {
    const { sendMessage } = React.useContext(Context);
    const messageContent = React.useRef();

    const handleSend = () => {
        sendMessage(messageContent.current.value)
        messageContent.current.value = '';
    }

    return (
        <>
            <div className={styles.chat}>
                {/* Chat */}
            </div>

            <div className={styles.inputArea}>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder={"Type Message Here..."}
                        ref={messageContent}
                    />
                </div>

                <div
                    className={styles.sendButton}
                    onClick={handleSend}
                >
                    <SendRoundedIcon htmlColor='white' />
                </div>
            </div>
        </>
    )
}