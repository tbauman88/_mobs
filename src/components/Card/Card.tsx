import {
  IonAvatar,
  IonButton,
  IonCard,
  IonChip,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonThumbnail
} from '@ionic/react'
import { lockClosedOutline, lockOpenOutline, peopleOutline, timeOutline } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { useSessions } from '../../AppContext'
import './Card.scss'
import { Session } from '../../api'
import { convertTimeDiff } from '../../utils/helpers'

type CardProps = {
  session: Session
  view: string
}

const Card: React.FC<CardProps> = ({ session, view }) => {
  const {
    attendee_limit,
    attendees,
    end_time,
    id,
    is_public: isPublic,
    owner,
    start_time,
    title,
    topic
  } = session
  const { setSession } = useSessions()

  const [startTime, startMeridiem] = start_time.split(' ')
  const [endTime] = end_time.split(' ')
  const isDayView = view === 'day'

  return (
    <IonCard className={isDayView ? 'ion-no-margin ion-margin-bottom' : 'ion-margin-vertical'}>
      <IonList inset mode="ios" className="ion-no-margin">
        <IonItem
          onClick={() => setSession(session)}
          routerLink={`/tabs/sessions/${id}`}
          lines="none"
          className="ion-align-items-start ion-no-padding card-item"
        >
          {isDayView ? (
            <IonThumbnail className="thumbnail" slot="start">
              <IonText color="light">
                <h3>{DateTime.fromISO(startTime).toFormat('h:mm')}</h3>
              </IonText>
              <IonText className="ion-text-uppercase" color="light">
                {startMeridiem}
              </IonText>
            </IonThumbnail>
          ) : null}
          <div className="ion-text-wrap">
            <IonGrid>
              <IonRow className="ion-margin-bottom">
                <IonText color="dark">
                  {isDayView ? (
                    <h1 className="ion-no-margin">{title}</h1>
                  ) : (
                    <h3 className="ion-no-margin">{title}</h3>
                  )}
                </IonText>
              </IonRow>
              <IonRow className="ion-margin-bottom ion-align-items-center">
                <IonChip outline={false} color="light">
                  <IonAvatar>
                    <img src={owner.avatar} alt={owner.name} />
                  </IonAvatar>
                  <IonText className="ion-margin-end" color="medium">
                    {isDayView ? (
                      <h5 className="ion-no-margin">{owner.name}</h5>
                    ) : (
                      <h6 className="ion-no-margin">{owner.name}</h6>
                    )}
                  </IonText>
                </IonChip>
              </IonRow>
              {isDayView && (
                <IonRow className="ion-margin-bottom ion-align-items-center">
                  <IonText color="medium">
                    <p className="ion-no-margin">{topic}</p>
                  </IonText>
                </IonRow>
              )}
              <IonRow className="">
                <IonChip color="dark">
                  <IonIcon size="small" icon={isPublic ? lockOpenOutline : lockClosedOutline} />
                  <IonLabel color="medium">{isPublic ? 'Public' : 'Private'}</IonLabel>
                </IonChip>
                <IonChip color="dark">
                  <IonIcon size="small" icon={timeOutline} />
                  <IonLabel color="medium">{convertTimeDiff(startTime, endTime)}</IonLabel>
                </IonChip>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonChip outline={false} color="light">
                  <IonIcon color="medium" icon={peopleOutline}></IonIcon>
                  <IonText color="medium">
                    {attendee_limit === null && 'No Limit'}
                    {attendees.length === attendee_limit && 'Limit Reached'}
                    {attendees.length < attendee_limit &&
                      `${attendee_limit - attendees.length} spots remaining`}
                  </IonText>
                </IonChip>
                <IonButton>Join</IonButton>
              </IonRow>
            </IonGrid>
          </div>
        </IonItem>
      </IonList>
    </IonCard>
  )
}

export default Card
