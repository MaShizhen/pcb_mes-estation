import { Platform } from 'react-native'
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export default async function nfc() {
	return new Promise(async (resolve, reject) => {
		try {
			await NfcManager.start();
			const tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
			await NfcManager.requestTechnology(tech);
			const tag = await NfcManager.getTag();
			resolve({
				code: 1,
				id: tag.id
			})
		} catch (error) {
			reject({
				code: 0,
				msg: 'nfc读取失败'
			})
		} finally {
			NfcManager.cancelTechnologyRequest().catch(() => 0);
		}
	})
}
