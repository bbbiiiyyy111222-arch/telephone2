import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  // 1. Проверяем метод запроса (ожидаем GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Получаем название комнаты из запроса
  const { room } = req.query;

  if (!room) {
    return res.status(400).json({ error: 'Room name is required' });
  }

  // 3. Проверяем, что ключи LiveKit установлены в переменных окружения Vercel
  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
    console.error('LiveKit credentials are not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // 4. Создаем токен доступа
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: `user-${Math.random().toString(36).substring(2, 10)}`, // Уникальный ID участника
        // Можно добавить имя участника в метаданные
        // metadata: JSON.stringify({ username: `User-${Date.now()}` })
      }
    );

    // 5. Даем разрешение на присоединение к комнате
    at.addGrant({ roomJoin: true, room: room });

    // 6. Возвращаем токен (метод .toJwt() не асинхронный, await не нужен)
    const token = at.toJwt();
    return res.status(200).json({ token });

  } catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).json({ error: 'Failed to generate token' });
  }
}
