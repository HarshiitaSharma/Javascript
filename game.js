window.onload = function() {  
    const labyrinth = new Labyrinth();  
    labyrinth.printDisplay('map'); // Draw the labyrinth on the map div  

    // Listen for keydown events to move the player  
    document.addEventListener('keydown', (event) => {  
        labyrinth.movePlayer(event.key);  
    });  
};