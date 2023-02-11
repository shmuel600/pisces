import styles from '@/styles/Chat.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

export default function Messages() {
    const { user, messages } = React.useContext(Context);
    const pageBottom = React.useRef();

    // scroll to bottom on new messages
    React.useEffect(() => {
        pageBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatWindow}>
                {messages &&
                    messages?.map(message =>
                        <div
                            className={`${styles.message} ${message?.sender === user?.name ? styles.sender : styles.reciever}`}
                            key={messages.indexOf(message)}
                        >
                            {/* {message?.sender}:  */}
                            {message?.content}
                            <div style={{ fontSize: 11 }}>{message?.time}</div>
                        </div>
                    )
                }
                <div ref={pageBottom}></div>
            </div>
        </div>
    )
}