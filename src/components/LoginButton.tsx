import { IonButton } from '@ionic/react'
import { useHistory } from 'react-router'

const LoginButton: React.FC<{ name: string; color?: string | undefined }> = ({ name, color }) => {
  const history = useHistory()
  return (
    <IonButton
      type="button"
      color={color}
      onClick={() => history.push('/home', { direction: 'none' })}
    >
      {name}
    </IonButton>
  )
}

export default LoginButton
