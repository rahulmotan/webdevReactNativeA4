import React from 'react'
import {Alert, Picker, ScrollView, TextInput, View} from 'react-native'
import {Button, Card, FormLabel, ListItem} from 'react-native-elements'

export default class ExamWidget
    extends React.Component {
    static navigationOptions = {title: 'Create Exam'};
    updatePickerValue = (pickerValue) => (
        this.setState({pickerValue})
    );
    addQuestion = () => {
        const value = this.state.pickerValue;
        const eid = this.state.eid;

        switch (value) {
            case "0": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId, exam: this.state.exam});
            }
            case "1": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId, exam: this.state.exam});
                break;
            }
            case "2": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId, exam: this.state.exam});
                break;
            }
            case "3": {
                this.props.navigation.navigate('QuestionWidget',
                    {value: value, eid: eid, topicId: this.state.topicId, exam: this.state.exam});
                break;
            }
            default:
                Alert.alert('System Error', 'Invalid Choice of Question Type. ' +
                    'Please restart application.');
        }
    };

    deleteExam = () => {
        return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/delete', {
            method: 'DELETE'
        }).then(
            this.props.navigation.navigate('ExamList', {topicId: this.state.topicId})
        )
    };

    updateExam = () => {
        return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/update', {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
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
    findAllQuestionsForTopic = (examId) => {
        return fetch('https://summester-webdev.herokuapp.com/api/exam/' + examId + '/baseExamQuestions')
            .then(response => (response.json()))
            .then(questions => (this.setState({questions})))
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
            pickerValue: '0',
            questionTypes: ['View All',
                'Multiple \nChoice',
                'Fill in the \nblanks',
                'Essay',
                'True or\nfalse'],
            selectedQuestionTypeIndex: 0
        };
        this.updatePickerValue = this.updatePickerValue.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.updateExam = this.updateExam.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
        this.findAllQuestionsForTopic = this.findAllQuestionsForTopic.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = this.props.navigation.getParam('topicId');
        const eid = this.props.navigation.getParam('eid');
        const exam = this.props.navigation.getParam('exam');
        this.setState({eid});
        this.setState({topicId});
        this.setState({exam});
        this.setState({name: exam.name});
        this.setState({points: exam.points});
        this.setState({description: exam.description});
        this.findAllQuestionsForTopic(eid);
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const topicId = this.props.navigation.getParam('topicId');
        const eid = this.props.navigation.getParam('eid');
        const exam = this.props.navigation.getParam('exam');
        this.setState({eid});
        this.setState({topicId});
        this.setState({exam});
        this.setState({name: exam.name});
        this.setState({points: exam.points});
        this.setState({description: exam.description});
        this.findAllQuestionsForTopic(eid);
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
                    <View style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 160, padding: 1}}>
                            <Button buttonStyle={{
                                backgroundColor: "black",
                                width: 140,
                                height: 60,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                                    onPress={this.updateExam}
                                    title={'Update Exam'}
                                    icon={{
                                        name: 'satellite',
                                        size: 25,
                                        color: 'white'
                                    }}
                            />
                        </View>
                        <View style={{width: 150, padding: 1}}>
                            <Button buttonStyle={{
                                backgroundColor: "black",
                                width: 140,
                                height: 60,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                                    onPress={this.deleteExam}
                                    title={'Delete Exam'}
                                    icon={{
                                        name: 'delete-sweep',
                                        size: 25,
                                        color: 'white'
                                    }}
                            />
                        </View>
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
                    </View>
                </Card>

                <Card title={'Questions'}>
                    {this.state.questions.map((question, i) => (
                        <ListItem key={i} title={question.title} subtitle={'click to edit/preview'}
                                  onPress={() => this.props.navigation.navigate('QuestionPreview', {
                                      question: question,
                                      eid: this.state.eid,
                                      topicId: this.state.topicId,
                                      exam: this.state.exam
                                  })}/>
                    ))}
                </Card>
                <View style={{padding: 10}}>
                </View>
            </ScrollView>
        )
    }
}