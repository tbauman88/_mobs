import axios from 'axios'

export type Session = {
  attendee_limit: number
  date: string
  discord_channel_id: string
  end_time: string
  is_public: boolean
  location: string
  start_time: string
  title: string
  topic: string
}

const api = {
  fetchSessions: (date: Date): Promise<any> =>
    axios.get('https://growth.vehikl.com/growth_sessions/week', {
      params: { date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
    }),
  createSession: (data: Session) => axios.post('https://growth.vehikl.com/growth_sessions', data),
  deleteSession: (sessionId: number) =>
    axios.delete(`https://growth.vehikl.com/growth_sessions/${sessionId}`)
}

export default api
