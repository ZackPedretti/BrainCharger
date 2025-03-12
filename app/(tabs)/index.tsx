import {StyleSheet, Text, Button, View, Pressable, TouchableOpacity, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from "react";
import {TimerPicker, TimerPickerModal} from "react-native-timer-picker";
import {LinearGradient} from "expo-linear-gradient";

export default function HomeScreen() {

    const baseButtonText = 'Start working';
    const timerButtonText = 'Stop timer';

    const [buttonText, setButtonText] = useState(baseButtonText);
    const [remainingTime, setRemainingTime] = useState(15 * 60);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [baseTime, setBaseTime] = useState(15 * 60);
    const [showPicker, setShowPicker] = useState(false);

    const formatTime = () => {
        const time = convertSeconds();
        return `${time.hours > 0 ? time.hours + ':' : ''}${time.minutes < 10 && time.hours > 0 ? '0' : ''}${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}`;
    };

    const convertSeconds = () => {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        return {hours: hours, minutes: minutes, seconds: seconds};
    };

    useEffect(() => {
        if (!isTimerOn) {
            setRemainingTime(baseTime);
        }
    }, [baseTime, isTimerOn]);

    useEffect(() => {
        if (!isTimerOn) return;

        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
            if (remainingTime < 0) setIsTimerOn(false);
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerOn, remainingTime]);

    useEffect(() => {
        if (isTimerOn) return;


    }, []);

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
            <Image style={styles.brainImage} source={require("../../assets/images/brain.png")}/>
            <TouchableOpacity style={styles.button} onPress={handleTimerButtonPress}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            <Text style={styles.remainingTimeText}>Remaining time: <Text style={styles.bold}>{formatTime()}</Text></Text>
            <TimerPickerModal
                visible={showPicker}
                setIsVisible={setShowPicker}
                onConfirm={(pickedDuration) => {
                    setBaseTime(pickedDuration.hours * 60 * 60 + pickedDuration.minutes * 60 + pickedDuration.seconds);
                    setShowPicker(false);
                }}
                modalTitle="Set Timer"
                padWithNItems={2}
                hourLabel=":"
                minuteLabel=":"
                secondLabel=""
                initialValue={{
                    hours: convertSeconds().hours,
                    minutes: convertSeconds().minutes,
                    seconds: convertSeconds().seconds
                }}
                LinearGradient={LinearGradient}
                styles={{
                    theme: "light",
                    pickerItem: {
                        fontSize: 28,
                    },
                    pickerLabel: {
                        fontSize: 32,
                        marginTop: 0,
                    },
                    pickerContainer: {
                        marginRight: 0,
                    },
                }}
            />
            <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
                <Text style={styles.buttonText}>Set timer duration</Text>
            </TouchableOpacity>
            <Toast/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FBFCF7',
        height: '100%',
    },
    title: {
        fontSize: 47,
        textAlign: 'center',
        marginVertical: 30,
    },
    button: {
        backgroundColor: '#E0AC82',
        width: 200,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "auto",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    brainImage: {
        width: 300,
        height: 300,
        marginHorizontal: "auto",
        marginVertical: 50,
    },
    remainingTimeText: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 10,
    },
    bold : {
        fontWeight: 'bold',
    }

});
