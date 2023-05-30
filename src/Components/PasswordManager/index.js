import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    userName: '',
    password: '',
    count: 0,
    searchInput: '',
    isActivePassword: false,
    showPassword: false,
  }

  clickOnCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      userName,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      userName: '',
      password: '',
      isActivePassword: true,
      count: prevState.count + 1,
    }))
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredList})
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passwordsList, count, searchInput, showPassword} = this.state
    let {isActivePassword} = this.state
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchResults.length === 0) {
      isActivePassword = false
    } else {
      isActivePassword = true
    }
    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="input-image-container">
          <div className="input-list-container">
            <h1 className="heading">Add New Password</h1>
            <form
              className="input-form-container"
              onSubmit={this.onAddPassword}
            >
              <div className="input-container">
                <div className="logo-container">
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <div className="logo-container">
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="input-container">
                <div className="logo-container">
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="add-button" type="submit" data-testid="delete">
                Add
              </button>
            </form>
          </div>
          <img
            className="image1"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="password-details-container">
          <div className="count-input-container">
            <div className="password-count-container">
              <h1 className="count-label">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search-logo-input-container">
              <div className="search-logo-container">
                <img
                  className="search-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onClick={this.clickOnCheckbox}
            />
            <label htmlFor="checkbox" className="label">
              Show Passwords
            </label>
          </div>
          {isActivePassword && (
            <ul className="password-item-list-container">
              {searchResults.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={this.deletePassword}
                  showPassword={showPassword}
                />
              ))}
            </ul>
          )}
          {!isActivePassword && (
            <div className="image2-container">
              <img
                className="image2"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
