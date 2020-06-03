export default function heart_beat() {
	beat()
	setInterval(() => {
		beat()
	}, 1000);
}

function beat() {
	// console.log(new Date())
}
