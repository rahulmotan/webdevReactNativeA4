import React from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-elements'
import AssignmentWidget from "./AssignmentWidget";


export default class AssignmentEditor
    extends React.Component {
    static navigationOptions = {title: 'Assignment Editor: Create Assignment', headerTitleStyle: {fontSize: 16}};

    constructor(props) {
        super(props);
        this.state = {
            topicId: 1,
            assignment: {}

        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId');
        this.setState({topicId});
    }

    render() {
        return (
            <View>
                <AssignmentWidget topicId={this.state.topicId} navigations/>
            </View>
        )

    }
}