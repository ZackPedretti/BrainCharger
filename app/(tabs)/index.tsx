import {StyleSheet,Text, Button, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from "react";

export default function HomeScreen() {

    const baseButtonText = 'Start working';
    const timerButtonText = 'Stop timer';

    const [buttonText, setButtonText] = useState(baseButtonText);
    const [remainingTime, setRemainingTime] = useState(15 * 60);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [baseTime, setBaseTime] = useState(15 * 60);

    const formatTime = () => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        if (!isTimerOn) return;

        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
            if (remainingTime < 0) setIsTimerOn(false);
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerOn, remainingTime]);

    const startTimer = () => {
        if (isTimerOn) return;
        setIsTimerOn(true);
        setButtonText(timerButtonText);
        toastStartTimer();
    }

    const stopTimer = () => {
        if (!isTimerOn) return;
        setIsTimerOn(false);
        setButtonText(baseButtonText);
        setRemainingTime(baseTime);
        toastStopTimer();
    }

    const handleTimerButtonPress = () => {
        if (!isTimerOn) return startTimer();
        stopTimer();
    }

    const showToast = (text1: string, text2: string) => {
        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: text1,
            text2: text2,
            visibilityTime: 3000,
            autoHide: true,
        });
    }

    const toastStartTimer = () => {
        showToast('Timer started', "Have fun, don't die!");
    }

    const toastStopTimer = () => {
        showToast('Timer stopped', 'Congratulations on you work session!');
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>BrainCharger</Text>
            <Button title={buttonText} onPress={handleTimerButtonPress}/>
            <Text>Remaining time: {formatTime()}</Text>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFFFFF',
        height: '100%',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginTop: 30,
    }
});
