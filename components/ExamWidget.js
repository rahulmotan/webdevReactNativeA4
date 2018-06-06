import React from 'react'
import {Alert, Picker, ScrollView, TextInput, View} from 'react-native'
import {Button, Card, FormLabel, Text} from 'react-native-elements'

export default class ExamWidget
    extends React.Component {
    static navigationOptions = {title: 'Create Exam'};
    updatePickerValue = (pickerValue) => (
        this.setState({pickerValue})
    );
    addQuestion = () => {
        const value = this.state.pickerValue;
        const eid = this.state.eid;
        Alert.alert('pv: ' + value + ' eid: ' + eid);
        switch (value) {
            case "0": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId});
            }
            case "1": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId});
                break;
            }
            case "2": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId});
                break;
            }
            case "3": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId});
                break;
            }
            default:
                Alert.alert('Invalid Choice of Question Type. ' +
                    'Please restart application.');
        }

        return fetch('https://summester-webdev.herokuapp.com/api/exam/' + eid + '/mcq');
    };
    updateExam = () => {
        return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/update', {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    Alert.alert('Updated!');
                    return response.json();
                }
            }).then(exam => (
                this.setState({exam})
            ))
    };

    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            exam: {},
            topicId: 1,
            questions: [],
            name: '',
            description: '',
            points: '',
            eid: 1,
            pickerValue: '0'
        };
        this.updatePickerValue = this.updatePickerValue.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.updateExam = this.updateExam.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = this.props.navigation.getParam('topicId');
        const eid = this.props.navigation.getParam('eid');
        const exam = this.props.navigation.getParam('exam');
        this.setState({eid});
        this.setState({topicId});
        this.setState({exam});
    }

    render() {

        return (
            <ScrollView style={{paddingTop: 5, paddingBottom: 50}}>
                <Card title={'Exam Editor'}>
                    <View style={{padding: 10}}>
                        <FormLabel>Exam Name:</FormLabel>
                        <TextInput onChangeText={(name) => this.setState({name})} value={this.state.name}
                                   placeholder={this.state.exam.name}/>
                    </View>
                    <View style={{padding: 10}}>
                        <FormLabel>Exam Description:</FormLabel>
                        <TextInput onChangeText={(description) => this.setState({description})}
                                   value={this.state.description}
                                   placeholder={this.state.exam.description}/>
                    </View>
                    <View style={{padding: 10}}>
                        <FormLabel>Exam Points:</FormLabel>
                        <TextInput onChangeText={(points) => this.setState({points})}
                                   value={this.state.points}
                                   placeholder={this.state.exam.points}/>
                    </View>
                    <View style={{padding: 10}}>
                        <Button buttonStyle={{
                            backgroundColor: "black",
                            width: 280,
                            height: 60,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                                onPress={this.updateExam}
                                title={'Update exam name'}
                                icon={{
                                    name: 'satellite',
                                    size: 25,
                                    color: 'white'
                                }}
                        />
                    </View>
                    <View style={{padding: 10}}>
                        <Picker selectedValue={this.state.pickerValue} onValueChange={this.updatePickerValue}>
                            <Picker.Item label="Multiple Choice" value="0"/>
                            <Picker.Item label="Fill in the Blanks" value="1"/>
                            <Picker.Item label="Essay" value="2"/>
                            <Picker.Item label="True or False" value="3"/>
                        </Picker>
                    </View>
                    <View style={{padding: 10, justifyContent: 'center'}}>
                        <Button buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 280,
                            height: 60,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                                onPress={this.addQuestion}
                                title={'Add'}
                                icon={{
                                    name: 'add',
                                    size: 25,
                                    color: 'white'
                                }}
                        />
                        <Text h4>{this.state.pickerValue}</Text>
                    </View>
                </Card>
                <Card>

                </Card>
            </ScrollView>
        )
    }
}