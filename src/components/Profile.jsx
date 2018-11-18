import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { inject, observer } from 'mobx-react'
import { Divider } from '@material-ui/core'

@inject('userStore')
@observer
class Profile extends React.Component {

  render() {
    const { currentUser } = this.props.userStore
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">
            Profile Page
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <Typography variant="subtitle1">
              Name: {currentUser.firstName} {currentUser.lastName}
            <br />
              Email: {currentUser.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" disabled={true}>Edit</Button>
        </CardActions>
      </Card>
    )
  }
}

export default Profile
