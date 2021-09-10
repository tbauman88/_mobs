import { useQuery } from 'react-query'
import api, { Session } from '../api'
import Card from './Card'
import LoadingError from './Loading'

const DayView: React.FC = () => {
  const {
    data: sessions = [],
    isError,
    isLoading
  } = useQuery('day', () => api.fetchDaySession, {
    select: (day) => day.data.sort((day: Session) => day.updated_at),
    retry: 1
  })

  if (isLoading) return <LoadingError state="loading" />
  if (isError) return <LoadingError state="error" />

  return sessions.map((session: Session) => <Card key={session.id} {...{ session, view: 'day' }} />)
}

export default DayView
