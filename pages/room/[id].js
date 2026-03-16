import { useRouter } from 'next/router'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { useEffect, useState } from 'react'

export default function Room() {
  const router = useRouter()
  const { id } = router.query
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    const getToken = async () => {
      try {
        const res = await fetch(`/api/token?room=${id}`)
        const data = await res.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setToken(data.token)
        }
      } catch (err) {
        setError('Ошибка подключения')
      }
    }

    getToken()
  }, [id])

  if (error) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#ff4444' }}>Ошибка</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            На главную
          </button>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #667eea',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p>Подключение к комнате {id}...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', background: '#0a0a0a' }}>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        connect={true}
        video={true}
        audio={true}
        options={{
          adaptiveStream: true,
          dynacast: true
        }}
        style={{ height: '100vh' }}
        onDisconnected={() => router.push('/')}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  )
}
