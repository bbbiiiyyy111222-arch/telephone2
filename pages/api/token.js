import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { room } = req.query;
  
  if (!room) {
    return res.status(400).json({ error: 'Room name is required' });
  }

  try {
    // Проверяем что ключи есть
    if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
      return res.status(500).json({ error: 'LiveKit credentials not configured' });
    }

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: `user-${Math.random().toString(36).substring(7)}`,
        metadata: JSON.stringify({ 
          name: `User-${Math.random().toString(36).substring(4)}` 
        })
      }
    );

    at.addGrant({ 
      roomJoin: true, 
      room: room,
      canPublish: true,
      canSubscribe: true
    });

    const token = at.toJwt();
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Token error:', error);
    return res.status(500).json({ error: 'Failed to generate token' });
  }
}
