import axios from 'axios'
export interface Attendee {
  avatar: string
  created_at?: string
  email_verified_at?: string
  github_nickname: string
  id: number
  is_vehikl_member: boolean
  name: string
  updated_at?: string
}

interface Comment {
  content: string
  created_at: string
  growth_session_id: number
  id: number
  time_stamp: string
  updated_at: string
  user: Attendee
}

export interface Session {
  attendee_limit: number
  attendees: Attendee[]
  comments: Comment[]
  created_at: string
  date: string
  discord_channel_id: string
  end_time: string
  id: number
  is_public: boolean
  location: string
  owner: Attendee
  start_time: string
  title: string
  topic: string
  updated_at: string
}

export type Channel = {
  id: string
  name: string
}

export type CommentProps = {
  comment: string 
  id: number
}

type DeleteCommentProps = {
  id: number
  commentId: number
}

const api = {
  fetchSession: (sessionId: string) => axios.get(`https://growth.vehikl.com/growth_sessions/${sessionId}`),
  fetchDaySession: axios.get('https://growth.vehikl.com/growth_sessions/day'),
  fetchWeekSessions: (date: string) =>
    axios.get('https://growth.vehikl.com/growth_sessions/week', {
      params: { date }
    }),
  createSession: (data: Session) => axios.post('https://growth.vehikl.com/growth_sessions', data),
  deleteSession: (sessionId: number) => axios.delete(`https://growth.vehikl.com/growth_sessions/${sessionId}`),
  createComment: ({ id, comment }: CommentProps) => axios.post(`https://growth.vehikl.com/growth_sessions/${id}/comments`, { content: comment }),
  deleteComment: ({ id, commentId }: DeleteCommentProps) => axios.delete(`https://growth.vehikl.com/growth_sessions/${id}/comments/${commentId}`),
  fetchChannels: async (): Promise<any> => await axios.get('https://growth.vehikl.com/api/discord-channels'),
}

export default api
