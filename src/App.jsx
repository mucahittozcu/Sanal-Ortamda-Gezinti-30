import { useState } from 'react'
import WelcomeMessage from './components/WelcomeMessage'
import generateMessage from './utilities/generateMessage'
import './styles.css'
export default function App() {
  const [userData, setUserData] = useState({
    hasEntered: false,
    pageLoadTime: new Date(),
    entranceTime: undefined,
    clickCoordinates: { offsetX: undefined, offsetY: undefined },
  })

  if (userData.hasEntered) {
    generateMessage(userData)
  }

  /* Challenge
  
     Bu retro VR uygulamasının bir "enter" butonuna ihtiyacı var. Buton aşağıdaki gibi ayarlanmalıdır:
     
        1. Eğer kullanıcı butona tıklarsa, userData state'inin özelliklerinin değerleri 
           aşağıdaki hale gelir: 
           
           	          Özellik		 	             Değer(ler)i				  
			            ╷--------------------╷----------------------------------╷
		  	          |  hasEntered        |	true                            |
			            |--------------------|----------------------------------|
			            |  pageLoadTime      |	önceki değeri koru              |
			            |--------------------|----------------------------------|
			            |  entranceTime      |	  yeni date nesnesi             |	
                  |--------------------|----------------------------------|
			            |  clickCoordinates  |	click olayını içeren nesne      |
                  |                    |  offsetX ve offsetY değerleri    |	
			            ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯

                        		         
        2. Bu görevleri doğru bir şekilde tamamlarsanız, bazı retro, arızalı görsel efektlere sahip bir buton elde etmeli ve konsolda doğru şekilde işlenmiş bir mesaj almalısınız
 */
const handleClick = (e) => {
  const entranceTime = new Date()// Yeni giriş zamanı //

  const newOffsetX = e.nativeEvent.offsetX
  const newOffsetY = e.nativeEvent.offsetY

  setUserData((userData) => ({
    ...userData,
    hasEntered: !userData.hasEntered,

    // ...userData.pageLoadTime, // Önceki sayfa yükleme zamanını koru //
    pageLoadTime: userData.pageLoadTime, // Önceki sayfa yükleme zamanını koru //
     entranceTime: entranceTime, // Yeni giriş zamanını ata //

     clickCoordinates:{
       offsetX: newOffsetX,
       offsetY: newOffsetY
      }
  }))

}
  return (
    <div>
      <button
        onClick={handleClick}
        disabled={userData.hasEntered}
        className={userData.hasEntered ? 'activated' : 'unactivated'}
      >
        {userData.hasEntered ? 'Bağlanıyor...' : 'Enter'}
      </button>

      <WelcomeMessage userData={userData} />
    </div>
  )
}

