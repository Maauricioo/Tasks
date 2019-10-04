import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class screens extends Component {

    state = {
        tasks: [
            {
                id: Math.random(), desc: 'Lorem ipsum 1', estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 2', estimateAt: new Date(), doneAt: null
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 1', estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 2', estimateAt: new Date(), doneAt: null
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 1', estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 2', estimateAt: new Date(), doneAt: null
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 1', estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Lorem ipsum 2', estimateAt: new Date(), doneAt: null
            },
        ],
        visibleTasks: [],
        showDoneTasks: true,
    }

    filterTasks = () => {
        let visibleTasks = true
        if (this.state.showDoneTasks) {
            const pending = task => task.doneAt
            visibleTasks = this.state.tasks.filter(pending)
        } else {
            visibleTasks = [...this.state.tasks]
        }
        this.setState({ visibleTasks })
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === id) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM')}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    tasksContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})