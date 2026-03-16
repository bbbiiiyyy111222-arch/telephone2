import { AccessToken } from 'livekit-server-sdk'

export default async function handler(req, res) {
  const { room } = req.query
  
  if (!room) {
    return res.status(400).json({ error: 'Room required' })
  }

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: `user-${Math.random().toString(36).substring(7)}`,
    }
  )

  at.addGrant({ roomJoin: true, room })
  
  return res.json({ token: at.toJwt() })
}
