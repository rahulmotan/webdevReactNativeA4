import React from 'react'
import {View} from 'react-native'
import {Button, Divider, ListItem} from 'react-native-elements'

export default class AssignmentList
    extends React.Component {
    static navigationOptions = {title: 'Assignments'};
    findAllAssignmentsForTopic = (topicId) => {
        return fetch('https://summester-webdev.herokuapp.com/api/topic/' + topicId + '/assignment')
            .then(response => response.json())
            .then(agn => this.setState({assignments: agn}))
    };

    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            topicId: 1
        };
        this.findAllAssignmentsForTopic = this.findAllAssignmentsForTopic.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({topicId});
        this.findAllAssignmentsForTopic(topicId);
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({topicId});
        this.findAllAssignmentsForTopic(topicId);
    }

    render() {
        return (
            <View style={{paddingTop: 5}}>
                <View style={{paddingLeft: 8, paddingVertical: 10}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 350,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }}
                            onPress={() => this.props.navigation.navigate('AssignmentWidget', {topicId: this.state.topicId})}
                            title='Create Assignment'
                            containerStyle={{marginTop: 20}}/>
                </View>
                <View style={{paddingHorizontal: 8, paddingVertical: 10}}>
                    <Divider style={{backgroundColor: 'grey'}} containerStyle={{marginTop: 5}}/>
                    {
                        this.state.assignments.map((agn, index) => (
                            <ListItem key={index} title={agn.title}
                            />))
                    }
                </View>

            </View>
        )
    }
}