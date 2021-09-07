import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonRow,
  IonText,
  useIonModal
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import api, { Session } from '../api'
import CreateSession from '../modals/CreateSession'
import Card from './Card/Card'
import WeekCard from './Card/WeekCard'
import LoadingError from './Loading'

const DayHeader: React.FC<{ date: DateTime; day: DateTime; onClick: any }> = ({
  date,
  day,
  onClick
}) => (
  <IonCol>
    <IonItemDivider className="ion-text-uppercase ion-padding-bottom">
      <IonText color="dark">
        <h5 className="ion-no-margin">{day.toFormat(`EEE`)}</h5>
        <h5 className="ion-no-margin">{day.toFormat(`d`)}</h5>
      </IonText>
      {day.toISODate() >= date.toISODate() && (
        <IonButton slot="end" fill="clear" onClick={() => onClick(day)}>
          <IonIcon slot="start" icon={addOutline}></IonIcon>
          Create
        </IonButton>
      )}
    </IonItemDivider>
  </IonCol>
)

const EmptyCard: React.FC = () => (
  <IonCard className="ion-margin-vertical ion-padding ion-text-center">
    <IonText color="dark">
      <h3 className="ion-no-margin">No Scheduled Growth Sessions</h3>
    </IonText>
  </IonCard>
)

const WeekView: React.FC<{ date: string }> = ({ date }) => {
  const { data, isError, isLoading } = useQuery('week', () => api.fetchWeekSessions(date), {
    retry: 1
  })
  const [dates, setDates] = useState<string[]>([])
  const [viewDate, setViewDate] = useState<string>('')

  const { mutate } = useMutation(api.createSession)

  const [present, dismiss] = useIonModal(CreateSession, {
    date: viewDate,
    channels: () => api.fetchChannels,
    onDismiss: () => {
      dismiss()
    },
    onSubmit: (data: Session) => {
      mutate(data)
      dismiss()
    }
  })

  useEffect(() => {
    if (data?.data) setDates(Object.keys(data?.data))
  }, [data])

  if (isLoading) return <LoadingError state="loading" />
  if (isError) return <LoadingError state="error" />

  const sessions = Object.keys(data?.data).map((key) => [...data?.data[key]])

  return (
    <IonGrid>
      <IonRow>
        {dates.map((day) => (
          <DayHeader
            key={day}
            day={DateTime.fromISO(day)}
            date={DateTime.fromISO(date)}
            onClick={(day: string) => {
              setViewDate(day)
              present()
            }}
          />
        ))}
      </IonRow>
      <IonRow>
        {sessions.map((day: Session[], index) => (
          <IonCol className="ion-no-padding" key={index}>
            {day.length > 0 ? (
              day.map((session: Session) => (
                <Card key={session.id} {...{ session, view: 'week' }} />
              ))
            ) : (
              <EmptyCard />
            )}
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  )
}

export default WeekView
