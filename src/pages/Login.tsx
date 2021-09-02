import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonText
} from '@ionic/react'
import { arrowForward } from 'ionicons/icons'
import { useHistory } from 'react-router'
import './Login.scss'

const Login: React.FC = () => {
  const history = useHistory()

  return (
    <IonPage id="login-page">
      <IonContent color="light">
        <IonSlides>
          <IonSlide>
            <div className="slide">
              <img src="https://github.com/ionic-team/ionic-conference-app/blob/master/src/assets/img/ica-slidebox-img-1.png?raw=true" />
              <h2>Welcome</h2>
              <p>
                <b>Vehikl Growth Sessions</b> allows users to share and schedule their sessions.
                <br />
                To create or join private sessions you must be logged in.
              </p>
            </div>
          </IonSlide>

          <IonSlide>
            <img src="https://github.com/ionic-team/ionic-conference-app/blob/master/src/assets/img/ica-slidebox-img-2.png?raw=true" />
            <h2>What is a Growth Session?</h2>
            <p>
              <b>Vehikl Growth Sessions</b> are an opportunity for each of us to sharpen our saw
              (and
              <br />
              discover brand new innovations like the chainsaw!). It is a space for experimenting,
              <br />
              getting help when we are stuck, learning from others and sharing the benefits of what
              <br />
              we have discovered in our travels.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="https://github.com/ionic-team/ionic-conference-app/blob/master/src/assets/img/ica-slidebox-img-3.png?raw=true" />
            <h2>What is Appflow?</h2>
            <p>
              We have set up hotkeys to switch views. If on a web browser, you can see the day view
              by hitting <b>D/W</b> to see the week view.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="https://github.com/ionic-team/ionic-conference-app/blob/master/src/assets/img/ica-slidebox-img-4.png?raw=true" />
            <h2>Ready to Login?</h2>
            <div className="ion-margin-top">
              <IonButton
                type="button"
                color="primary"
                onClick={() => {
                  history.push('/home', { direction: 'none' })
                }}
              >
                Login With Github
              </IonButton>
            </div>
            <IonButton
              fill="clear"
              color="medium"
              onClick={() => {
                history.push('/home', { direction: 'none' })
              }}
            >
              Continue <IonIcon slot="end" icon={arrowForward}></IonIcon>
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Login
