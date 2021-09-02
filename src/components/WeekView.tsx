import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { useQuery } from 'react-query'
import api, { Session } from '../api'
import Card from './Card/Card'
import LoadingError from './Loading'

const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const DayHeader: React.FC<{ day: string }> = ({ day }) => (
  <IonCol>
    <IonItemDivider className="ion-text-uppercase">
      <IonText color="dark">
        <h5>{day}</h5>
      </IonText>
      <IonButton slot="end" fill="clear">
        <IonIcon slot="start" icon={addOutline}></IonIcon>
        Create
      </IonButton>
    </IonItemDivider>
  </IonCol>
)

const EmptyCard: React.FC = () => (
  <IonCard className="ion-margin-vertical">
    <IonList inset mode="ios" className="ion-no-margin">
      <IonItem lines="none" className="ion-align-items-start ion-no-padding card-item">
        <IonText color="dark">
          <h3 className="ion-no-margin">Empty Card</h3>
        </IonText>
      </IonItem>
    </IonList>
  </IonCard>
)

const WeekView: React.FC<{ date: string }> = ({ date }) => {
  console.log(date)

  const {
    data: sessions = [],
    isError,
    isLoading
  } = useQuery('week', () => api.fetchWeekSessions(date), {
    select: (week) => Object.keys(week?.data).map((key) => [...week?.data[key]]),
    retry: 1
  })

  if (isLoading) return <LoadingError state="loading" />
  if (isError) return <LoadingError state="error" />

  return (
    <IonGrid>
      <IonRow>
        {WEEKDAY_NAMES.map((day, index) => (
          <DayHeader key={index} {...{ day }} />
        ))}
      </IonRow>
      <IonRow>
        {sessions.map((day: Session[], index) => (
          <IonCol className="ion-no-padding" key={index}>
            {day.length > 0 ? (
              day.map((session: Session, index) => (
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
