import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import moment from 'moment';

const LineChartScreen = ({ route }) => {
    const { itemId } = route.params;
    const weeklyEntries = useSelector(state =>
        state?.items?.find(item => item.id === itemId)?.entries.slice(-7) || []
    );
    const monthlyEntries = useSelector(state =>
        state?.items?.find(item => item.id === itemId)?.entries.slice(-28) || []
    );
    const yearlyEntries = useSelector(state =>
        state?.items?.find(item => item.id === itemId)?.entries.slice(-270) || []
    );
    const item = useSelector(state =>
        state?.items?.find(item => item.id === itemId)
    );

    if (!Array.isArray(weeklyEntries) || weeklyEntries.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No data to display.</Text>
            </View>
        );
    }
    if (!Array.isArray(monthlyEntries) || monthlyEntries.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No data to display.</Text>
            </View>
        );
    }
    if (!Array.isArray(yearlyEntries) || yearlyEntries.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No data to display.</Text>
            </View>
        );
    }

    const weeklyData = {
        labels: weeklyEntries.map(entry => moment(entry.date).format('MM/DD')).reverse(),
        datasets: [
            {
                data: weeklyEntries.map(entry => Number(entry.quantity)).reverse(),
                color: (opacity = 1) => `rgba(91, 44, 141, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const monthlyData = {
        labels: monthlyEntries.map(entry => moment(entry.date).format('MM/DD')).reverse(),
        datasets: [
            {
                data: monthlyEntries.map(entry => Number(entry.quantity)).reverse(),
                color: (opacity = 1) => `rgba(107, 63, 160, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const yearlyData = {
        labels: yearlyEntries.map(entry => moment(entry.date).format('MM/DD')).reverse(),
        datasets: [
            {
                data: yearlyEntries.map(entry => Number(entry.quantity)).reverse(),
                color: (opacity = 1) => `rgba(107, 63, 160, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    return (
        <ScrollView contentContainerstyle={styles.scroll}>
            <ScrollView style={styles.scrollContent}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#dcdcdc'
                }}>Weekly</Text>
                <LineChart
                    data={weeklyData}
                    width={ScreenWidth}
                    height={275}
                    chartConfig={{
                        backgroundColor: '#f8f8f8',
                        backgroundGradientFrom: '#f8f8f8',
                        backgroundGradientTo: '#dcdcdc',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        yAxisLabel: 'Quantity',
                        xAxisLabel: 'Date',
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    withInnerLines={true}
                    withOuterLines={false}
                    fromZero={true}
                    contentInset={{ top: 20, bottom: 20 }}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                />
                <Text style={styles.id}>ID: {itemId}</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#dcdcdc'
                }}>Monthly</Text>
                <LineChart
                    data={monthlyData}
                    width={ScreenWidth}
                    height={275}
                    chartConfig={{
                        backgroundColor: '#f8f8f8',
                        backgroundGradientFrom: '#f8f8f8',
                        backgroundGradientTo: '#dcdcdc',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        yAxisLabel: 'Quantity',
                        xAxisLabel: 'Date',
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    withInnerLines={true}
                    withOuterLines={true}
                    fromZero={true}
                    contentInset={{ top: 20, bottom: 20 }}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                />
                <Text style={styles.id}>ID: {itemId}</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#dcdcdc'
                }}>Yearly</Text>
                <LineChart
                    data={yearlyData}
                    width={ScreenWidth}
                    height={275}
                    chartConfig={{
                        backgroundColor: '#f8f8f8',
                        backgroundGradientFrom: '#f8f8f8',
                        backgroundGradientTo: '#dcdcdc',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        yAxisLabel: 'Quantity',
                        xAxisLabel: 'Date',
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    withInnerLines={true}
                    withOuterLines={true}
                    fromZero={true}
                    contentInset={{ top: 20, bottom: 20 }}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                />
                <Text style={styles.id}>ID: {itemId}</Text>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollContent: {
        backgroundColor: 'rgba(65,105,225,0.8)',
        padding: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f8f8f8'
    },
    id: {
        color: '#dcdcdc',
        textAlign: 'right'
    },
});

export default LineChartScreen;
