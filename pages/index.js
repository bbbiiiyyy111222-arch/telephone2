import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')

  const createRoom = () => {
    const room = roomName || Math.random().toString(36).substring(7)
    router.push(`/room/${room}`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>📞 Telephone</h1>
        <input
          type="text"
          placeholder="Название комнаты"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={createRoom}
          style={{
            background: '#667eea',
            color: 'white',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Создать комнату
        </button>
      </div>
    </div>
  )
}
