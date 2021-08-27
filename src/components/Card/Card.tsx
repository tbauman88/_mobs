import {
  IonAvatar,
  IonButton,
  IonCard,
  IonChip,
  IonCol,
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
import './Card.scss'

interface Attendee {
  avatar: string
  created_at: string
  email_verified_at: string
  github_nickname: string
  id: number
  is_vehikl_member: boolean
  name: string
}

interface SessionProps {
  attendee_limit: number
  attendees: Attendee[]
  comments: []
  created_at: string
  date: string
  discord_channel_id: string
  end_time: string
  id: number
  is_public: boolean
  location: string
  owner: Attendee
  start_time: string
  title: string
  topic: string
}

type CardProps = {
  session: SessionProps
  view: string
}

const convertTimeDiff = (startTime: string, endTime: string) => {
  const diffInMinutes = DateTime.fromISO(startTime).diff(DateTime.fromISO(endTime), 'minutes')
  return `${diffInMinutes.toObject().minutes} minutes`
}

const Card: React.FC<CardProps> = ({
  session: {
    attendee_limit,
    attendees,
    end_time,
    is_public: isPublic,
    owner,
    start_time,
    title,
    topic
  },
  view
}) => {
  const [startTime, startMeridiem] = start_time.split(' ')
  const [endTime] = end_time.split(' ')
  const isDayView = view === 'day'

  return (
    <IonCard className={isDayView ? 'ion-no-margin ion-margin-bottom' : 'ion-margin-vertical'}>
      <IonList inset mode="ios">
        <IonItem lines="none" className="ion-align-items-start ion-no-padding">
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
