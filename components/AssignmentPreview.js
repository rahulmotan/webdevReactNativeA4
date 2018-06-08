import React from 'react'
import {ScrollView, StyleSheet, TextInput, View} from 'react-native'
import {Button, Card, Text} from 'react-native-elements'

export default class AssignmentPreview
    extends React.Component {
    static navigationOptions = {title: 'Preview'};
    deleteAssignment = () => {
        return fetch('https://summester-webdev.herokuapp.com/api/assignment/' + this.state.assignment.id, {
            method: 'DELETE'
        }).then(
            this.props.navigation.navigate('AssignmentList', {topicId: this.state.topicId})
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            topicId: '',
            aid: 1,
            assignment: {}
        };
        this.deleteAssignment = this.deleteAssignment.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId');
        const aid = navigation.getParam('aid');
        const assignment = navigation.getParam('assignment');
        this.setState({topicId});
        this.setState({aid});
        this.setState({assignment});
    }

    render() {
        return (
            <ScrollView style={{paddingVertical: 10}}>
                <View style={{paddingHorizontal: 5}}>
                    <Card style={{height: 400}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: 250}}>
                                <Text h4>{this.state.assignment.title}</Text>
                            </View>
                            <View style={{width: 100}}>
                                <Text h4>{this.state.assignment.points}pts</Text>
                            </View>
                        </View>
                        <View style={{paddingVertical: 2}}>
                            <Text h5>{this.state.assignment.description}</Text>
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Text h4 style={{paddingHorizontal: 5}}>Essay answer</Text>
                            <TextInput style={styles.box} multiline={true} numberOfLines={5}/>
                        </View>
                        <View style={{paddingVertical: 2, paddingBottom: 10}}>
                            <Text h4 style={{paddingHorizontal: 5}}>Upload File</Text>
                            <TextInput/>
                        </View>
                        <View style={{paddingVertical: 2, paddingBottom: 10}}>
                            <Text h4 style={{paddingHorizontal: 5}}> Submit Link</Text>
                            <TextInput/>
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
                                borderRadius: 5,
                            }}
                                    onPress={this.deleteAssignment}
                                    title='Delete'
                                    containerStyle={{marginTop: 20}}
                                    icon={{
                                        name: 'delete-forever',
                                        size: 25,
                                        color: 'white'
                                    }}/>
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
                                    onPress={() => this.props.navigation.navigate('AssignmentUpdate', {
                                        topicId: this.state.topicId,
                                        aid: this.state.aid,
                                        assignment: this.state.assignment
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
const styles = StyleSheet.create({
    box: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da'
    }
});