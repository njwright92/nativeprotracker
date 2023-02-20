import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Chart from '../components/Chart';

const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            data: [50, 10, 150, 80, 120, 70, 90],
            color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
        },
    ],
};

const monthlyData = {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    datasets: [
        {
            data: [100, 120, 80, 150, 90, 110, 140, 70, 130, 60, 100, 120],
            color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
        },
    ],
};

const yearlyData = {
    labels: ['2019', '2020', '2021', '2022'],
    datasets: [
        {
            data: [500, 800, 1000, 1200],
            color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
        },
    ],
};

const ChartScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Weekly Production Tracking</Text>
                <Chart data={weeklyData} />
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>Monthly Production Tracking</Text>
                <Chart data={monthlyData} />
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>Yearly Production Tracking</Text>
                <Chart data={yearlyData} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ChartScreen;
