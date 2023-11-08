import { googleLogout } from "@react-oauth/google";
import { useStore } from "../store/auth"

const User = ()  => {
  const { authData, setAuthData } = useStore();
  console.log(authData);
  

  return (
    <div className="container">
      { authData && (
        <>
          <h1>{ authData.user.name }</h1>
          <p>{ authData.user.email }</p>
          <img src={ authData.user.image } alt="profile" />

          <button
            onClick={() => {
              googleLogout()
              localStorage.removeItem("AuthData")
              setAuthData(null)
              window.location.reload()
            }}
            className="button"
          >Logout</button>
        </>
      )}
    </div>
  )
}

export default User;