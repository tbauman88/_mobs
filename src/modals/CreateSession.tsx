import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { useCallback, useState } from 'react'
import { Session } from '../api'

const CreateSession: React.FC<{
  date: string
  onDismiss: () => void
  onSubmit: (data: any) => Session
}> = ({ date, onDismiss, onSubmit }) => {
  const now = DateTime.now().toISO()
  const [title, setTitle] = useState<string>()
  const [topic, setTopic] = useState<string>()
  const [limit, setLimit] = useState<number>(4)
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [isUnlimited, setIsUnlimited] = useState<boolean>(false)
  const [location, setLocation] = useState<string>()

  const [startTime, setStartTime] = useState<string>(
    DateTime.fromISO(now).startOf('day').set({ hour: 15, minute: 30 }).toISO()
  )
  const [endTime, setEndTime] = useState<string>(
    DateTime.fromISO(now).startOf('day').set({ hour: 17 }).toISO()
  )

  const handleTime = useCallback((key, value) => {
    const method = key === 'start' ? setStartTime : setEndTime
    method(value)
  }, [])

  const isInvalid = !title || !topic || !location

  const handleSubmit = () => {
    onSubmit({
      attendee_limit: isUnlimited ? null : limit,
      date: startTime,
      end_time: DateTime.fromISO(endTime).toFormat('t'),
      is_public: isPublic,
      location,
      start_time: DateTime.fromISO(startTime).toFormat('t'),
      title,
      topic
    })
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="small">
            <IonText color="dark">Add Growth Session</IonText>
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss()}>
              <IonIcon size="small" icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList className="ion-margin-top">
          <IonListHeader lines="full">
            <IonLabel>Session Details</IonLabel>
          </IonListHeader>
          <IonItem lines="full">
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              required
              autofocus
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="stacked">Topic</IonLabel>
            <IonTextarea
              required
              rows={6}
              cols={20}
              placeholder="Enter topic here..."
              value={topic}
              onIonChange={(e) => setTopic(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonList>

        <IonList className="ion-margin-top">
          <IonListHeader lines="full">
            <IonLabel>Date/Time</IonLabel>
          </IonListHeader>
          <IonItem lines="full">
            <IonLabel>Date</IonLabel>
            <IonDatetime mode="ios" slot="end" value={date} placeholder="Select Date"></IonDatetime>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Start Time</IonLabel>
            <IonDatetime
              mode="ios"
              slot="end"
              display-format="h:mm A"
              picker-format="h:mm A"
              value={startTime}
              onIonChange={(e) => handleTime('start', e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>End Time</IonLabel>
            <IonDatetime
              mode="ios"
              slot="end"
              display-format="h:mm A"
              picker-format="h:mm A"
              value={endTime}
              onIonChange={(e) => handleTime('end', e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </IonList>

        <IonList className="ion-margin-top">
          <IonListHeader lines="full">
            <IonLabel>Meta</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Location</IonLabel>
            <IonSelect
              interface="action-sheet"
              placeholder="Select One"
              onIonChange={(e) => setLocation(e.detail.value)}
              value={location}
              mode="ios"
            >
              <IonSelectOption value="slack">Slack</IonSelectOption>
              <IonSelectOption value="discord">Discord</IonSelectOption>
              <IonSelectOption value="zoom">Zoom</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel slot="start">Limit</IonLabel>
            <IonInput
              className="ion-text-end"
              slot="end"
              type="number"
              value={limit}
              min="0"
              placeholder="Enter Number"
              onIonChange={(e) => setLimit(parseInt(e.detail.value!, 10))}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              mode="ios"
              checked={isPublic}
              onIonChange={(e) => setIsPublic(e.detail.checked)}
            />
            <IonLabel>Is Public</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              mode="ios"
              checked={isUnlimited}
              onIonChange={(e) => setIsUnlimited(e.detail.checked)}
            />
            <IonLabel>No Limit</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter>
        <IonButton
          type="submit"
          disabled={isInvalid}
          onClick={handleSubmit}
          expand="full"
          color="primary"
        >
          Create
        </IonButton>
      </IonFooter>
    </>
  )
}

export default CreateSession
