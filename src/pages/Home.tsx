import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonModal
} from '@ionic/react'
import { addOutline, calendarNumber, calendarSharp } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useKey } from 'react-use'
import api, { Session } from '../api'
import DayView from '../components/DayView'
import WeekView from '../components/WeekView'
import CreateSession from '../modals/CreateSession'
import './Home.scss'
import LoginButton from '../components/LoginButton'

const Home: React.FC = () => {
  const [view, setView] = useState<string | undefined>('day')
  const [date] = useState(DateTime.now().toISODate())
  
  useKey('d', () => setView('day'))
  useKey('w', () => setView('week'))

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
  
  const loggedIn = false

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vehikl Growth Sessions</IonTitle>
          {!loggedIn && (
            <IonButtons slot="end" className="ion-margin-end">
              <LoginButton name="Login" />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Vehikl Growth Sessions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSegment mode="md" onIonChange={(e) => setView(e.detail.value)} value={view}>
          <IonSegmentButton value="day">
            <IonIcon icon={calendarNumber} />
            <IonLabel>Day</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="week">
            <IonIcon icon={calendarSharp} />
            <IonLabel>Week</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {view === 'day' && <DayView />}
        {view === 'week' && <WeekView {...{ date }} />}
      </IonContent>
      {view === 'day' && (
        <IonFab edge vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            style={{ marginBottom: '40px' }}
            onClick={() => {
              present()
            }}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      )}
    </IonPage>
  )
}

export default Home
