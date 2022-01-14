import React from 'react'
import { View, Text } from 'react-native'
import 'react-native-tailwind.macro'
import SleepButton from '../../Components/SleepButton'

const HomeScreen = () => {
	return (
		<View tw='w-full h-full items-center justify-center bg-white'>
			<Text tw='text-5xl text-gray-800'>Sleep</Text>
			<SleepButton />
		</View>
	)
}

export default HomeScreen
