//Zoinks Scoob
//I only reached 20 percent power in this one
//Polished up some of his movements to be less janky
let mic = 0;
let miclevel = 0;
let reachfullpower = false;
// let powerlevelx = 20;
// let powerlevely = 20;
let myshaggy = new wholeshaggy(1.2, 0);
let myshaggy2 = new wholeshaggy(0.5, 0);
let myshaggy3 = new wholeshaggy(0.7, 0);
let dismiss = false;
let dismisswhite = 255;
let dismissblack = 220;
let gesturereceived = false;
let consentbutton, consenttext, consentbutton_actual;

function setup() {

    createCanvas(400, 400);
    //Degrees are a little easier to understand for me than that radian stuff
    angleMode(DEGREES);
    consentbutton = createButton('I Consent');
    consentbutton.id("consent_button");
    consentbutton.class('consent_button');
    // consentbutton.mousePressed(give_consent);
    consentbutton.position(0, 100);

    consentbutton_actual = document.getElementById("consent_button");
    consentbutton_actual.addEventListener("click", give_consent);

    consenttext = createP('Zoinks needs access to your mic.')
    consenttext.class('consent_text');
    consenttext.position(0, 20);
}

function draw() {
    if (gesturereceived) {
        background(random(0, 50), random(31, 70), map(miclevel, 0.02, 0.95, 50, 170));

    if(mouseX >= 300 && mouseX <= 400 && mouseY >= 350 && mouseY <= 400) {
        reachfullpower = true;
        myshaggy.setfullpower(true);
        myshaggy2.setfullpower(true);
        myshaggy3.setfullpower(true);
    } else {
        reachfullpower = false;
        myshaggy.setfullpower(false);
        myshaggy2.setfullpower(false);
        myshaggy3.setfullpower(false);
    }

    if(miclevel >= 0.3) {
        console.log("Squeeze Shaggies Head");
    }
    //console.log(miclevel);
    myshaggy3.move(-10, 200);
    myshaggy3.drawme();
    myshaggy3.inject_mic(miclevel);

    miclevel = mic.getLevel();
    myshaggy.drawme();
    myshaggy.inject_mic(miclevel);
    
    myshaggy2.move(300, 50);
    myshaggy2.drawme();
    myshaggy2.inject_mic(miclevel);

    if(keyIsDown(88)) {
        myshaggy.pulsate("forward");
        myshaggy2.pulsate("reverse");
        myshaggy3.pulsate("reverse");
    }

    push();
        if(reachfullpower) {
            fill(255);
        } else {
            fill(255, 0, 0);
        }

        noStroke();
        rect(300, 350, 100, 50);

        if(reachfullpower) {
            fill(0);
        } else {
            fill(255);
        }

        textFont('Arial');
        textSize(14);
        textStyle(NORMAL);
        text('Zoinks', 332, 380);
        pop();
        push();
        if(dismiss == true) {
            if(dismissblack >= 0) {
                dismissblack -= 5;
            }

            if(dismisswhite >= 0) {
                dismisswhite -= 5;
            }
        }
        fill(0, 0, 0, dismissblack);
        stroke(255, 255, 255, dismisswhite);
        strokeWeight(1);
        rect(width / 2 - 100, height / 2 - 25, 200, 50, 10);
        fill(255, 255, 255, dismisswhite);
        noStroke();
        textFont('Arial');
        textSize(14);
        textStyle(NORMAL);
        text('X For Pulsate', width / 2 - 40, height / 2 + 2);
        pop();
    } else {
        background(0);
    }

}

function give_consent() {
    gesturereceived = true;
    consentbutton.class("hide_button");
    consenttext.class("hide_button");
    setTimeout(function(){dismiss = true}, 3000);

    mic = new p5.AudioIn();
    mic.start();
}