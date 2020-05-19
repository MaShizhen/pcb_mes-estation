import { createIconSet } from 'react-native-vector-icons';
const glyphMap = {
	"dengpao": 58897,
	"dengpao1": 59053,
	"wenbenbianjitianchong": 59092,
	"wenbenbianji": 59093,
	"shezhi2": 58907,
	"yiliaozhiliangfenxi": 59013,
	"tubiao1": 58899,
	"tubiao": 58995,
	"property-safety": 59138,
	"shezhi1": 58900,
	"jiankongmianban": 58928,
	"jiankongmianban-mianxing": 58978,
	"pinzhi": 58932,
	"propertysafety": 58988
};

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
