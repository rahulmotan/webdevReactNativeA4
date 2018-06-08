import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import TopicList from './components/TopicList'
import AssignmentList from './components/AssignmentList'
import ExamList from './components/ExamList'
import ExamWidget from './components/ExamWidget'
import AssignmentWidget from './components/AssignmentWidget'
import AssignmentPreview from './components/AssignmentPreview'
import QuestionWidget from './components/QuestionWidget'
import QuestionPreview from './components/QuestionPreview'
import QuestionUpdate from './components/QuestionUpdate'
import AssignmentUpdate from './components/AssignmentUpdate'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>
            </ScrollView>
        )
    }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    QuestionWidget,
    AssignmentList,
    ExamWidget,
    QuestionUpdate,
    AssignmentWidget,
    AssignmentPreview,
    ExamList,
    AssignmentUpdate,
    QuestionPreview,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    TopicList
});

export default App;

