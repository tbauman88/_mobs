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
import api from '../api'

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

  console.log(sessions)

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
          <IonCard className="ion-no-margin">
            <IonList inset mode="ios">
              <IonItem lines="none" className="ion-align-items-start ion-no-padding">
                <IonThumbnail className="thumbnail" slot="start">
                  <IonText color="light">
                    <h3>11:30</h3>
                  </IonText>
                  <IonText color="light">AM</IonText>
                </IonThumbnail>
                <div className="ion-text-wrap">
                  <IonGrid>
                    <IonRow className="ion-margin-bottom">
                      <IonText color="dark">
                        <h1 className="ion-no-margin">
                          Finishing off our multi-group dropdown menu
                        </h1>
                      </IonText>
                    </IonRow>
                    <IonRow className="ion-margin-bottom ion-align-items-center">
                      <IonText className="ion-margin-end" color="medium">
                        <h5 className="ion-no-margin">Darren Galway</h5>
                      </IonText>
                      <IonAvatar>
                        <img src="https://avatars.githubusercontent.com/u/11524317?s=96&v=4" />
                      </IonAvatar>
                    </IonRow>
                    <IonRow className="ion-margin-bottom">
                      <IonChip color="dark">
                        <IonLabel color="medium">Private</IonLabel>
                      </IonChip>
                      <IonChip color="dark">
                        <IonLabel color="medium">1 hour</IonLabel>
                      </IonChip>
                    </IonRow>
                    <IonRow className="ion-align-items-center">
                      <IonCol>
                        <IonIcon color="medium" icon={peopleOutline}></IonIcon>
                        <IonText color="medium">4 spots remaining</IonText>
                      </IonCol>
                      <IonCol className="ion-align-self-end">
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
        {view === 'week' && (
          <IonGrid>
            <IonRow>
              <IonCol>
              Monday
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Title</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem lines="none">
                      <p>Darren Galway</p>
                      <IonAvatar>
                        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                      </IonAvatar>
                    </IonItem>
                    <IonItem lines="none">
                      <IonChip>
                        <IonLabel>Private</IonLabel>
                      </IonChip>
                      <IonChip>
                        <IonLabel>1 hour</IonLabel>
                      </IonChip>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>
                        <IonIcon icon={peopleOutline}></IonIcon>4 spots remaining
                      </IonLabel>
                      <IonNote slot="end" color="tertiary">
                        Join
                      </IonNote>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>Tuesday</IonCol>
              <IonCol>Wednesday</IonCol>
              <IonCol>Thursday</IonCol>
              <IonCol>Friday</IonCol>
            </IonRow>
          </IonGrid>
        )}
        {/* <ExploreContainer name="Vehikl Growth Sessions page" /> */}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
