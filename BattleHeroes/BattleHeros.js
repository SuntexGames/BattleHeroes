	//Vector
	function Vector(x, y) {
		this.x = x;
		this.y = y;
		this.add = function(v) {
			this.y = this.y + v.y;
			this.x = this.x + v.x;
		};
	};

	// Forces 
		var jump = new Vector(0,-5); 
		var gravity = new Vector(0,0.2);  
	// Abilities 
			// Ability One
				var dashCooldown = 180; // 3 Sec Cooldown
				var dashLifeSpan = 0;
				var sneakAttackCooldown = 300; // 5 Sec Cooldown
			// Ability Two
				var healCooldown = 600; // 10 Sec Cooldown
				var shieldLifeSpan = 0;
				var shieldCooldown = 0;
			// Ultimate Abilities
				var vampiricModeCooldown = 1800; // 30 Sec Cooldown
				var vampiricModeLifeSpan = 0; // 5 Sec Cooldown
				var trackerModeCooldown = 2400; // 30 Sec Cooldown
				var trackerModeLifeSpan = 0; // 5 Sec Cooldown
	// Player Object
	function Player(x,y,num,r,health,color){
		// Variables 
			this.currentAbilty = "None";
			this.color = color;
			this.r = r;
			this.pos = new Vector(x,y);
			this.vel = new Vector(0,0);
			this.acc = new Vector(0,0);
			this.direction = "Left";
			this.totalHealth = health;
			this.health = health;	
			this.currentWeapon = "Ranged";
			this.currentKey = "None";
		// Show
			this.show = function(){
			 if(this.color === "Blue"){
			  fill(65,105,225);	 
			 }
			 else if(this.color === "Red"){
			  fill(255,50,50);
			 }
			 rect(this.pos.x,this.pos.y,50,50,10);
			 textSize(15);
			 text(num,this.pos.x + 0.5*this.r - 3,this.pos.y + 0.5*this.r - 3,width,height);
				if(this.direction === "Left" && this.currentWeapon === "Ranged"){
					fill(0);
					rect(this.pos.x + 0.5 * r,this.pos.y + 0.4 * r,5,20);
					rect(this.pos.x + 0.5 * r,this.pos.y + 0.4 * r,-10,15);
					rect(this.pos.x + 0.5 * r,this.pos.y + 0.4 * r,-20,10);
				}
				else if(this.direction === "Right" && this.currentWeapon === "Ranged"){
					fill(0);
					rect(this.pos.x + 0.5 * r,this.pos.y + 0.4 * r,5,20);
					rect(this.pos.x + 0.5 * r,this.pos.y + 0.4 * r,10,15);
					rect(this.pos.x + 0.5 * r,this.pos.y + 0.4 * r,20,10);    
				}
			}
		this.update = function(){
			this.pos.add(this.vel);
			this.vel.add(this.acc);
			this.pos.x = constrain(this.pos.x,0,width - this.r);
			this.pos.y = constrain(this.pos.y,170,height - this.r);
			this.acc.y = constrain(this.acc.y,jump.y,gravity.y);
			this.vel.x = constrain(this.vel.x,-20,20);
			this.vel.y = constrain(this.vel.y,jump.y,gravity.y + 5);
		}
		this.applyForce = function(force){
			this.acc.add(force);	
		}
	}
	// Weapons
	var bullets = [];
	function Bullet(dmg,speed,player,r){
		if(player === 1){
		this.x = player1.pos.x;
		this.y = player1.pos.y;
		this.speed = speed;
		this.dmg = dmg;
		this.r = r;
		this.status = "Alive";
		this.shootDir = player1.direction;
			 if(this.shootDir === "Left"){
			 this.speed *= -1;
		 }
			this.hit = function(){
			player2.health -= dmg;
			}
			this.checkHit = function(){
			if(this.status === "Alive"){
				if(this.x  >= player2.pos.x - 0.5* player2.r && this.x <= player2.pos.x + 0.5* player2.r && this.y >= player2.pos.y - 0.5* player2.r && this.y <= player2.pos.y + 0.5* player2.r){
				   if(shieldLifeSpan <= 0){
					player2.health -= this.dmg;
					player2.health = constrain(player2.health,0,player2.totalHealth);
				}
					if(vampiricModeLifeSpan > 0 && shieldLifeSpan <= 0){
						this.dmg = 0.5*(this.dmg + this.dmg/2);
						this.speed += 1.2*speed;
						player2.health -= this.dmg;
						player1.health += this.dmg;
						player2.health = constrain(player2.health,0,player2.totalHealth);
					}
					
					this.status = "Dead"; 
			}
		}
	}
	}   
	else{
		this.x = player2.pos.x;
		this.y = player2.pos.y;
		this.speed = speed;
		this.dmg = dmg;
		this.r = r;
		this.status = "Alive";
		this.shootDir = player2.direction;
		 if(this.shootDir === "Left"){
			 this.speed *= -1;
		 }
			this.checkHit = function(){
			if(this.status === "Alive"){
				if(this.x  >= player1.pos.x - 0.5* player1.r && this.x <= player1.pos.x + 0.5* player1.r && this.y >= player1.pos.y - 0.5* player1.r && this.y <= player1.pos.y + 0.5* player1.r){
					player1.health -= this.dmg;
					this.status = "Dead"; 
			}
		}
	}
	}
	this.show = function(){
	if(this.status === "Alive"){
		if(vampiricModeLifeSpan > 0 && player === 1){
		fill(255,0,0);	
		}
		else if(trackerModeLifeSpan > 0 && player ===2){
		fill(0,225,0)
		}
		else if(player === 1){
			fill(255,50,50);
		}
		else if(player === 2){
			fill(65,105,225);
		}
	rect(this.x,this.y + 0.4* player1.r,this.r,this.r,10);
	}
	}   
	this.update = function(){
	if(this.status === "Alive"){
		if(trackerModeLifeSpan > 0 && player === 2){
			if(this.speed > 0){
				this.speed *= -1;
			}
			if(this.x < player1.pos.x){
			 this.x -= 0.3*this.speed;  
			 }	
			else if(this.x > player1.pos.x){
			  this.x += 0.3*this.speed;  
			}
			if(this.y > player1.pos.y){
			  this.y += 0.3*this.speed;
			}
			else if(this.y < player1.pos.y){
				this.y -= 0.3*this.speed;	
			}
		}
		else{
			 this.x += this.speed;  
		}
		if(this.x > width || this.x < 0){
			this.status = "Dead";
		}
	
	} 

	}	}

	// Key Controls
	function keyPressed(){
	// Player One Controls
		//Left
			if(keyCode === 65){
			player1.vel.x = -5;
			player1.direction = "Left";
			player1.currentKey = "A";
			}
		// Right
			else if(keyCode === 68){
			player1.vel.x = 5;
			player1.direction = "Right"
			player1.currentKey = "D";
			}
		// Jump
			else if(keyCode === 87){
			player1.applyForce(jump);  
			player1.currentKey = "W";
			}
		// Switch Weapon
		// Attack
			else if(player1.currentWeapon === "Ranged" && keyCode === 83){
				bullets[bullets.length] = new Bullet(2,10,1,10);
				player1.currentKey = "S";
			}
		// Ability One
				// Key = Q
			else if(keyCode === 81){
				//Heal
				if(healCooldown <= 0){
				player1.currentKey = "Q";
				player1.health += 7;
				player1.health = constrain(player1.health,0,player1.totalHealth);
				healCooldown = 600;
				}
			}
		// Ability Two
				// Key = E
			else if(keyCode === 69){
				// Dash
				if(dashCooldown <= 0){
					player1.currentKey = "E";
					if(player1.direction === "Right"){
						player1.vel.x = 20;	
					}
					else if(player1.direction === "Left"){
						player1.vel.x = -20;													
					}
					dashCooldown = 180;
					dashLifeSpan = 120;
				}
			}  
		// Ultimate Ability
				// Key = R
				else if(keyCode === 82){
					if(vampiricModeCooldown <= 0 && vampiricModeLifeSpan <= 0){
					player1.currentKey = "R";
					vampiricModeLifeSpan = 600;
					}
				}
	// Player Two Controls
			//Left
			if(keyCode === LEFT_ARROW){
			player2.vel.x = -5;
			player2.direction = "Left"
			player2.currentKey = "Left"
			}
		// Right
			else if(keyCode === RIGHT_ARROW){
			player2.vel.x = 5;
			player2.direction = "Right"
			player2.currentKey = "Right";
			}
		// Jump
			else if(keyCode === UP_ARROW){
			player2.applyForce(jump);
			player2.currentKey = "Up";
			}
		// Shoot
			else if(player2.currentWeapon === "Ranged" && keyCode === DOWN_ARROW){
			 bullets[bullets.length] = new Bullet(2,10,2,10);
			 player2.currentKey = "Down";
			}
		// Ability One
			// Sneak Attack
			else if(keyCode === 16){
				if(sneakAttackCooldown <= 0){
				player2.currentKey = "Shift";
				if(player1.direction === "Right"){
				player2.pos.x = player1.pos.x - player1.r - 20;
				player2.pos.y = player1.pos.y;
				}
				else if(player1.direction === "Left"){
				player2.pos.x = player1.pos.x + player1.r + 20;
				player2.pos.y = player1.pos.y;
				}
				player2.direction = player1.direction;
				backgroundTransparent = 75;
				sneakAttackCooldown = 300;
				}
				
			}
		// Ability Two
			// Shield
			else if(keyCode === 13){
				if(shieldCooldown <= 0 && shieldLifeSpan <= 0){
				player2.currentKey = "Enter";
				shieldLifeSpan = 240;
				}
				   
			}
		// Ultimate Ability
			// Tracker Bullets
			else if(keyCode === 191){
				if(trackerModeCooldown <= 0 && trackerModeLifeSpan <= 0){
				player2.currentKey = "FSlash";
				trackerModeLifeSpan = 300;
				}
			}
			} 

	function keyReleased(){
		// Stop if Player 1 is moving to the Right
		if(player2.currentKey === "Left" || player2.currentKey === "Right"){
		player2.vel.x = 0;   
		}
		else if(player2.currentKey ==="Down" || player2.currentKey === "Enter" || player2.currentKey === "FSlash" || player2.currentKey === "Up"){
		
		}
		else if(player1.currentKey === "D" ||player1.currentKey === "A"){
			player1.vel.x = 0;  
		}
		
	}
	//Health bars
	var healthBar1 = function(){
	fill(255);
	var wHealthBar = width/2;
	rect(0,0,wHealthBar,height/15);
	fill(255,50,50);
	rect(0,0,wHealthBar/player1.totalHealth * player1.health,height/15);
	}
	var healthBar2 = function(){
	var wHealthBar = width/2;
		fill(255);
		rect(width/2,0,wHealthBar,height/15);
		fill(65,105,225);
		rect(width/2,0,wHealthBar/player2.totalHealth * player2.health,height/15);    
	}
		var backgroundTransparent = 75;
		var startPlaying = "False";
		var showControls = "False";
		var titleScreen;
		var titleScreenPlay;
		var titleScreenControls;
		var controlScreen;
		var byAbhik;
		var showTitle = 1;
		var buttonRadius = 150;
		var buttonHeight = 150;
		var backgroundMusic;
		var backgroundImage;
	function preload(){
		titleScreen = loadImage('Images/TitleScreen.jpg');
		titleScreenPlay = loadImage('Images/TitleScreenPlay.jpg');
		titleScreenControls = loadImage('Images/TitleScreenControls.jpg');
		controlScreen = loadImage('Images/ControlScreen.jpg');
		byAbhik = loadImage('Images/ByAbhik.png');
		backgroundMusic = loadSound('Sound/RetroMusic.mp3');
		backgroundImage = loadImage('Images/Background.png')
	}
	function setup() {
		createCanvas(window.innerWidth,window.innerHeight);
		player1 = new Player(floor(width/10),height - 50,1,50,50,"Red");
		player2 = new Player(floor(width/10 * 9),height - 50,2,50,50,"Blue");
		background(135,206,235);
		backgroundMusic.play();
		backgroundMusic.setVolume(0.1);
	}	
	function mouseMoved(){
		if(mouseX > width/2 - buttonRadius && mouseX < width/2 + buttonRadius && mouseY < height/2 
		    && mouseY > height/2 - buttonHeight && showTitle < 4){
			showTitle = 2;
		}
		else if(mouseX > width/2 - buttonRadius && mouseX < width/2 + buttonRadius && mouseY < height/2 + 1.5*buttonHeight && mouseY > height/2 + buttonHeight && showTitle < 4){
			showTitle = 3;
		}
		else if(showTitle < 4){
			showTitle = 1;
		}
	}
	function mouseClicked(){
		if(backgroundMusic.isPlaying === true){
			backgroundMusic.play();
			backgroundMusic.setVolume(0.1);
		}
		if(showTitle === 2){
			startPlaying = "True";
		}
		else if(showTitle === 3){
			showTitle = 4;
		}
		else if(showTitle === 4){
			showTitle = 1;
		}
	}
	function draw() {
		if(backgroundMusic.isPlaying === true){
			backgroundMusic.play();
			backgroundMusic.setVolume(0.1);
		}
		if(startPlaying === "True"){
			  noStroke();
			if(shieldLifeSpan >= 0){
				fill(255,255,0);
				ellipse(player2.pos.x + 0.5 * player2.r,player2.pos.y + 0.5*player2.r,75,75);
			}	
			  image(backgroundImage,width/2,height/2);
			  player1.show();backgroundImage
			  player2.show();
			  player1.update();
			  player2.update();
			  player1.applyForce(gravity);
			  player2.applyForce(gravity);
				for(var i = 0; i < bullets.length;i++){
				  bullets[i].update();
				  bullets[i].show();
				  bullets[i].checkHit();
				}
			  stroke(0);
			  healthBar1();
			  healthBar2();
			 textSize(width/50);
			  noStroke();
				if(healCooldown >= 0){
				fill(225);
				text("Heal Cooldown: " + floor(healCooldown/60) +" (Q)", 100,100);
				}
				else if(healCooldown < 0){
				fill(255);
				text("Heal Cooldown: Ready" +" (Q)",100,100);
				}
				if(dashLifeSpan > 0){
				fill(255);
				text("Dash Cooldown: Active " + floor(dashLifeSpan/60) + " Seconds",100,130);	
				}
				else if(dashCooldown >= 0){
				fill(225);
				text("Dash Cooldown: " + floor(dashCooldown/60) +" (E)", 100,130);	
				}
				else if(dashCooldown < 0){
				fill(255);
				text("Dash Cooldown: Ready" +" (E)",100,130);
				}

				if(sneakAttackCooldown >= 0){
				fill(225);
				text("Sneak Attack Cooldown: " + floor(sneakAttackCooldown/60) +" (Shift)", width/2,100);
				}
				else if(sneakAttackCooldown < 0){
				fill(255);
				text("Sneak Attack Cooldown: Ready" +" (Shift)",width/2,100);
				}
				if(shieldLifeSpan > 0){
				fill(255);
				text("Shield Cooldown: Active "+ floor(shieldLifeSpan / 60) + " Seconds",width/2,130);	
				}
				else if(shieldCooldown >= 0){
				fill(225);
				text("Shield Cooldown: " + floor(shieldCooldown/60) +" (Enter)", width/2,130);	
				}
				else if(shieldCooldown < 0){
				fill(255);
				text("Shield Cooldown: Ready" +" (Enter)",width/2,130);
				}
				if(vampiricModeLifeSpan > 0){
				fill(255);
				text("Vampiric Cooldown: Active " + floor(vampiricModeLifeSpan/60) + " Seconds",100,160);	
				}
				else if(vampiricModeCooldown >= 0){
				fill(225);
				text("VampiricMode Cooldown: " + floor(vampiricModeCooldown/60) +" (R)",100,160);	
				}
				else if(vampiricModeCooldown < 0){
				fill(255);	
				text("VampiricMode Cooldown: Ready" +" (R)",100,160);
				}
				if(trackerModeLifeSpan > 0){
				fill(255);
				text("Tracker Cooldown: Active " + floor(trackerModeLifeSpan/60) + " Seconds",width/2,160);	
				}
				else if(trackerModeCooldown >= 0){
				fill(225);
				text("TrackerMode Cooldown: " + floor(trackerModeCooldown/60) +" (ForwardSlash)", width/2,160);	
				}	
				else if(trackerModeCooldown < 0){
				fill(255);	
				text("TrackerMode Cooldown: Ready" +" (ForwardSlash)",width/2,160);
				}
			  // Update Cooldowns
				sneakAttackCooldown -= 1;
				if(dashLifeSpan <=0){
					dashCooldown -= 1;	
				}
				if(dashLifeSpan <= 0 && player1.currentKey === "E"){
					dashCooldown = 120;
				}
				dashLifeSpan -= 1;
				if(shieldLifeSpan < 0){
					shieldCooldown -= 1;	
				}
				else if(shieldLifeSpan <= 0){
					shieldCooldown = 700;	
				}
				if(vampiricModeLifeSpan < 0){
					vampiricModeCooldown -= 1;	
				}
				else if(vampiricModeLifeSpan <= 0){
					vampiricModeCooldown = 900;
				}
				vampiricModeLifeSpan -= 1;
				if(trackerModeLifeSpan < 0){
					trackerModeCooldown -= 1;	
				}
				else if(trackerModeLifeSpan <= 0){
					trackerModeCooldown = 900;
				}
				trackerModeLifeSpan -= 1;
				shieldLifeSpan -= 1;	
				healCooldown -= 1;
				noStroke();
				fill(0);
				text("Player 1 Health: " + floor(player1.health),0,35);
				text("Player 2 Health: " + floor(player2.health),width/2,35);
				if(player1.health <= 0){
					background(52);
					textSize(100);
					fill(255);
					text("Player 2 Wins!",width/2 - width/4,height/2);
					passiveHealthRegen = 0;
				}
				else if(player2.health <= 0){
					background(52);
					textSize(100);
					fill(255);
					text("Player 1 Wins!",width/2 - width/4,height/2);
					passiveHealthRegen = 0;
				}
		}
			else if(showControls === "True"){	
			background(135,206,235);	
			}
			else{
			imageMode(CENTER);
			textSize(width/40);
			fill(255);
			if(showTitle === 1){
				image(titleScreen,width/2,height/2);
				text("Designed and Developed By Abhik Ray",0,height);
			}
			else if(showTitle ===2){
				image(titleScreenPlay,width/2,height/2);
				text("Designed and Developed By Abhik Ray",0,height);
			}
			else if(showTitle === 3){
				image(titleScreenControls,width/2,height/2);
				text("Designed and Developed By Abhik Ray",0,height);
			}
			else if(showTitle ===4){
				image(controlScreen,width/2,height/2);
			}
					}


	}
