import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const Chart = () => {
    const items = useSelector(state => state.items);

    const [weeklyData, setWeeklyData] = useState([
        { date: moment().startOf('week').add(1, 'day'), quantity: 0 },
        { date: moment().startOf('week').add(2, 'day'), quantity: 0 },
        { date: moment().startOf('week').add(3, 'day'), quantity: 0 },
        { date: moment().startOf('week').add(4, 'day'), quantity: 0 },
        { date: moment().startOf('week').add(5, 'day'), quantity: 0 },
    ]);

    useEffect(() => {
        const startOfWeek = moment().startOf('week').add(1, 'day'); // Monday
        const endOfWeek = moment().endOf('week').subtract(1, 'day'); // Friday

        // Filter the items array to only keep data points within the current week
        const weeklyItems = items.filter(item => {
            const itemDate = moment(item.date);
            return itemDate.isSameOrAfter(startOfWeek) && itemDate.isSameOrBefore(endOfWeek);
        });

        // Update the weeklyData state to include the quantities for each date in the current week
        let updatedWeeklyData = [...weeklyData];
        weeklyItems.forEach(item => {
            const itemDate = moment(item.date);
            const dataPointIndex = updatedWeeklyData.findIndex(dataPoint =>
                dataPoint.date.isSame(itemDate, 'day')
            );
            if (dataPointIndex === -1) {
                updatedWeeklyData.push({
                    date: itemDate,
                    quantity: item.quantity,
                    prevQuantity: 0,
                });
            } else {
                updatedWeeklyData[dataPointIndex] = {
                    ...updatedWeeklyData[dataPointIndex],
                    prevQuantity: updatedWeeklyData[dataPointIndex].quantity,
                    quantity: item.quantity,
                };
            }
        });

        updatedWeeklyData.forEach(dataPoint => {
            if (dataPoint.quantity === 0) {
                const itemForDate = items.find(item => moment(item.date).isSame(dataPoint.date, 'day'));
                if (itemForDate) {
                    dataPoint.quantity = dataPoint.quantity;
                    dataPoint.quantity = itemForDate.quantity;
                }
            }
        });


        setWeeklyData(updatedWeeklyData.sort((a, b) => a.date.diff(b.date)));
    }, [items]);

    if (!Array.isArray(items) || items.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No data to display</Text>
            </View>
        );
    }

    const chartData = {
        labels: weeklyData.map(dataPoint => dataPoint.date.format('MM/DD')),
        datasets: [
            {
                data: weeklyData.map(dataPoint => dataPoint.quantity),
                color: () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#f2f2f2',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 0,
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={chartData}
                width={ScreenWidth}
                height={300}
                chartConfig={chartConfig}
                withDots={true}
                withInnerLines={true}
                withOuterLines={true}
                bezier
                fromZero={true}
                style={styles.chart}
                contentInset={{ top: 20, bottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default Chart;
