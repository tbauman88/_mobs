import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
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
        <ExploreContainer name="Vehikl Growth Sessions page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
