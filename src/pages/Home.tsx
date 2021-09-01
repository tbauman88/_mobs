import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal
} from '@ionic/react'
import { addOutline, calendarNumber, calendarSharp } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { Fragment, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import api, { Session } from '../api'
import Card from '../components/Card/Card'
import LoadingError from '../components/Loading'
import CreateSession from '../modals/CreateSession'
import './Home.scss'

const Home: React.FC = () => {
  const [view, setView] = useState<string | undefined>('day')
  const [date] = useState(DateTime.now().plus({ day: 1 }).toISODate())

  const {
    data: sessions = [],
    isError,
    isLoading
  } = useQuery(['week', date], () => api.fetchSessions(date), {
    select: (sessions) => Object.keys(sessions?.data).map((key) => [...sessions?.data[key]]),
    retry: 1
  })

  const { mutate } = useMutation(api.createSession)

  const [present, dismiss] = useIonModal(CreateSession, {
    date,
    channels: () => api.fetchChannels,
    onDismiss: () => {
      dismiss()
    },
    onSubmit: (data: Session) => {
      mutate(data)
      dismiss()
    }
  })

  if (isLoading) return <LoadingError state="loading" />
  if (isError) return <LoadingError state="error" />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vehikl Growth Sessions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Vehikl Growth Sessions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSegment
          className="ion-margin-top"
          onIonChange={(e) => setView(e.detail.value)}
          value={view}
        >
          <IonSegmentButton value="day">
            <IonIcon icon={calendarNumber} />
            <IonLabel>Day</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="week">
            <IonIcon icon={calendarSharp} />
            <IonLabel>Week</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {view === 'day' &&
          sessions.map((day) =>
            day.map(
              (session) => session.date === date && <Card key={session.id} {...{ session, view }} />
            )
          )}
        {view === 'week' && (
          <IonGrid>
            <IonRow>
              {sessions.map((day, index) => (
                <IonCol className="ion-no-padding" key={index}>
                  {day.map((session, index) => (
                    <Fragment key={session.id}>
                      {index === 0 && (
                        <IonText className="ion-text-center" color="dark">
                          <h5>{DateTime.fromISO(session.date).toFormat('EEEE')}</h5>
                        </IonText>
                      )}
                      <Card {...{ session, view }} />
                    </Fragment>
                  ))}
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
        <IonFab edge vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => {
              present()
            }}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  )
}

export default Home
