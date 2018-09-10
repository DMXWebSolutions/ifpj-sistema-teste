
import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'


const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

const MyUserOptions = (props) => (
  <Dropdown trigger={props.trigger} options={options} pointing='top left' icon={null} />
)

export default MyUserOptions