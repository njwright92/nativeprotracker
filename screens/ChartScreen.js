import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Chart from '../components/Chart';
import { formatChartData } from '../data/formattedData';

const weeklyData = formatChartData([
    { date: '2022-02-28', quantity: 50 },
    { date: '2022-03-01', quantity: 10 },
    { date: '2022-03-02', quantity: 150 },
    { date: '2022-03-03', quantity: 80 },
    { date: '2022-03-04', quantity: 120 },
    { date: '2022-03-05', quantity: 70 },
    { date: '2022-03-06', quantity: 90 },
]);

const ChartScreen = () => {
    const scrollViewRef = useRef(null);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const [scale, setScale] = useState(1);

    const onPinchGestureEvent = ({ nativeEvent }) => {
        setScale(nativeEvent.scale);
    };

    const onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setScale(1);
        }
    };

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.offsetX = translateX.value;
            ctx.offsetY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.offsetX + event.translationX;
            translateY.value = ctx.offsetY + event.translationY;
        },
        onEnd: (event, ctx) => {
            const isOutOfBounds =
                translateY.value < -150 ||
                translateY.value > 150 ||
                translateX.value < -150 ||
                translateX.value > 150;

            if (isOutOfBounds) {
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    });

    const chartContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (
        <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <Text style={styles.title}>Weekly Production Tracking</Text>
                <PinchGestureHandler
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={onPinchHandlerStateChange}>
                    <Animated.View style={[chartContainerStyle, { transform: [{ scale: scale }] }]}>
                        <PanGestureHandler
                            onGestureEvent={onGestureEvent}
                            shouldCancelWhenOutside={true}>
                            <Animated.View>
                                <Chart data={weeklyData} title="Weekly Production Tracking" />
                            </Animated.View>
                        </PanGestureHandler>
                    </Animated.View>
                </PinchGestureHandler>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFA500',
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
