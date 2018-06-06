import React from 'react'
import {Alert, ScrollView} from 'react-native'
import {Button, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

export default class AssignmentWidget
    extends React.Component {
    static navigationOptions = {title: 'Assignment Editor: Create Assignment', headerTitleStyle: {fontSize: 16}};
    updateTitle = (newState) => (
        this.setState(newState)
    );
    updateDescription = (newState) => (
        this.setState(newState)
    );
    createAssignment = () => {
        const topicId = this.state.topicId;
        const assignment = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points
        };
        return fetch('https://summester-webdev.herokuapp.com/api/topic/' + topicId + '/assignment', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                points: this.state.points
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then(() => {
            Alert.alert("Changes Saved!");
            this.props.navigation.navigate('AssignmentList', {topicId: this.state.topicId})
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            topicId: 1,
            title: '',
            description: '',
            points: ''
        };
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
    }
    componentDidMount(){
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({topicId});
    }
    componentWillReceiveProps(newProps) {
        this.setState({topicId: newProps.topicId});
    }

    render() {
        return (
            <ScrollView styles={{paddingHorizontal: 10}}>

                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={title => this.setState({title: title})}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <Text>{this.state.title}</Text>

                <FormLabel>Description</FormLabel>
                <FormInput multiline={true} numberOfLines={2}
                           onChangeText={descr => this.setState({description: descr})}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={points => this.setState({points: points})}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button
                    onPress={this.createAssignment}
                    buttonStyle={{
                        backgroundColor: "green",
                        width: 350,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }}
                    icon={{
                        name: 'save',
                        size: 25,
                        color: 'white'
                    }}
                    buttonTitleStyle={{
                        size: 25
                    }}
                    title='Save'
                />
            </ScrollView>
        )
    }
}