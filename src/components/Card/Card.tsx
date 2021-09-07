import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonPopover,
  IonRow,
  IonText,
  IonThumbnail
} from '@ionic/react'
import {
  calendarNumberOutline,
  copyOutline,
  createOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  lockClosedOutline,
  lockOpenOutline,
  peopleOutline,
  timeOutline,
  trashOutline
} from 'ionicons/icons'
import { DateTime } from 'luxon'
import { useCallback, useState } from 'react'
import { useMedia } from 'react-use'
import { Session } from '../../api'
import { useSessions } from '../../AppContext'
import { convertTimeDiff } from '../../utils/helpers'
import './Card.scss'

type ActionProps = {
  text: string
  icon: string
}

const actions: ActionProps[] = [
  { text: 'Schedule', icon: calendarNumberOutline },
  { text: 'Update', icon: createOutline },
  { text: 'Copy', icon: copyOutline },
  { text: 'Delete', icon: trashOutline }
]

const Card: React.FC<{ session: Session; view: string }> = ({ session, view }) => {
  const {
    attendee_limit,
    attendees,
    end_time,
    id,
    is_public: isPublic,
    owner,
    start_time,
    title,
    topic,
    date
  } = session
  const { setSession } = useSessions()
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const [popoverEvent, setPopoverEvent] = useState<MouseEvent>()
  const isMobile = useMedia('(max-width: 480px)')

  const [startTime, startMeridiem] = start_time.split(' ')
  const [endTime] = end_time.split(' ')
  const isDayView = view === 'day'

  const today = DateTime.now().toISODate()
  const sessionDate = DateTime.fromISO(date).toISODate()
  const isTodayOrFutrue = sessionDate >= today

  const presentPopover = useCallback((e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent)
    setShowPopover(true)
  }, [])

  const onPopoverClick = (action: string) => {
    console.log(action)
    setShowPopover(false)
  }

  return (
    <>
      <IonCard
        id="card"
        className={isDayView ? 'ion-no-margin ion-margin-bottom' : 'ion-margin-vertical'}
        onClick={() => setSession(session)}
        routerLink={`/tabs/sessions/${id}`}
      >
        <IonCardHeader style={{ paddingRight: isTodayOrFutrue && '4px' }}>
          <IonItem
            detail={false}
            lines="none"
            className="ion-align-items-start ion-no-padding card"
          >
            <IonThumbnail className="thumbnail" slot="start">
              <IonText color="light">
                <h4>{DateTime.fromISO(startTime).toFormat('h:mm')}</h4>
              </IonText>
              <IonText className="ion-text-uppercase" color="light">
                {startMeridiem}
              </IonText>
            </IonThumbnail>

            <div>
              <IonText color="dark" style={{ width: '100%' }}>
                <h3 className="ion-no-margin" style={{ marginBottom: '0.75rem' }}>
                  {title}
                </h3>
              </IonText>
              <IonChip outline={false} color="light" className="ion-no-margin">
                <IonAvatar style={{ width: '32px', height: '32px' }}>
                  <img src={owner.avatar} alt={owner.name} />
                </IonAvatar>
                <IonText className="ion-margin-end" color="medium">
                  <h6 className="ion-no-margin">{owner.name}</h6>
                </IonText>
              </IonChip>
            </div>

            {isTodayOrFutrue && (
              <IonButtons slot="end">
                <IonButton onClick={presentPopover} color="dark">
                  <IonIcon
                    size="small"
                    slot="icon-only"
                    ios={ellipsisHorizontal}
                    md={ellipsisVertical}
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            )}
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonItem
            detail={false}
            lines="none"
            className="ion-align-items-start ion-no-padding card"
          >
            <IonGrid className="ion-no-padding">
              {isDayView && (
                <IonRow className="ion-margin-bottom ion-align-items-center">
                  <IonText color="medium">
                    <p className="ion-no-margin ion-no-padding">{topic}</p>
                  </IonText>
                </IonRow>
              )}

              <IonRow>
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
                      `${attendee_limit - attendees.length} spot/s remaining`}
                  </IonText>
                </IonChip>
                {isTodayOrFutrue && !isMobile && <IonButton>Join</IonButton>}
              </IonRow>
            </IonGrid>
          </IonItem>

          {isDayView && isMobile && (
            <IonButton className="ion-margin-top" color="primary" expand="full" shape="round">
              Join
            </IonButton>
          )}
        </IonCardContent>
      </IonCard>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonItemGroup>
          {actions.map(({ text, icon }) => (
            <IonItem
              key={text}
              className="ion-no-padding"
              button
              lines="full"
              onClick={() => onPopoverClick(text)}
            >
              <IonLabel className="ion-padding-start">{text}</IonLabel>
              <IonIcon slot="end" size="small" {...{ icon }}></IonIcon>
            </IonItem>
          ))}
        </IonItemGroup>
      </IonPopover>
    </>
  )
}

export default Card
