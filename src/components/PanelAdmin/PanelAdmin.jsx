import { useContext, useState, useEffect } from "react"
import { Context } from "../../utils/ContextProviders"
import NewProducts from "../NewProducts/NewProducts"
import './PanelAdmin.css'


const PanelAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const { decodeToken, jwt } = useContext(Context);

    useEffect(() => {
      if(jwt){
        const token = decodeToken(jwt)
        console.log(token)
        if( token.user.rol === 'user' ){

          setIsAdmin(true)
        }
      } 

    },[jwt, decodeToken])

  return (
    <div className="admin">
      {
        isAdmin && (
          <div>
            <NewProducts/>
          </div>
        )
      }
    </div>
  )
}

export default PanelAdmin
