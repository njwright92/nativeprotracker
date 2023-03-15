import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import moment from 'moment';

const LineChartScreen = ({ route }) => {
    const { itemId } = route.params;
    const entries = useSelector(state =>
        state?.items?.find(item => item.id === itemId)?.entries || []
    );
    const item = useSelector(state =>
        state?.items?.find(item => item.id === itemId)
    );

    if (!Array.isArray(entries) || entries.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No data to display</Text>
            </View>
        );
    }

    const data = {
        labels: entries.map(entry => moment(entry.date).format('MM/DD')),
        datasets: [
            {
                data: entries.map(entry => Number(entry.quantity)),
                color: () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                strokeWidth: 2,
            },
        ],
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.id}>ID: {itemId}</Text>
            <LineChart
                data={data}
                width={ScreenWidth}
                height={220}
                chartConfig={{
                    backgroundColor: '#f8f8f8',
                    backgroundGradientFrom: '#f8f8f8',
                    backgroundGradientTo: '#dcdcdc',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    formatYLabel: (value) => `${value}`,
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0b2d5c',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f8f8f8'
    },
    id: {
        color: '#dcdcdc'
    },
});

export default LineChartScreen;
