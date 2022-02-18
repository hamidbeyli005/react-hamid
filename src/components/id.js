import { useParams } from "react-router-dom"
import UpdateUser from "./UpdateUser"

export default function Id() {
  let params = useParams()
  let id = params.id



  return (
    <div>
      <h4>Kullanici numarası: {params.id}</h4>
      <UpdateUser id={`${id}`}
      ></UpdateUser>
      
    </div>

  )
}

