var CELL_SIZE = 40;  

function Labyrinth() {  
    // Sample labyrinth map  
    this.map = [  
        [0, 0, 1, 1, 1, 0],  
        [1, 0, 0, 0, 1, 0],  
        [1, 0, 1, 0, 0, 0],  
        [1, 0, 1, 1, 1, 0],  
        [1, 0, 0, 0, 1, 0]  
    ];  
    
    this.start = { x: 0, y: 0 }; // Starting position  
    this.end = { x: 4, y: 5 };   // Destination position  
    this.playerPosition = { x: this.start.x, y: this.start.y }; // Player's initial position  
}  

// Method to print the labyrinth in the console  
Labyrinth.prototype.printConsole = function() {  
    for (let row of this.map) {  
        console.log(row.map(cell => (cell === 1 ? '*' : ' ')).join(''));  
    }  
};  

// Method to render the labyrinth on the screen  
Labyrinth.prototype.printDisplay = function(id) {  
    const container = document.getElementById(id);  
    container.style.position = 'relative';  
    container.style.width = `${this.map[0].length * CELL_SIZE}px`;  
    container.style.height = `${this.map.length * CELL_SIZE}px`;  

    // Clear previous display  
    container.innerHTML = '';  

    // Draw the labyrinth  
    for (let i = 0; i < this.map.length; i++) {  
        for (let j = 0; j < this.map[i].length; j++) {  
            const cell = document.createElement('div');  
            cell.style.position = 'absolute';  
            cell.style.width = `${CELL_SIZE}px`;  
            cell.style.height = `${CELL_SIZE}px`;  
            cell.style.left = `${j * CELL_SIZE}px`;  
            cell.style.top = `${i * CELL_SIZE}px`;  
            cell.style.backgroundColor = this.map[i][j] === 1 ? 'grey' : 'white';  
            container.appendChild(cell);  
        }  
    }  

    // Draw the player  
    const player = document.createElement('div');  
    player.style.position = 'absolute';  
    player.style.width = `${CELL_SIZE}px`;  
    player.style.height = `${CELL_SIZE}px`;  
    player.style.left = `${this.playerPosition.y * CELL_SIZE}px`;  
    player.style.top = `${this.playerPosition.x * CELL_SIZE}px`;  
    player.style.backgroundColor = 'red'; // Player color  
    container.appendChild(player);  

    // Draw the destination  
    const destination = document.createElement('div');  
    destination.style.position = 'absolute';  
    destination.style.width = `${CELL_SIZE}px`;  
    destination.style.height = `${CELL_SIZE}px`;  
    destination.style.left = `${this.end.y * CELL_SIZE}px`;  
    destination.style.top = `${this.end.x * CELL_SIZE}px`;  
    destination.style.backgroundColor = 'green'; // Destination color  
    container.appendChild(destination);  
};  

// Method to check valid movement  
Labyrinth.prototype.isValidMove = function(x, y) {  
    return (  
        x >= 0 && x < this.map.length &&  
        y >= 0 && y < this.map[0].length &&  
        this.map[x][y] === 0 // Only allow moves to empty spaces  
    );  
};  

// Method to move the player  
Labyrinth.prototype.movePlayer = function(direction) {  
    let newX = this.playerPosition.x;  
    let newY = this.playerPosition.y;  

    switch(direction) {  
        case 'ArrowUp':  
            newX--;  
            break;  
        case 'ArrowDown':  
            newX++;  
            break;  
        case 'ArrowLeft':  
            newY--;  
            break;  
        case 'ArrowRight':  
            newY++;  
            break;  
    }  

    if (this.isValidMove(newX, newY)) {  
        this.playerPosition = { x: newX, y: newY };  
        this.printDisplay('map'); // Update display after moving  

        // Check if the player has reached the destination  
        if (this.playerPosition.x === this.end.x && this.playerPosition.y === this.end.y) {  
            alert("Congratulations!");  
        }  
    }  
};