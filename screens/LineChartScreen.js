import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { getAllEntriesByCurrentUser } from '../actions/getEntry';
import moment from 'moment';

const LineChartScreen = ({ route }) => {
    const { itemId, itemName } = route.params;
    const navigation = useNavigation();
    const [weeklyEntries, setWeeklyEntries] = useState([]);
    const [monthlyEntries, setMonthlyEntries] = useState([]);
    const [yearlyEntries, setYearlyEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const entries = await getAllEntriesByCurrentUser();
                const weekly = entries.slice(-7);
                const monthly = entries.slice(-28);
                const yearly = entries.slice(-270);
                setWeeklyEntries(weekly);
                setMonthlyEntries(monthly);
                setYearlyEntries(yearly);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEntries();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        );
    }


    if (!Array.isArray(weeklyEntries) || weeklyEntries.length === 0) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'black' : 'darkSlateGray', borderRadius: 20, padding: 16, width: '85%', marginTop: 20, alignSelf: 'center' }]}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-back" size={28} color='black' />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>
                            Back
                        </Text>
                    </View>
                </TouchableOpacity>
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
        labels: weeklyEntries.map(entry => moment(entry.date.toDate()).format('MM/DD')).reverse(),
        datasets: [
            {
                data: weeklyEntries.map(entry => Number(entry.quantity)).reverse(),
                color: () => `rgba(204, 127, 44, 1)`,
                strokeWidth: 2,
            },
        ],
    };

    const monthlyData = {
        labels: monthlyEntries.map(entry => moment(entry.date.toDate()).format('MM/DD')).reverse(),
        datasets: [
            {
                data: monthlyEntries.map(entry => Number(entry.quantity)).reverse(),
                color: () => `rgba(204, 127, 44, 1)`,
                strokeWidth: 2,
            },
        ],
    };

    const yearlyData = {
        labels: yearlyEntries.map(entry => moment(entry.date.toDate()).format('MM/DD')).reverse(),
        datasets: [
            {
                data: yearlyEntries.map(entry => Number(entry.quantity)).reverse(),
                color: () => `rgba(204, 127, 44, 1)`,
                strokeWidth: 2,
            },
        ],
    };

    return (
        <ScrollView contentContainerstyle={styles.scroll}>
            <ScrollView style={styles.scrollContent}>
                <TouchableOpacity
                    style={({ pressed }) => [{ backgroundColor: pressed ? '#fff' : 'transparent', borderRadius: 20, padding: 16, width: '85%', marginTop: 10, alignSelf: 'flex-start' }]}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-back" size={24} color='#fff' />
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                            Back
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>{itemName}</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#333333'
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
                    color: '#333333'
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
                    color: '#333333'
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
        backgroundColor: '#778899',
        padding: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    id: {
        color: '#dcdcdc',
        textAlign: 'right'
    },
});

export default LineChartScreen;
