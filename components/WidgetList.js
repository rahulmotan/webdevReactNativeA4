import React, {Component} from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        this.state = {
            topicId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({topicId});
    }

    render() {
        return (
            <View>
                <View style={{paddingHorizontal:5, paddingTop:10}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 350,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }} title="Assignments"
                            onPress={() => this.props.navigation
                                .navigate('AssignmentList', {topicId: this.state.topicId})}
                            containerStyle={{marginVertical: 20, marginHorizontal:20}}/>
                </View>
                <View style={{paddingLeft: 5, paddingRight: 5, paddingVertical:5}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 350,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }} title="Exams"
                            onPress={() => this.props.navigation
                                .navigate('ExamList', {topicId: this.state.topicId})}
                            containerStyle={{marginVertical: 20}}/>
                </View>
            </View>
        )
    }
}

export default WidgetList