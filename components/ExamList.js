import React from 'react'
import {Alert, View} from 'react-native'
import {Button, Card, Divider, ListItem} from 'react-native-elements'

export default class ExamList
    extends React.Component {
    static navigationOptions = {title: 'Exams'};

    createExam = (topicId) => {
        return fetch('https://summester-webdev.herokuapp.com/api/topic/' + topicId + '/exam', {
            method: 'POST',
            body: JSON.stringify({
                questions: []
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => (response.json()))
            .then(exam => {
                Alert.alert('Exam Added!');
                this.setState({exam});
            }).then(this.props.navigation.navigate('ExamList', {topicId: this.state.topicId}))
    };

    findAllExamsForTopic = (topicId) => {
        return fetch('https://summester-webdev.herokuapp.com/api/topic/' + topicId + '/exam')
            .then(response => (response.json()))
            .then(exams => (this.setState({exams})))
    };

    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            exam: {},
            topicId: 1
        };
        this.createExam = this.createExam.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({topicId});
        this.findAllExamsForTopic(topicId);
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId');
        this.setState({topicId});
        this.findAllExamsForTopic(topicId);
    }

    render() {
        return (
            <View style={{paddingTop: 5}}>
                <View style={{paddingLeft: 8, paddingVertical: 10}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 350,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }}
                            onPress={() => this.createExam(this.state.topicId)}
                            title='Create Exam'
                            containerStyle={{marginTop: 20}}/>
                </View>
                <View style={{paddingHorizontal: 8, paddingVertical: 10}}>
                    <Divider style={{backgroundColor: 'grey'}} containerStyle={{marginTop: 5}}/>
                    <Card title={'Exams'}>
                        {
                            this.state.exams.map((exam, i) => (
                                <ListItem key={i} title={exam.name} leftIcon={{}} subtitle={'Click to edit exam'}
                                          onPress={() => this.props.navigation.navigate('ExamWidget', {
                                              topicId: this.state.topicId,
                                              exam: this.state.exams[i],
                                              eid: this.state.exams[i].id
                                          })}/>
                            ))
                        }
                    </Card>
                </View>
            </View>
        )
    }
}