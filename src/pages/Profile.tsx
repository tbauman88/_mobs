import {
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react'
import { moonOutline } from 'ionicons/icons'
import { useState } from 'react'
import { Attendee } from '../api'
import { useDarkMode } from '../AppContext'
import './Profile.scss'

const githubUser: Attendee = {
  avatar: 'https://avatars0.githubusercontent.com/u/25010884?v=4',
  github_nickname: 'tbauman88',
  id: 4,
  is_vehikl_member: true,
  name: 'Tyler Bauman'
}

const Profile: React.FC = () => {
  const [user] = useState<Attendee>(githubUser)
  const [name, setName] = useState<string>()
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>You</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">You</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem
          href={`https://www.github.com/${user.github_nickname}`}
          target="_blank"
          className="item"
          color="light"
          detail
          lines="full"
        >
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonThumbnail>
                <img src={user.avatar} alt={user.name} />
              </IonThumbnail>
              <div className="ion-margin-start">
                <IonText>
                  <h1>{user.name}</h1>
                </IonText>
                <IonText color="medium">View Profile</IonText>
              </div>
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItemDivider className="ion-margin-top ion-padding-top ion-text-uppercase">
          Account Information
        </IonItemDivider>
        <IonItem className="item" color="light" lines="full">
          <IonLabel color="medium" position="stacked">
            Name
          </IonLabel>
          <IonInput value={user.name} readonly></IonInput>
        </IonItem>
        <IonItem className="item" color="light" lines="full">
          <IonLabel color="medium" position="stacked">
            Github Nickname
          </IonLabel>
          <IonInput value={user.github_nickname} readonly></IonInput>
        </IonItem>
        <IonItem className="item" color="light" lines="full">
          <IonLabel color="medium" position="floating">
            Slack Username
          </IonLabel>
          <IonInput value={name}></IonInput>
        </IonItem>

        <IonItemDivider className="ion-margin-top ion-padding-top ion-text-uppercase">
          Growth Session Stats
        </IonItemDivider>

        <IonItemDivider className="ion-margin-top ion-padding-top ion-text-uppercase">
          User Settings
        </IonItemDivider>
        <IonItem className="item" color="light" lines="full">
          <IonIcon slot="start" icon={moonOutline}></IonIcon>
          <IonLabel>Dark Mode</IonLabel>
          <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
        </IonItem>
      </IonContent>
    </IonPage>
  )
}

export default Profile
