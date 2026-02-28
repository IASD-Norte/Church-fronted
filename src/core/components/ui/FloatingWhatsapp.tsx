import { FloatingWhatsApp } from 'react-floating-whatsapp'


export default function FloatingWhatsapp() {

  const avatar = '/logo.jpg'

  return (
    <FloatingWhatsApp
      phoneNumber="+573046417789"
      accountName="Iglesia Aventista Norte de Bucaramanga"
      avatar={avatar}
      chatMessage="Hola 👋 ¿En qué te podemos ayudar?"
      statusMessage="Normalmente responde en minutos"
      placeholder="Escribe tu mensaje..."
      allowClickAway
      notification
      notificationSound
    />
  )
}
