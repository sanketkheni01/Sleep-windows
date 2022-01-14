import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import 'react-native-tailwind.macro'
import Icon from 'react-native-vector-icons/Feather'
import useHandleSwitch from '../../Hooks/useHandleSwitch'
import Toast from 'react-native-toast-message'
import firestore from '@react-native-firebase/firestore'

const SleepButton = () => {
	// * States
	const [buttonColor, setButtonColor] = useState('#fff')
	const [isOn, setIsOn] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [reload, setReload] = useState(false)
	const [url, setUrl] = useState('')

	// * Hooks
	const { Off, On } = useHandleSwitch(url)

	// * Animations
	const scale = useSharedValue(1)
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		}
	})

	// * functions
	const handlePress = () => {
		setIsOn(!isOn)
		if (isOn) {
			Off()
			setButtonColor('#ff0000')
		} else {
			On()
			setButtonColor('#00aa00')
		}
	}

	const getURL = () => {
		firestore()
			.collection('url')
			.doc('url')
			.get()
			.then((doc) => {
				const data = doc.data()
				if (data) {
					setUrl(data.url)
					console.log(data.url)
				}
			})
	}

	const handleRefresh = () => {
		setReload(!reload)
		Toast.show({
			type: 'info',
			text1: 'Refreshing...',
		})
	}

	// * Effects
	useEffect(() => {
		if (url) {
			axios
				.get(url)
				.then((res) => {
					let result = res.data.payload
					if (result) {
						setIsOn(res.data.payload)
						setIsLoading(false)
					} else {
					}
				})
				.catch((err) => {
					setIsLoading(false)
					Toast.show({
						type: 'error',
						text1: 'Computer is turned off',
					})
				})
		}
	}, [reload, url])

	useEffect(() => {
		getURL()
	}, [reload])

	useEffect(() => {
		if (!isLoading) {
			setButtonColor(isOn ? '#00aa00' : '#ff0000')
		}
	}, [isLoading, isOn])

	return (
		<>
			<Animated.View
				tw='items-center justify-center w-32 h-32 mt-8 shadow-2xl rounded-full border-white border-4 '
				style={[{ backgroundColor: buttonColor }, animatedStyles]}
			>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<Pressable
						disabled={isLoading || !isOn ? true : false}
						tw='w-full h-full items-center justify-center'
						onPressIn={() => {
							scale.value = withSpring(0.95)
						}}
						onPressOut={() => {
							scale.value = withSpring(1)
						}}
						onPress={handlePress}
					>
						<Icon size={60} color={'#fff'} name='power'></Icon>
					</Pressable>
				)}
			</Animated.View>
			<Pressable
				onPress={handleRefresh}
				tw='items-center justify-center bg-white w-16 h-16 mt-8 shadow-lg rounded-full border-white border-4 '
			>
				<Icon size={15} color={'#000'} name='refresh-ccw'></Icon>
			</Pressable>
		</>
	)
}

export default SleepButton
