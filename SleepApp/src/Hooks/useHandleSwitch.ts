import axios from 'axios'

const useHandleSwitch = (url: string) => {
	function Off() {
		axios.post(url, { payload: 'off' })
	}

	function On() {}

	return { Off, On }
}

export default useHandleSwitch
