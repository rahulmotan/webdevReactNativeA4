import React from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-elements'

export default class ExamEditor
    extends React.Component {
    static navigationOptions = {title:'Exam Editor: Create Exam'};
    constructor(props) {
        super(props);
        this.state = {
            exams: {},
            topicId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = this.props.navigation.getParam('topicId');
        this.setState({topicId});
    }

    render() {
        return (
            <View style={{padding: 15}}>
                <Text>Create Exam for topic id: {this.state.topicId}</Text>
            </View>
        )
    }
}