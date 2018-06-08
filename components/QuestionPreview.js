import React from 'react'
import {ScrollView, TextInput, View} from 'react-native'
import {Button, Card, CheckBox, Text} from 'react-native-elements'
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button'

export default class QuestionPreview extends React.Component {
    static navigationOptions = {title: 'Preview'};
    deleteQuestion = () => {
        return fetch('https://summester-webdev.herokuapp.com/api/question/' + this.state.question.id, {
            method: 'DELETE'
        }).then(
            this.props.navigation.navigate('ExamWidget', {
                topicId: this.state.topicId,
                eid: this.state.eid,
                exam: this.state.exam
            })
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            eid: 1,
            topicId: 1,
            exam: {},
            question: {},
            options: []
        };
        this.onSelect = this.onSelect.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    onSelect(index, value) {
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId');
        const eid = navigation.getParam('eid');
        const exam = navigation.getParam('exam');
        const question = navigation.getParam('question');
        this.setState({topicId});
        this.setState({eid});
        this.setState({exam});
        this.setState({question});
        if (question.type === "mcq") {
            if (question.options !== undefined && question.options.toString().length > 0) {
                let choices = question.options;
                let options = choices.split("\n");
                this.setState({options});
            } else {
                let options = ["No Choices specified. Click on edit button to edit this question."];
                this.setState({options});
            }
        }
    }

    render() {
        return (
            <ScrollView style={{paddingVertical: 10}}>
                <View style={{paddingHorizontal: 5}}>
                    <Card style={{height: 400}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: 230}}>
                                <Text h4>{this.state.question.title}</Text>
                            </View>
                            <View style={{width: 100}}>
                                <Text h4>{this.state.question.points} &nbsp;Pts</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{paddingVertical: 2}}>
                                <Text h5>{this.state.question.subtitle}</Text>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                {
                                    this.state.question.type === "mcq" &&

                                    <RadioGroup selectedIndex={this.state.question.correctOption}
                                                onSelect={(index, value) => this.onSelect(index, value)}>
                                        {this.state.options.map((value, i) => (
                                            <RadioButton key={i} value={i}>
                                                <Text>{value}</Text>
                                            </RadioButton>
                                        ))}
                                    </RadioGroup>
                                }
                                {
                                    this.state.question.type === "fib" &&
                                    <Text h4>{this.state.question.blanks}</Text>
                                }
                                {
                                    this.state.question.type === "ess" &&
                                    <TextInput multiline={true} numberOfLines={5}
                                               placeholder={'Student will type their answer here'}/>
                                }
                                {
                                    this.state.question.type === "tf" &&
                                    <CheckBox checked={this.state.question.checkBoxValue} title="The answer is "/>
                                }

                            </View>
                        </View>
                        <View style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                            <View style={{width: 90, padding: 1}}>
                                <Button buttonStyle={{
                                    backgroundColor: "red",
                                    width: 80,
                                    height: 30,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 60,
                                }}
                                        title='Cancel'
                                        containerStyle={{marginTop: 20}}/>
                            </View>
                            <View style={{width: 90, padding: 1}}>
                                <Button buttonStyle={{
                                    backgroundColor: "green",
                                    width: 80,
                                    height: 30,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 60,
                                }}
                                        title='Submit'
                                        containerStyle={{marginTop: 20}}
                                />
                            </View>
                        </View>
                    </Card>
                    <View style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 180, padding: 1}}>
                            <Button buttonStyle={{
                                backgroundColor: "black",
                                width: 170,
                                height: 70,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                                    onPress={this.deleteQuestion}
                                    title={'Delete Exam'}
                                    icon={{
                                        name: 'delete-sweep',
                                        size: 25,
                                        color: 'white'
                                    }}
                            />
                        </View>
                        <View style={{width: 180, padding: 1}}>
                            <Button buttonStyle={{
                                backgroundColor: "rgba(92, 99,216, 1)",
                                width: 170,
                                height: 70,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                                    onPress={() => this.props.navigation.navigate('QuestionUpdate', {
                                        topicId: this.state.topicId,
                                        eid: this.state.eid,
                                        exam: this.state.exam,
                                        question: this.state.question
                                    })}
                                    title='Edit'
                                    containerStyle={{marginTop: 20}}
                                    icon={{
                                        name: 'edit',
                                        size: 25
                                    }}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

}