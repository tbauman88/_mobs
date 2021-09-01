import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './About.scss'

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="About page" />
        {/* <IonGrid className="ion-margin-horizontal">
          <IonRow>
            <IonCol sizeSm="auto" sizeLg="6">
              <IonText color="dark">
                <h3>What is a Vehikl Growth Session?</h3>
                <p>
                  In "The 7 Habits of Highly Effective People" Stephen Covey tells the story of a
                  hiker who was walking through a forest when they came across a frustrated
                  lumberjack. The lumberjack was trying to cut down a tree with a saw and was swearing
                  and cursing, labouring in vain. “What’s the problem?” The hiker asked. “My saw’s
                  blunt and won’t cut the tree properly.” The lumberjack responded. “Why don’t you
                  just sharpen it?” “Because then I would have to stop sawing.” Said the lumberjack.
                  “But if you sharpened your saw, you could cut more efficiently and effectively than
                  before.” “But I don’t have time to stop!” The lumberjack retorted, getting even more
                  frustrated. The hiker shook his head and kept on walking, leaving the lumberjack to
                  his pointless frustration. Vehikl Growth Sessions are an opportunity for each of us
                  to sharpen our saw (and discover brand new innovations like the chainsaw!). It is a
                  space for experimenting, getting help when we are stuck, learning from others and
                  sharing the benefits of what we have discovered in our travels.
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid> */}
      </IonContent>
    </IonPage>
  )
}

export default About
