import { useRouter } from 'next/router'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { useState, useEffect } from 'react'

export default function Room() {
  const router = useRouter()
  const { id } = router.query
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!id) return

    fetch(`/api/token?room=${id}`)
      .then(res => res.json())
      .then(data => setToken(data.token))
  }, [id])

  if (!token) {
    return (
      <div style={styles.loader}>
        <div style={styles.spinner}></div>
        <p>Подключение к комнате...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      video={true}
      audio={true}
      style={{ height: '100vh' }}
      onDisconnected={() => router.push('/')}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}

const styles = {
  loader: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a1a',
    color: 'white',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '3px solid #667eea',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  }
}
