import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonModal
} from '@ionic/react'
import axios from 'axios'
import { Fragment, useCallback, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import Card from '../components/Card/Card'
import './Tab1.scss'
import { DateTime } from 'luxon'
import { addOutline, calendarNumber, calendarSharp, closeOutline } from 'ionicons/icons'
import isEmpty from 'lodash/isEmpty'
import api from '../api'
import { Session } from 'inspector'

const Body: React.FC<{ date: string; onDismiss: () => void }> = ({ date, onDismiss }) => {
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

  // const mutation = useMutation(
  //   async (data) => await axios.post('https://growth.vehikl.com/growth_sessions', data)
  // )

  const isInvalid = !title || !topic || !location

  const handleSubmit = () => {
    const data = {
      attendee_limit: isUnlimited ? null : limit,
      date: startTime,
      end_time: DateTime.fromISO(endTime).toFormat('t'),
      is_public: isPublic,
      location,
      start_time: DateTime.fromISO(startTime).toFormat('t'),
      title,
      topic
    }

    console.log(data)
    // mutation.mutate(data)
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
            <IonDatetime slot="end" value={date} placeholder="Select Date"></IonDatetime>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Start Time</IonLabel>
            <IonDatetime
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

const Tab1: React.FC = () => {
  const [view, setView] = useState<string | undefined>('day')
  // const [date] = useState(DateTime.fromISO(DateTime.now().toISODate()))
  const [date] = useState(DateTime.now().minus({ days: 2 }).toISODate())

  const { data, isError, isLoading } = useQuery('week', () =>
    axios.get('https://growth.vehikl.com/growth_sessions/week', {
      params: { date }
    })
  )

  // const handleDismiss = () => {
  //   dismiss()
  // }

  const [present, dismiss] = useIonModal(Body, { date, onDismiss: () => { dismiss( )} })

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error</span>

  const sessions = Object.keys(data?.data).map((key) => [...data?.data[key]])

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
        <IonSegment
          className="ion-margin-top"
          mode="md"
          onIonChange={(e) => setView(e.detail.value)}
          value={view}
        >
          <IonSegmentButton value="day">
            <IonIcon icon={calendarNumber} />
            <IonLabel>Day</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="week">
            <IonIcon icon={calendarSharp} />
            <IonLabel>Week</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {view === 'day' &&
          sessions.map((day) =>
            day.map(
              (session) => session.date === date && <Card key={session.id} {...{ session, view }} />
            )
          )}
        {view === 'week' && (
          <IonGrid>
            <IonRow>
              {sessions.map((day, index) => (
                <IonCol className="ion-no-padding" key={index}>
                  {day.map((session, index) => (
                    <Fragment key={session.id}>
                      {index === 0 && (
                        <IonText className="ion-text-center" color="dark">
                          <h5>{DateTime.fromISO(session.date).toFormat('EEEE')}</h5>
                        </IonText>
                      )}
                      <Card {...{ session, view }} />
                    </Fragment>
                  ))}
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
        <IonFab edge vertical="top" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => {
              present({ cssClass: 'my-class' })
            }}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
