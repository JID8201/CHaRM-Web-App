import React from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Profile extends React.Component {
    
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="headline" component="h2">
                    Profile Page
                    </Typography>
                    <Typography component="p">
                        Name: Olivia Powell
                        <br />
                        Email: opowell6@gatech.edu
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                </CardActions>
            </Card>
        )
    }
}

export default Profile;