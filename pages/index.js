import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Waves from '@/components/waves'
import Navigation from '@/components/navigation'
import Pisces from '@/components/pisces'
import * as React from 'react'
import Context from '@/contexts/Context'
import Modal from '@/components/modal'
import Text from '@/components/text'
import { signIn, signOut, useSession } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession();
  const [component, setComponent] = React.useState(<Pisces />)
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <Context.Provider value={{
      modalOpen,
      setModalOpen
    }}>

      <Head>
        <title>Pisces Dating</title>
        <meta
          name="Pisces Dating"
          content="
          A dating app created using NextJS, SocketIO & Cloudinary. 
          The app includes user sign up & Google authentication, 
          an algorythm for finding matches, live chat and some settings.
          "/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        <div style={{ position: 'fixed', top: 20, right: 6 }}> {/* to delete later */}
          <button onClick={() => setModalOpen(true)}>open modal</button>
          {modalOpen && <Modal component={<Text />} fullScreen locked />}
          {!session ?
            <button onClick={() => signIn('google')}>Google Sign In</button> :
            <div>
              <button onClick={() => signOut('google')}>Sign out</button>
              <br />{session && session?.user?.name}
              <br />{session && session?.user?.email}
            </div>
          }
        </div>

        {component}


        <Waves />
      </main>

      {session && <Navigation setComponent={setComponent} />}

    </Context.Provider>
  )
}
