import React from 'react'
import {ScrollView, TextInput, View} from 'react-native'
import {Card, FormLabel} from 'react-native-elements'

export default class QuestionWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            eid: 1,
            topicId: 1,
            title: '',
            description: '',
            points: '',
            choices: '',
            correctOption: '',
            question: {}
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const eid = navigation.getParam('eid');
        const topicId = navigation.getParam('topicId');
        const value = navigation.getParam('value');
        this.setState({eid});
        this.setState({topicId});
        this.setState({value});
    }

    render() {
        const widgetType = ["Multiple Choice Question", "Fill In The Blanks", "Essay", "True or False"];
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
                        </Card>
                    }
                </View>
            </ScrollView>
        )
    }
}