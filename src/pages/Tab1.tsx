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
import axios from 'axios'
import { addOutline, calendarNumber, calendarSharp } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { Fragment, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Session } from '../api'
import Card from '../components/Card/Card'
import CreateSession from '../modals/CreateSession'
import './Tab1.scss'

const Tab1: React.FC = () => {
  const [view, setView] = useState<string | undefined>('day')
  const [date] = useState(DateTime.fromISO(DateTime.now().toISODate()))

  const { data, isError, isLoading } = useQuery('week', () =>
    axios.get('https://growth.vehikl.com/growth_sessions/week', {
      params: { date }
    })
  )

  const mutation = useMutation(
    (data: Session) => axios.post('https://growth.vehikl.com/growth_sessions', data)
  )

  const [present, dismiss] = useIonModal(CreateSession, {
    date,
    onDismiss: () => {
      dismiss()
    },
    onSubmit: (data: Session) => {
      mutation.mutate(data)
      dismiss()
    } 
  })

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error</span>

  const sessions = Object.keys(data?.data).map((key) => [...data?.data[key]])

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
          mode="md"
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
        <IonFab edge vertical="top" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => {
              present()
            }}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
