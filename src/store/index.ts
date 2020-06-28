import { combineReducers, createStore } from 'redux';
import equipment_mes_id from './reducers/equipment-mes-id'
import mqtt_listen from './reducers/mqtt-listen'
import process_mes_id from './reducers/process-mes-id'

const reducers = combineReducers({
	mqtt_listen,
	equipment_mes_id,
	process_mes_id
})
export default createStore(reducers);
