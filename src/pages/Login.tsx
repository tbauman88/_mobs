import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonToolbar
} from '@ionic/react'
import { arrowForward } from 'ionicons/icons'
import { useHistory } from 'react-router'
import './Login.scss'
import Growth from '../img/growth.svg'
import Delivery from '../img/delivery.svg'
import Caring from '../img/caring.svg'

const Login: React.FC = () => {
  const history = useHistory()

  return (
    <IonPage id="login-page">
      <IonHeader no-border>
        <IonToolbar color="light">
          <IonButtons slot="end" className="ion-text-uppercase">
            <IonButton
              fill="clear"
              color="primary"
              onClick={() => history.push('/home', { direction: 'none' })}
            >
              Skip
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonSlides>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol pushMd="2" sizeMd="8" pushLg="3" sizeLg="6">
                  <img src={Delivery} />
                  <h2>Welcome</h2>
                  <p>
                    <b>Vehikl Growth Sessions</b> allows users to share and schedule their sessions.
                    To create or join private sessions you must be logged in.
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>

          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol pushXl="4" sizeXl="4">
                  <img className="growth" src={Growth} />
                  <h2>What is a Growth Session?</h2>
                  <p>
                    <b>Growth Sessions</b> are an opportunity for each of us to sharpen our saw (and
                    discover brand new innovations like the chainsaw!). It is a space for
                    experimenting, getting help when we are stuck, learning from others and sharing
                    the benefits of what we have discovered in our travels.
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>

          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol pushXl="4" sizeXl="4">
                  <img src={Caring} />
                  <h2>Hotkeys?</h2>
                  <p>
                    If on a web browser we have set up the folowing hotkeys you can use;{' '}
                    <b>d = day</b> and <b>w = week</b> to switch between the views.
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>

          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol pushXl="4" sizeXl="4">
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
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Login
