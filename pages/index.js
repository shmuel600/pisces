import styles from '@/styles/Home.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import Modal from '@/components/_misc/modal'
import Navigation from '@/components/_misc/navigation'
import Pisces from '@/components/_misc/pisces'
import Waves from '@/components/_misc/waves'
import SignInGoogle from '@/components/_misc/signInGoogle'

import { useSession } from "next-auth/react"
import Head from 'next/head'
import io from 'socket.io-client'
let socket = io();

export default function Home() {
  const { data: session } = useSession()
  const [page, setPage] = React.useState(<Pisces />)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [modalContent, setModalContent] = React.useState()
  const [user, setUser] = React.useState()

  // const [socket, setSocket] = React.useState(socketIO);

  // log in / sign in
  React.useEffect(() => {
    const logIn = async () => {
      const userDetails = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image
      }
      try {
        const fetchedUser = await fetch("/api/user", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userDetails)
        });
        const json = await fetchedUser.json();
        setUser(json);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    logIn();
  }, [session])

  // update user location
  React.useEffect(() => {
    const getLocation = () => {
      let location;
      navigator.geolocation.getCurrentPosition(
        position => {
          location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          updateLocation(location);
        }
      )
    }
    const updateLocation = async (location) => {
      try {
        const fetchedUser = await fetch(`/api/user/${user?.email}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location })
        });
        // if need user to have its location accessed: 
        // const json = await fetchedUser.json();
        // setUser(json);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    if (user?.email) getLocation();
  }, [user])

  // open modal
  React.useEffect(() => {
    modalContent && setModalOpen(true);
  }, [modalContent])

  // start socket connection
  React.useEffect(() => {
    const startSocket = () => {
      fetch(`/api/socket`);
      // TODO: create rooms
      socket.emit('join', `${'room name'}`);

      // listen to socket events
      socket.on('new-message', msg => {
        // TODO: display message in chat window
        setModalContent({ component: msg });
      })
      // custom event
      // socket.on('event', () => {
      //   console.log()
      // })
      // return () => {
      //   socket.emit('disconnected', 'out');
      // };
    }
    if (user) startSocket();
  }, [user])


  const sendMessage = message => {
    socket.emit('send-message', message)
  }

  return (
    <Context.Provider value={{
      user,
      modalOpen,
      setModalOpen,
      setModalContent,
      sendMessage,
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

        {page}
        <Waves />

        {session ?
          <Navigation setPage={setPage} /> :
          <SignInGoogle />
        }

        {modalOpen &&
          <Modal
            modalContent={modalContent.component}
            fullScreen={modalContent.fullScreen}
            locked={modalContent.locked}
          />
        }
        {/* use this for modal: 
        onClick={() => setModalContent({ component: <Text />, fullScreen: true, locked: true})}
        */}

      </main>

    </Context.Provider>
  )
}
