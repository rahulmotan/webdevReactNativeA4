import React from 'react'
import {Alert, Picker, ScrollView, TextInput, View} from 'react-native'
import {Button, Card, CheckBox, FormLabel, FormValidationMessage} from 'react-native-elements'

export default class QuestionUpdate extends React.Component {
    static navigationOptions = {title: 'Update Question'};
    updatePickerValue = (correctOption) => (
        this.setState({correctOption})
    );
    updateQuestion = () => {
        const type = this.state.question.type;
        switch (type) {
            case "mcq": {
                return fetch('https://summester-webdev.herokuapp.com/api/question/' + this.state.question.id + '/mcq', {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.subtitle,
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
                        Alert.alert("Question Updated");
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }

            case "fib": {
                return fetch('https://summester-webdev.herokuapp.com/api/question/' + this.state.question.id + '/fib', {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.subtitle,
                        points: this.state.points,
                        blanks: this.state.blanks,
                        type: "fib"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Updated");
                        return response.json();
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }

            case "ess": {
                return fetch('https://summester-webdev.herokuapp.com/api/question/' + this.state.question.id + '/ess', {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.subtitle,
                        points: this.state.points,
                        type: "ess"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Updated");
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }

            case "tf": {
                return fetch('https://summester-webdev.herokuapp.com/api/question/' + this.state.question.id + '/tf', {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: this.state.title,
                        subtitle: this.state.subtitle,
                        points: this.state.points,
                        checkBoxValue: this.state.isTrue,
                        type: "tf"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        Alert.alert("Question Updated");
                    }
                }).then(this.props.navigation.navigate('ExamWidget', {
                    eid: this.state.eid,
                    topicId: this.state.topicId,
                    exam: this.state.exam
                }))
            }
            default:
                Alert.alert('System Error', 'Invalid Choice. Please restart application.');
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            eid: 1,
            topicId: 1,
            question: {},
            exam: {},
            title: '',
            subtitle: '',
            points: '',
            choices: 'Enter Choices',
            blanks: '',
            isTrue: true,
            correctOption: ''
        };
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const eid = navigation.getParam('eid');
        const topicId = navigation.getParam('topicId');
        const exam = navigation.getParam('exam');
        const question = navigation.getParam('question');
        this.setState({eid, topicId, exam, question});
        this.setState({isTrue: question.checkBoxValue});
        if (question.options !== undefined) {
            this.setState({choices: question.options});
        }
        this.setState({title: question.title});
        this.setState({subtitle: question.subtitle});
        this.setState({blanks: question.blanks});
        this.setState({points: question.points});
        this.setState({correctOption: question.correctOption});
    }

    render() {
        let choices = this.state.choices.toString();
        let options = choices.split('\n');
        const pickerValues = options.map((option, i) => {
            return (
                <Picker.Item key={i} label={option} value={i}/>
            )
        });
        return (
            <ScrollView style={{paddingTop: 5, paddingBottom: 50}}>

                <View style={{padding: 10}}>
                    {this.state.question.type === "mcq" &&
                    <Card title={'Multiple Choice Question'}>
                        <View style={{padding: 10}}>
                            <FormLabel>Title</FormLabel>
                            <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                       placeholder={this.state.question.title}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Description</FormLabel>
                            <TextInput multiline={true} numberOfLines={4}
                                       onChangeText={(subtitle) => this.setState({subtitle})}
                                       value={this.state.subtitle}
                                       placeholder={this.state.question.subtitle}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Points</FormLabel>
                            <TextInput onChangeText={(points) => this.setState({points})}
                                       value={String(this.state.points)}
                                       placeholder={String(this.state.question.points)}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Choices</FormLabel>
                            <TextInput multiline={true} numberOfLines={8}
                                       onChangeText={(choices) => this.setState({choices})}
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

                    {this.state.question.type === "fib" &&
                    <Card title={'Fill in the Blanks Question'}>
                        <View style={{padding: 10}}>
                            <FormLabel>Title</FormLabel>
                            <TextInput onChangeText={(title) => this.setState({title})}
                                       value={this.state.title}
                                       placeholder={this.state.question.title}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Description</FormLabel>
                            <TextInput multiline={true} numberOfLines={4}
                                       onChangeText={(subtitle) => this.setState({subtitle})}
                                       value={this.state.subtitle}
                                       placeholder={this.state.question.subtitle}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Points</FormLabel>
                            <TextInput onChangeText={(points) => this.setState({points})}
                                       value={String(this.state.points)}
                                       placeholder={String(this.state.question.points)}/>
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

                    {this.state.question.type === "ess" &&
                    <Card title={'Essay Question'}>
                        <View style={{padding: 10}}>
                            <FormLabel>Title</FormLabel>
                            <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                       placeholder={this.state.question.title}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Description</FormLabel>
                            <TextInput multiline={true} numberOfLines={4}
                                       onChangeText={(subtitle) => this.setState({subtitle})}
                                       value={this.state.subtitle}
                                       placeholder={this.state.question.subtitle}/>
                        </View>
                        <View style={{padding: 10}}>
                            <FormLabel>Points</FormLabel>
                            <TextInput onChangeText={(points) => this.setState({points})}
                                       value={String(this.state.points)}
                                       placeholder={String(this.state.question.points)}/>
                        </View>
                    </Card>
                    }
                    {
                        this.state.question.type === "tf" &&
                        <Card title={'True or False Question'}>
                            <View style={{padding: 10}}>
                                <FormLabel>Title</FormLabel>
                                <TextInput onChangeText={(title) => this.setState({title})} value={this.state.title}
                                           placeholder={this.state.question.title}/>
                            </View>
                            <View style={{padding: 10}}>
                                <FormLabel>Description</FormLabel>
                                <TextInput multiline={true} numberOfLines={4}
                                           onChangeText={(subtitle) => this.setState({subtitle})}
                                           value={this.state.subtitle}
                                           placeholder={this.state.question.subtitle}/>
                            </View>
                            <View style={{padding: 10}}>
                                <FormLabel>Points</FormLabel>
                                <TextInput onChangeText={(points) => this.setState({points})}
                                           value={String(this.state.points)}
                                           placeholder={String(this.state.question.points)}/>
                            </View>
                            <View>
                                <CheckBox onPress={() => this.setState({isTrue: !this.state.isTrue})}
                                          checked={this.state.isTrue} title="The answer is "/>
                                <FormValidationMessage>Note: Check for true. </FormValidationMessage>
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
                                onPress={this.updateQuestion}
                                title={'Update'}
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