import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, showPassword} = props
  const {website, id, userName, password} = passwordDetails
  const profileName = website[0].toUpperCase()
  const hidePassword = (
    <img
      className="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )
  const passwordText = showPassword ? password : hidePassword
  const onDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="website-profile">
        <p className="profile-name">{profileName}</p>
      </div>
      <div className="details-container">
        <p className="website">{website}</p>
        <p className="username">{userName}</p>
        <p className="password">{passwordText}</p>
      </div>
      <button className="button" type="button" onClick={onDelete}>
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
