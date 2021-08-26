import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import { useQuery } from 'react-query'
import './Tab1.scss'
import axios from 'axios'
import { peopleOutline } from 'ionicons/icons'
import { useState } from 'react'
import { DateTime } from "luxon";

const convertTimeDiff = (startTime: string, endTime: string) => {
  let start = DateTime.fromISO(startTime) 
  let end = DateTime.fromISO(endTime) 
  // return end.diff(start, 'hours')
  console.log(start, end);
  return '{start, end}'
}

const Tab1: React.FC = () => {
  const [view, setView] = useState<string | undefined>('day')
  const [date, setDate] = useState(new Date())
  const { data, isError, isLoading } = useQuery('week', () =>
    axios.get('https://growth.vehikl.com/growth_sessions/week', {
      params: { date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` }
    })
  )

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired')
  })

  useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired')
  })

  useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired')
  })

  useIonViewDidLeave(() => {
    console.log('ionViewDidLeave event fired')
  })

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error</span>

  const sessions = Object.keys(data?.data).map((key) => [...data?.data[key]])

  console.log(data?.data)
  console.log(sessions, 'session')

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
        <IonSegment mode="md" onIonChange={(e) => setView(e.detail.value)} value={view}>
          <IonSegmentButton value="day">
            <IonLabel>Day</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="week">
            <IonLabel>Week</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {view === 'day' && (
          <>
            {sessions.map((day, index) =>
              day.map((session) => (
                <>
                  {session.date === date.toISOString().split('T')[0] && (
                    <IonCard className="ion-no-margin">
                      <IonList inset mode="ios">
                        <IonItem lines="none" className="ion-align-items-start ion-no-padding">
                          <IonThumbnail className="thumbnail" slot="start">
                            <IonText color="light">
                              <h3>{session.start_time.split(" ")[0]}</h3>
                            </IonText>
                            <IonText color="light">{session.start_time.split(" ")[1]}</IonText>
                          </IonThumbnail>
                          <div className="ion-text-wrap">
                            <IonGrid>
                              <IonRow className="ion-margin-bottom">
                                <IonText color="dark">
                                  <h1 className="ion-no-margin">
                                    {session.title}
                                  </h1>
                                </IonText>
                              </IonRow>
                              <IonRow className="ion-margin-bottom ion-align-items-center">
                                <IonText className="ion-margin-end" color="medium">
                                  <h5 className="ion-no-margin">{session.owner.name}</h5>
                                </IonText>
                                <IonAvatar>
                                  <img src={session.owner.avatar} alt={session.owner.name} />
                                </IonAvatar>
                              </IonRow>
                              <IonRow className="ion-margin-bottom">
                                <IonChip color="dark">
                                  <IonLabel color="medium">
                                    {session.is_public ? 'Public' : 'Private'}
                                  </IonLabel>
                                </IonChip>
                                <IonChip color="dark">
                                  <IonLabel color="medium">
                                    {
                                      convertTimeDiff(session.start_time, session.end_time)
                                    }
                                  </IonLabel>
                                </IonChip>
                              </IonRow>
                              <IonRow className="ion-align-items-center">
                                <IonCol>
                                  <IonIcon color="medium" icon={peopleOutline}></IonIcon>
                                  <IonText color="medium">
                                    {session.attendee_limit - session.attendees.length} spots remaining
                                  </IonText>
                                </IonCol>
                                <IonCol className="ion-text-end">
                                  <IonButton size="default" fill="clear" color="primary">
                                    Join
                                  </IonButton>
                                </IonCol>
                              </IonRow>
                            </IonGrid>
                          </div>
                        </IonItem>
                      </IonList>
                    </IonCard>
                  )}
                </>
              ))
            )}
          </>
        )}
        {view === 'week' && (
          <IonGrid>
            <IonRow>
              {sessions.map((day, index) => (
                <IonCol key={index}>
                  {day.map((session) => (
                    <IonCard key={session.id}>
                      <IonCardHeader>
                        <IonCardTitle>{session.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonItem lines="none">
                          <p>{session.owner.name}</p>
                          <IonAvatar>
                            <img src={session.owner.avatar} alt={session.owner.name} />
                          </IonAvatar>
                        </IonItem>
                        <IonItem lines="none">
                          <IonChip>
                            <IonLabel>{session.is_public ? 'Public' : 'private'}</IonLabel>
                          </IonChip>
                          <IonChip>
                            <IonLabel>1 hour</IonLabel>
                          </IonChip>
                        </IonItem>
                        <IonItem lines="none">
                          <IonLabel>
                            <IonIcon icon={peopleOutline}></IonIcon>
                            {session.attendee_limit - session.attendees.length}
                          </IonLabel>
                          <IonNote slot="end" color="tertiary">
                            Join
                          </IonNote>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
        {/* <ExploreContainer name="Vehikl Growth Sessions page" /> */}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
