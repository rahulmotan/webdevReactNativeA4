import React from 'react'
import {Alert, Picker, ScrollView, TextInput, View} from 'react-native'
import {Button, Card, CheckBox, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements'

export default class QuestionWidget extends React.Component {
    static navigationOptions = {title: "Edit Question"};
    saveQuestion = () => {
        const value = this.state.value;
        switch (value) {
            case '0': {
                return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/mcq', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.description,
                        points: this.state.points,
                        options: this.state.choices,
                        correctOption: this.state.correctOption,
                        type: "mcq"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Added");
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }

            case '1': {
                return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/fib', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.description,
                        points: this.state.points,
                        blanks: this.state.blanks,
                        type: "fib"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Added");
                        return response.json();
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }

            case '2': {
                return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/ess', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.description,
                        points: this.state.points,
                        type: "ess"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Added");
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }

            case '3': {
                return fetch('https://summester-webdev.herokuapp.com/api/exam/' + this.state.eid + '/tf', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.description,
                        points: this.state.points,
                        isTrue: this.state.isTrue.toString(),
                        type: "tf"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Added");
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }
            default:
                Alert.alert('Invalid Choice. Please restart');

        }
    };
    updatePickerValue = (correctOption) => (
        this.setState({correctOption})
    );
    updateChoices = (choices) => {
        this.setState({choices: choices});
    };

    constructor(props) {
        super(props);
        this.state = {
            exam: {},
            value: '0',
            eid: 1,
            topicId: 1,
            title: '',
            description: '',
            points: '',
            choices: 'Enter Choices',
            options: [],
            correctOption: '',
            blanks: '',
            isTrue: true,
            question: {}
        };
        this.saveQuestion = this.saveQuestion.bind(this);
        this.updatePickerValue = this.updatePickerValue.bind(this);
        this.updateChoices = this.updateChoices.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const eid = navigation.getParam('eid');
        const topicId = navigation.getParam('topicId');
        const value = navigation.getParam('value');
        const exam = navigation.getParam('exam');
        this.setState({eid});
        this.setState({topicId});
        this.setState({value});
        this.setState({exam});
    }

    render() {
        //const widgetType = ["Multiple Choice Question", "Fill In The Blanks", "Essay", "True or False"];
        let choices = this.state.choices.toString();
        let options = choices.split('\n');
        const pickerValues = options.map((option, i) => {
            return (
                <Picker.Item key={i} label={option} value={i}/>
            )
        })

        return (
            <ScrollView style={{paddingTop: 5, paddingBottom: 50}}>

                <View style={{padding: 10}}>
                    {this.state.value == '0' &&
                    <Card title={'Multiple Choice Question'}>
                        <View style={{padding: 10}}>
                            <FormLabel>Title</FormLabel>
                            <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                       placeholder={this.state.question.name}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Description</FormLabel>
                            <FormInput multiline={true} numberOfLines={4}
                                       onChangeText={(description) => this.setState({description})}
                                       value={this.state.description}
                                       placeholder={this.state.question.description}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Points</FormLabel>
                            <TextInput onChangeText={(points) => this.setState({points})} value={this.state.points}
                                       placeholder={this.state.question.points}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Choices</FormLabel>
                            <FormInput multiline={true} numberOfLines={8}
                                       onChangeText={(choices) => this.updateChoices(choices)}
                                       value={this.state.choices}
                                       placeholder={this.state.question.choices}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Correct Option</FormLabel>
                            <Picker selectedValue={this.state.correctOption}
                                    onValueChange={this.updatePickerValue}>
                                {pickerValues}
                            </Picker>
                        </View>
                    </Card>}

                    {this.state.value == '1' &&
                    <Card title={'Fill in the Blanks Question'}>
                        <View style={{padding: 10}}>
                            <FormLabel>Title</FormLabel>
                            <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                       placeholder={this.state.question.name}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Description</FormLabel>
                            <TextInput multiline={true} numberOfLines={4}
                                       onChangeText={(description) => this.setState({description})}
                                       value={this.state.description}
                                       placeholder={this.state.question.description}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Points</FormLabel>
                            <TextInput onChangeText={(points) => this.setState({points})} value={this.state.points}
                                       placeholder={this.state.question.points}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Variables</FormLabel>
                            <FormValidationMessage>Format:- 2 + 2 = [four=4]</FormValidationMessage>
                            <TextInput multiline={true} numberOfLines={8}
                                       onChangeText={(blanks) => this.setState({blanks})}
                                       value={this.state.blanks}
                                       placeholder={this.state.question.blanks}/>
                        </View>
                    </Card>}

                    {this.state.value == '2' &&
                    <Card title={'Essay Question'}>
                        <View style={{padding: 10}}>
                            <FormLabel>Title</FormLabel>
                            <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                       placeholder={this.state.question.name}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Description</FormLabel>
                            <TextInput multiline={true} numberOfLines={4}
                                       onChangeText={(description) => this.setState({description})}
                                       value={this.state.description}
                                       placeholder={this.state.question.description}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Points</FormLabel>
                            <TextInput onChangeText={(points) => this.setState({points})} value={this.state.points}
                                       placeholder={this.state.question.points}/>
                        </View>
                    </Card>
                    }
                    {
                        this.state.value == '3' &&
                        <Card title={'True or False Question'}>
                            <View style={{padding: 10}}>
                                <FormLabel>Title</FormLabel>
                                <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                           placeholder={this.state.question.name}/>
                            </View>
                            <View style={{padding: 10}}>
                                <FormLabel>Description</FormLabel>
                                <TextInput multiline={true} numberOfLines={4}
                                           onChangeText={(description) => this.setState({description})}
                                           value={this.state.description}
                                           placeholder={this.state.question.description}/>
                            </View>
                            <View style={{padding: 10}}>
                                <FormLabel>Points</FormLabel>
                                <TextInput onChangeText={(points) => this.setState({points})} value={this.state.points}
                                           placeholder={this.state.question.points}/>
                            </View>
                            <View>
                                <CheckBox onPress={() => this.setState({isTrue: !this.state.isTrue})}
                                          checked={this.state.isTrue} title="The answer is "/>
                                <FormValidationMessage>Note: Check for true.</FormValidationMessage>
                            </View>
                        </Card>
                    }
                    <View style={{paddingVertical: 10}}>
                        <Button buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 345,
                            height: 80,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                                onPress={this.saveQuestion}
                                title={'Add'}
                                icon={{
                                    name: 'add',
                                    size: 25,
                                    color: 'white'
                                }}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}