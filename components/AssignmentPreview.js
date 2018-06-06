import React from 'react'
import {ScrollView, StyleSheet, TextInput, View} from 'react-native'
import {Button, Card, Text} from 'react-native-elements'

export default class AssignmentPreview
    extends React.Component {
    static navigationOptions = {title: 'Preview'};

    constructor(props) {
        super(props);
        this.state = {
            topicId: '',
            assignment: {}
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId');
        this.setState({topicId});
        const assignment = navigation.getParam('assignment');
        this.setState({assignment});
    }

    render() {
        return (
            <ScrollView style={{paddingVertical: 10}}>
                <View style={{paddingHorizontal: 5}}>
                    <Card style={{height: 400}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text h4>{this.state.assignment.title}</Text>
                            <Text h5>{this.state.assignment.points}</Text>
                        </View>
                        <View style={{paddingVertical: 2}}>
                            <Text>{this.state.assignment.description}</Text>
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
                        <View style={{paddingTop: 20, paddingLeft: 20, margin: 'auto'}}>
                            <Button buttonStyle={{
                                backgroundColor: "red",
                                width: 150,
                                height: 50,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                                    onPress={() => this.props.navigation.navigate('AssignmentList', {topicId: this.state.topicId})}
                                    title='Go Back'
                                    containerStyle={{marginTop: 20}}/>
                        </View>
                    </Card>
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