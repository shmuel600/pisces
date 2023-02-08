import styles from '@/styles/Modal.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

export default function Modal({ component, fullScreen = false, locked = false }) {
  const { setModalOpen } = React.useContext(Context);

  return (
    <div
      onClick={() => setModalOpen(false)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>



      {fullScreen ?
        <>{/* full screen modal */}
          <div className={styles.fullScreenContainer} onClick={e => e.stopPropagation()}>
            {!locked &&
              <CancelOutlinedIcon
                onClick={() => setModalOpen(false)}
                sx={{ cursor: 'pointer', fill: 'gray', position: 'fixed', top: 2, right: 2 }}
              />
            }
            <div className={styles.fullScreenContent}>{component}</div>
          </div>
        </>
        :
        <>{/* small modal */}
          <div className={styles.container} onClick={e => e.stopPropagation()}>
            <div className={styles.content}>{component}</div>
          </div>
          {/* gray background */}
          <div style={{
            position: 'fixed',
            top: 0,
            minWidth: '100%',
            minHeight: '100%',
            background: 'rgba(61, 62, 63, 0.2)',
            scale: '2'
          }}></div>
        </>
      }
    </div>
  )
}
