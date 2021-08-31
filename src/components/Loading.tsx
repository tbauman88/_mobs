import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSpinner,
  IonText
} from '@ionic/react'
import { useHistory } from 'react-router'
import './Loading.scss'

interface LoadingErrorProps {
  state: 'loading' | 'error' | 'not-found'
  message?: string
}

const LoadingError: React.FC<LoadingErrorProps> = ({ state, message }) => {
  const history = useHistory()

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center">
              {state === 'loading' && (
                <>
                  <IonText color="dark">
                    <h3>Loading...</h3>
                  </IonText>
                  <IonSpinner name="dots" />
                </>
              )}
              {state === 'error' && (
                <IonText color="dark">
                  <h3>Error</h3>
                </IonText>
              )}
              {state === 'not-found' && (
                <>
                  <IonText color="dark">
                    <h3>{message}</h3>
                  </IonText>
                  <IonButton
                    fill="outline"
                    onClick={() => {
                      history.push('/tab1')
                    }}
                  >
                    Back to Sessions
                  </IonButton>
                </>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default LoadingError
