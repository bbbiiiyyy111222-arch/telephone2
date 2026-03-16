import { AccessToken } from 'livekit-server-sdk'

export default async function handler(req, res) {
  const { room } = req.query

  if (!room) {
    return res.status(400).json({ error: 'Room name is required' })
  }

  try {
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity: `user-${Math.random().toString(36).substring(7)}` }
    )

    at.addGrant({ roomJoin: true, room })
    
    res.status(200).json({ token: await at.toJwt() })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' })
  }
}
