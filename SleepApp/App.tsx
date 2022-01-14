import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import 'react-native-tailwind.macro'
import HomeScreen from './src/Screens/Home'
import Toast from 'react-native-toast-message'

const App = () => {
	return (
		<>
			<StatusBar
				animated={true}
				backgroundColor='#fff'
				barStyle={'dark-content'}
				showHideTransition={'slide'}
				hidden={false}
			/>
			<HomeScreen />
			<Toast />
		</>
	)
}

export default App
