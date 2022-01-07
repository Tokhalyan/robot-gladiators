// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
        var confirmSkip = confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
        if (confirmSkip) {
        alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
        }
    }

    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
        alert(enemy.name + ' has died!');

      // award player money for winning
        playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
        break;
    } else {
        alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    // remove players's health by subtracting the amount set in the enemy.attack variable
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
        alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
        break;
    } else {
        alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);
            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
        alert("You have lost your robot in battle! Game Over!");
        break;
        }
    }
    // play again
    endGame();
};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } 
    else {
        alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = confirm("Would you like to play again?");

    if (playAgainConfirm) {
    // restart the game
        startGame();
    } 
    else {
        alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}
var shop = function() {
    var shopOptionPrompt = prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    )
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":    
            playerInfo.refillHealth();
            break;

        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;

        case "leave":
        case "LEAVE":
            alert("Leaving the store.");
        
            // do nothing, so function will end
            break;

        default:
            alert("You did not pick a valid option. Try again.");
        
            // call shop() again to force player to pick a valid option
            shop();
            break;
        }
}

// random number generator 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    
    return value;
}

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma!
    refillHealth: function() {
        if(this.money >= 7) {
            alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } 
        else {
            alert("You don't have enough money!");
        }
    }, // comma!
    upgradeAttack: function() {
        if(this.money >= 7) {
            alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
]

// start the game when the page loads
startGame();