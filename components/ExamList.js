import React from 'react'
import {View} from 'react-native'
import {Button, Divider, Text} from 'react-native-elements'

export default class ExamList
    extends React.Component {
    static navigationOptions = {title: 'Exams'};

    constructor(props) {
        super(props);
        this.state = {
            exams: [],
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
            <View style={{paddingTop:5}}>
                <View style={{paddingLeft: 8, paddingVertical: 10}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 350,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }}
                            onPress={() => this.props.navigation.navigate('ExamEditor', {topicId: this.state.topicId})}
                            title='Create Exam'
                            containerStyle={{marginTop: 20}}/>
                </View>
                <View style={{paddingHorizontal: 8, paddingVertical: 10}}>
                    <Divider style={{backgroundColor: 'grey'}} containerStyle={{marginTop: 5}}/>
                    <Text h4>Exam List Will Appear Here.
                        {this.state.topicId}</Text>
                </View>
            </View>
        )
    }
}