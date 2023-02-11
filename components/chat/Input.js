import styles from '@/styles/Chat.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function Input() {
    const { sendMessage } = React.useContext(Context);
    const messageContent = React.useRef();

    const handleSend = () => {
        if (messageContent.current.value !== '') {
            sendMessage(messageContent.current.value)
        }
        messageContent.current.value = '';
    }

    return (
        <>
            <div className={styles.inputArea}>

                {/* input */}
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder={"Type Message Here..."}
                        ref={messageContent}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                </div>

                {/* send button */}
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