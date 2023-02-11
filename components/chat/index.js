import styles from '@/styles/Chat.module.scss'

import Input from './Input';
import Messages from './Messages';

export default function Chat() {
    return (
        <>
            <Messages />
            <Input />
        </>
    )
}