import styles from '@/styles/Chat.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { useVisible } from '@/hooks/useVisible'
import { IconButton } from '@mui/material';

export default function Messages() {
    const { user, messages } = React.useContext(Context)

    const chatBottom = React.useRef()
    const isChatBottomVisible = useVisible(chatBottom)
    const [autoScroll, setAutoScroll] = React.useState(true)
    const [timer, setTimer] = React.useState(true);

    // scroll to bottom on new messages
    React.useEffect(() => {
        autoScroll && scrollToBottom();
        setTimer(true);
        setTimeout(() => {
            setTimer(false);
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

    // open/close scroll down button when bottom is visible
    React.useEffect(() => {
        if (!isChatBottomVisible && !timer) setTimeout(() => {
            setAutoScroll(false)
        }, 200)
        else setAutoScroll(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChatBottomVisible]);

    // scroll down function
    const scrollToBottom = () => {
        setAutoScroll(true);
        chatBottom.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className={styles.chatContainer}>

            {/* Chat Window */}
            <div className={styles.chatWindow}>
                {messages &&
                    messages?.map(message =>
                        <div
                            className={`${styles.message} ${message?.sender === user?.name ? styles.sender : styles.reciever}`}
                            key={messages.indexOf(message)}
                        >
                            {message?.content}
                            <div style={{ fontSize: 11 }}>
                                {message?.time.toLocaleTimeString('en-US',
                                    {
                                        hour12: false,
                                        hour: "numeric",
                                        minute: "numeric"
                                    }
                                )}
                            </div>
                        </div>
                    )
                }
                <div ref={chatBottom} style={{ minHeight: '1px' }}></div>
            </div>

            {/* Scroll Down Action  */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {!autoScroll &&
                    <IconButton
                        onClick={scrollToBottom}
                        sx={{ mt: -4 }}
                        className={styles.scrollDown}
                        size='small'
                    >
                        <KeyboardArrowDownRoundedIcon className={styles.scrollDownIcon} />
                    </IconButton>
                }
            </div>

        </div>
    )
}