import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonPopover,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import {
  chatbubbleEllipsesOutline,
  chevronDown,
  chevronUp,
  ellipsisHorizontal,
  ellipsisVertical,
  lockClosedOutline,
  lockOpenOutline,
  removeCircle,
  timeOutline
} from 'ionicons/icons'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { RouteComponentProps } from 'react-router'
import api from '../api'
import { useSessions } from '../AppContext'
import LoadingError from '../components/Loading'
import { convertTimeDiff } from '../utils/helpers'
import './SessionDetail.scss'

interface SessionDetailPageProps extends RouteComponentProps<{ id: string }> {}

const SessionDetail: React.FC<SessionDetailPageProps> = ({ match }): JSX.Element => {
  const { session, setSession } = useSessions()
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const [popoverEvent, setPopoverEvent] = useState<MouseEvent>()
  const [comment, setComment] = useState<string>('')
  const [showAttendees, setShowAttendees] = useState<boolean>(true)
  const { mutate: createMutate } = useMutation(api.createComment)
  const { mutate: deleteMutate } = useMutation(api.deleteComment)

  const { isError, isLoading } = useQuery('id', () => api.fetchSession(match.params.id), {
    onSuccess: (day) => setSession(day?.data),
    retry: 1
  })

  if (isLoading) return <LoadingError state="loading" />
  if (isError) return <LoadingError state="error" />
  if (!session) return <LoadingError state="not-found" message="Session not found" />

  const {
    attendees,
    comments,
    end_time,
    id,
    is_public: isPublic,
    location,
    owner,
    start_time,
    title,
    topic
  } = session
  const [startTime] = start_time.split(' ')
  const [endTime] = end_time.split(' ')

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent)
    setShowPopover(true)
  }

  const onClick = (url: string) => {
    window.open(url, '_blank')
    setShowPopover(false)
  }

  const onEdit = (action: string) => {
    console.log(action)
    setShowPopover(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="back" color="primary" defaultHref="/home" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={presentPopover} color="dark">
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonText color="dark">
            <h1>{title}</h1>
          </IonText>
          <IonChip outline={false} color="light">
            <IonAvatar>
              <img src={owner.avatar} alt={owner.name} />
            </IonAvatar>
            <IonText color="primary">
              <span key={owner.id}>{owner.name}</span>
            </IonText>
          </IonChip>

          <div className="ion-padding-vertical">
            <IonChip color="dark">
              <IonIcon size="small" icon={isPublic ? lockOpenOutline : lockClosedOutline} />
              <IonLabel color="medium">{isPublic ? 'Public' : 'Private'}</IonLabel>
            </IonChip>
            <IonChip color="dark">
              <IonIcon size="small" icon={timeOutline} />
              <IonLabel color="medium">{convertTimeDiff(startTime, endTime)}</IonLabel>
            </IonChip>
          </div>

          <p>{topic}</p>
          <IonText color="medium">
            {start_time} &ndash; {end_time}
            <br />
            {location}
          </IonText>
        </div>
        <IonList className="ion-margin-vertical">
          <IonListHeader lines="full">
            <IonToolbar className="ion-text-uppercase">
              Attendees
              <IonButtons slot="end">
                <IonButton onClick={() => setShowAttendees(!showAttendees)} color="dark">
                  <IonIcon
                    slot="icon-only"
                    icon={showAttendees ? chevronUp : chevronDown}
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonListHeader>
          {showAttendees &&
            attendees.map(({ id, avatar, name, github_nickname: nickname }) => (
              <IonItem
                key={id}
                href={nickname ? `https://www.github.com/${nickname}` : undefined}
                target="_blank"
              >
                <IonAvatar slot="start">
                  <img alt={name} src={avatar} />
                </IonAvatar>
                <IonLabel color="primary">{name}</IonLabel>
              </IonItem>
            ))}
        </IonList>

        <IonList>
          <IonListHeader className="ion-text-uppercase">
            Comments ({comments.length ?? 0})
          </IonListHeader>
          <IonItem lines="full">
            <IonTextarea
              required
              rows={6}
              cols={20}
              placeholder="Leave a comment..."
              value={comment}
              onIonChange={(e) => setComment(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <IonButton expand="full" color="primary" onClick={() => createMutate({ comment, id })}>
            <IonIcon slot="start" icon={chatbubbleEllipsesOutline}></IonIcon>
            Post Comment
          </IonButton>
        </IonList>

        {comments.map(({ id: commentId, content, time_stamp: timeStamp, user }) => (
          <IonList className="ion-margin-vertical" key={commentId}>
            <IonItem className="ion-align-items-start">
              <IonThumbnail
                slot="start"
                onClick={() =>
                  window.open(`https://www.github.com/${user.github_nickname}`, '_blank')
                }
              >
                <img alt={user.name} src={user.avatar} />
              </IonThumbnail>
              <div>
                <IonText color="dark">
                  <h6>{user.name}</h6>
                  <time>{timeStamp}</time>
                </IonText>
                <p>{content}</p>
              </div>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={() => deleteMutate({ id, commentId })}
              >
                <IonIcon icon={removeCircle}></IonIcon>
              </IonButton>
            </IonItem>
          </IonList>
        ))}
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem button onClick={() => onEdit('edit')}>
            <IonLabel>Edit</IonLabel>
          </IonItem>
          <IonItem button onClick={() => onClick(`https://mobtime.vehikl.com/vgs-${id}`)}>
            <IonLabel>MobTime</IonLabel>
          </IonItem>
          <IonItem button onClick={() => onEdit('delete')}>
            <IonLabel>Delete</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  )
}

export default SessionDetail
