import React from 'react'
import {ScrollView, View} from 'react-native'
import {Button, Card, Text} from 'react-native-elements'
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button'

export default class QuestionPreview extends React.Component {
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
            if (question.choices !== undefined && question.choices.toString().length > 0) {
                let choices = question.choices;
                let options = choices.split("\n");
                this.setState({options});
            }
            let options = ["No Choices specified. Click on edit button to edit this question."];
            this.setState({options});
        }
    }

    render() {
        return (
            <ScrollView style={{paddingVertical: 10}}>
                <View style={{paddingHorizontal: 5}}>
                    <Card style={{height: 400}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: 210}}>
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
                                {this.state.question.type === "mcq" &&

                                <RadioGroup
                                    onSelect={(index, value) => this.onSelect(index, value)}
                                >
                                    {this.state.options.map((value, i) => (
                                        <RadioButton key={i} value={i}>
                                            <Text>{value}</Text>
                                        </RadioButton>
                                    ))}

                                </RadioGroup>
                                }
                            </View>

                            <View style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                                <View style={{width: 150, padding: 1}}>
                                    <Button buttonStyle={{
                                        backgroundColor: "red",
                                        width: 140,
                                        height: 50,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 5,
                                    }}
                                            onPress={() => this.props.navigation.navigate('ExamWidget', {
                                                topicId: this.state.topicId,
                                                eid: this.state.eid,
                                                exam: this.state.exam
                                            })}
                                            title='Go Back'
                                            containerStyle={{marginTop: 20}}
                                            icon={{
                                                name: 'arrow-back',
                                                size: 25
                                            }}/>
                                </View>
                                <View style={{width: 140, padding: 1}}>
                                    <Button buttonStyle={{
                                        backgroundColor: "green",
                                        width: 140,
                                        height: 50,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 5,
                                    }}
                                            onPress={() => this.props.navigation.navigate('ExamWidget', {
                                                topicId: this.state.topicId,
                                                eid: this.state.eid,
                                                exam: this.state.exam
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
                    </Card>
                </View>
            </ScrollView>
        )
    }

}