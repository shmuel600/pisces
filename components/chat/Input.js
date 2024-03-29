import styles from '@/styles/Chat.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function Input() {
    const { sendMessage, keyboardHeight } = React.useContext(Context)
    const messageContent = React.useRef()
    const [sendAnimation, setSendAnimation] = React.useState(false)

    const handleSend = () => {
        if (messageContent.current.value !== '') {
            sendMessage(messageContent.current.value)
            // add animation on send
            setSendAnimation(true);
            setTimeout(() => setSendAnimation(false), 400)
        }
        messageContent.current.focus();
        messageContent.current.value = '';
    }

    return (
        <>
            <div className={styles.inputArea} id='input' style={{ marginBottom: keyboardHeight }}>

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
                    className={`${styles.sendButton} ${sendAnimation && styles.sendButtonClick}`}
                    onClick={handleSend}
                >
                    <SendRoundedIcon htmlColor='white' />
                </div>

            </div>
        </>
    )
}