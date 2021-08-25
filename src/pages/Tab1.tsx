import {
  IonAvatar,
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
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import { useQuery } from 'react-query'
import './Tab1.css'
import axios from 'axios'
import { peopleOutline } from 'ionicons/icons'
import { useState } from 'react'
import * as dbDate from '../db.json'

const Tab1: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const { status, isLoading, isError, data } = useQuery('week', async () => {
    await axios.get('https://growth.vehikl.com/growth_sessions/week', {
      params: { date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` }
    })
  })

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

  console.log(data)

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
        <IonGrid>
          <IonRow>
            <IonCol>
              Monday
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Finishing off our multi-group dropdown menu</IonCardTitle>
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
        {/* <ExploreContainer name="Vehikl Growth Sessions page" /> */}
      </IonContent>
    </IonPage>
  )
}

async function getSessions() {
  return await axios.get('https://growth.vehikl.com/growth_sessions/week', {
    params: { date: '2021-08-24' }
  })
}

// data
// attendee_limit: 4
// date: "2021-08-27T04:00:00.000Z”
// discord_channel_id: “546513731757146112"
// end_time: "05:00 pm”
// is_public: false
// location: "Discord Channel: AbleTo”
// start_time: "03:30 pm”
// title: “test"
// topic: "test"
async function createSession(data: any) {
  return await axios.post('https://growth.vehikl.com/growth_sessions', data)
}

async function removeSession(sessionId: number) {
  return await axios.delete(`https://growth.vehikl.com/growth_sessions/${sessionId}`)
}

export default Tab1
