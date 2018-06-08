import React from 'react'
import {Alert, ScrollView, View} from 'react-native'
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements'

export default class AssignmentUpdate extends React.Component {
    static navigationOptions = {title: 'Update'};
    updateAssignment = () => {
        return fetch('https://summester-webdev.herokuapp.com/api/assignment/' + this.state.aid + '/update', {
            method: 'PUT',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                points: this.state.points
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                Alert.alert('Notice', 'Updated!');
            }
        }).then(
            this.props.navigation.navigate('AssignmentList', {topicId: this.state.topicId})
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            aid: 1,
            topicId: 1,
            title: '',
            description: '',
            points: '',
            assignment: {}
        };
        this.updateAssignment = this.updateAssignment.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId');
        const aid = navigation.getParam('aid');
        const assignment = navigation.getParam('assignment');
        this.setState({aid, topicId, assignment});
        this.setState({title: assignment.title});
        this.setState({description: assignment.description});
        this.setState({points: assignment.points});
    }

    render() {
        return (
            <ScrollView styles={{paddingHorizontal: 10}}>

                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={title => this.setState({title: title})} value={this.state.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput multiline={true} numberOfLines={2} value={this.state.description}
                           onChangeText={descr => this.setState({description: descr})}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={points => this.setState({points: points})} value={String(this.state.points)}/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>
                <View style={{paddingVertical:10, flex: 1, flexDirection: 'row'}}>
                    <View style={{width:60}}>
                    </View>
                    <View style={{width:250}}>
                        <Button
                            onPress={this.updateAssignment}
                            buttonStyle={{
                                backgroundColor: "black",
                                width: 250,
                                height: 70,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                            icon={{
                                name: 'update',
                                size: 25,
                                color: 'white'
                            }}
                            title='Update'
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}