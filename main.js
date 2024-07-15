function knightMoves(startPosition, finishPosition) {
	let chessMatrix = Array.from({ length: 8 }, () => Array(8).fill(Infinity));
	const directions = [
		[2, 1],
		[2, -1],
		[1, 2],
		[1, -2],
		[-2, 1],
		[-2, -1],
		[-1, 2],
		[-1, -2],
	];
	let queue = [[startPosition, [startPosition]]];
	chessMatrix[startPosition[0]][startPosition[1]] = 0;
	let foundPaths = [];
	let shortestPathLength = Infinity;
	while (queue.length > 0) {
		let [current, path] = queue.shift();
		if (path.length > shortestPathLength) continue;
		if (current[0] === finishPosition[0] && current[1] === finishPosition[1]) {
			if (path.length < shortestPathLength) {
				shortestPathLength = path.length;
				foundPaths = [path];
			} else if (path.length === shortestPathLength) {
				foundPaths.push(path);
			}
			continue;
		}

		for (let [dy, dx] of directions) {
			let nextY = current[0] + dy;
			let nextX = current[1] + dx;

			if (
				nextY >= 0 &&
				nextY < 8 &&
				nextX >= 0 &&
				nextX < 8 &&
				chessMatrix[nextY][nextX] >= path.length + 1
			) {
				chessMatrix[nextY][nextX] = path.length + 1;
				queue.push([[nextY, nextX], path.concat([[nextY, nextX]])]);
			}
		}
	}

	if (foundPaths.length > 0) {
		let paths = 0;
		let text =
			foundPaths.length === 1 ? "A PATH" : `${foundPaths.length} PATHS`;
		let pathLength = foundPaths[0].length;
		console.log(`YOU FOUND ${text} OF ${pathLength} STEPS:`);
		foundPaths.forEach((path) => {
			paths++;

			console.log(`PATH ${paths}:`);
			path.forEach((step) => {
				console.log(step[0], step[1]);
			});
		});
	} else {
		console.log("NO PATH FOUND");
	}
}

// TESTING
let startPosition = [0, 0];
let finishPosition = [3, 3];
knightMoves(startPosition, finishPosition);
