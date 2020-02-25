class wholeshaggy {

    constructor(scaletarget, mictarget) {
        this.scaletarget = scaletarget;
        this.defaultscale = scaletarget;
        this.scaledirection = -1;
        this.initscale = false;
        this.initunit = 0;
        this.mictarget = mictarget;
        this.powerlevelx = 20;
        this.powerlevely = 20;
        this.mytranslatex = 0;
        this.mytranslatey = 0;
        this.reachfullpower = false;
    }

    shaggy_head(head_param) {
        let mapeyesx_1 = map(mouseX, 0, 400, 25, 35);
        let mapeyesy_1 = map(mouseY, 0, 400, 40, 50);
    
        //Head and face are sorta one in the same so making use of params here
        if(head_param == 0) {
            //Head
            push();
            fill('#d9a470');
            strokeWeight(2);
            stroke(0, 0, 0);
            ellipse(200, 200, 170, 250);
            noStroke();
            rect(120, 100, 130, 70);
            pop();
        } else if(head_param == 1) {
            //Face
            push();
            translate(map(this.mictarget, 0.02, 0.95, 0, 35), map(this.mictarget, 0.02, 0.95, 0, -35));
            rotate(map(this.mictarget, 0.02, 0.95, 0, 10));
            stroke(0, 0, 0);
            strokeWeight(5);
            strokeCap(SQUARE);
            line(125, 145, 165, 155);
            line(200, 160, 240, 150);
            pop();
    
            push();
            noStroke();
            if(this.reachfullpower == false) {
                fill(0);
                ellipse(160, 190, mapeyesx_1, mapeyesy_1);
                ellipse(220, 190, mapeyesx_1, mapeyesy_1);
            } else {
                fill(255);
                if(this.powerlevelx + 1 > 100) {
                    this.powerlevelx = 19;
                }
    
                if(this.powerlevely + 1 > 100) {
                    this.powerlevely = 19;
                }
    
                this.powerlevelx++;
                this.powerlevely++;
    
                ellipse(160, 190, this.powerlevelx, this.powerlevely);
                ellipse(220, 190, this.powerlevelx, this.powerlevely);
            }
            
            pop();
    
            push();
            stroke(0, 0, 0);
            strokeWeight(2);
            line(190, 200, 170, 235);
            line(170, 235, 205, 235);
            noFill();
            arc(190, 220, 100, 100, 360, 120);
            pop();
    
            push();
            noStroke();
            fill(0);
            triangle(200, 275, 220, 275, 210, 295)
            pop();
    
            push();
            stroke(0);
            strokeWeight(3);
            point(180, 280);
            point(190, 290);
            point(225, 285);
            point(232, 275);
            point(200, 300);
            point(215, 300);
            point(215, 300);
            point(205, 310);
            pop();
        }
    }
    
    shaggy_hair() {
        //All Hair
        this.shaggy_under_hair();
    
        //Bigger portion of hair
        push();
        noStroke();
        fill('#6b3e03');
        ellipseMode(CENTER);
        translate (width/2, height/2);
        rotate(220);
        translate(0, -10);
        arc(10, 60, 300, 200, 0, 180, PIE);
        pop();
    
        push();
        noStroke();
        fill('#6b3e03');
        arc(150, 120, 150, 150, 120, 280, PIE);
        pop();
    }
    
    shaggy_under_hair() {
        //The little brown strands under main hair
        push();
        noStroke();
        fill('#582a01')
        quad(145, 100, 160, 115, 145, 175, 115, 105);
        quad(165, 70, 180, 95, 165, 155, 135, 95);
        quad(185, 60, 200, 85, 185, 145, 155, 85);
        quad(205, 70, 220, 95, 205, 155, 175, 95);
        pop();
    }

    drawme() {
        push();
        translate(this.mytranslatex, this.mytranslatey);

        push();

        translate(-50, -20);
        scale(this.scaletarget);

        //Shaggy's Base Head
        push();
        translate(map(this.mictarget, 0.02, 0.95, 0, -5), map(this.mictarget, 0.02, 0.95, 0, -50));
        this.shaggy_head(0);
        pop();

        //Shaggy's Hair
        push();
        rotate(map(this.mictarget, 0.02, 0.95, 0, 10));
        translate(map(this.mictarget, 0.02, 0.95, 0, 30), map(this.mictarget, 0.02, 0.95, 0, -70));
        this.shaggy_hair();
        pop();
        
        //Shaggy's Completed Had With Face Drawn Last To Allow Eyebrows To Be On Top
        push();
        scale(map(this.mictarget, 0.02, 0.95, 1, 1.03), map(this.mictarget, 0.02, 0.95, 1, 0.7));
        rotate(this.mictarget * 5);
        translate(0, map(this.mictarget, 0.02, 0.95, 0, -40));
        this.shaggy_head(1);
        pop();

        pop();
        pop();
    }

    inject_mic(micparam) {
        this.mictarget = micparam;
    }

    move(myx, myy) {
        this.mytranslatex = myx;
        this.mytranslatey = myy;
    }

    pulsate(mode) {
        if (this.initscale == false) {
            this.initunit = random(0.15, 0.35);
            this.initscale = true;
        }

        if(mode == "forward") {
            if(this.scaledirection == -1) {
                if (this.scaletarget <= this.defaultscale + this.initunit) {
                    this.scaletarget += 0.01;
                } else {
                    this.scaledirection *= -1;
                }
            } else if (this.scaledirection == 1) {
                if (this.scaletarget >= this.defaultscale - this.initunit) {
                    this.scaletarget -= 0.01;
                } else {
                    this.scaledirection *= -1;
                }
            }
        } else if(mode == "reverse") {
            if(this.scaledirection == -1) {
                if (this.scaletarget >= this.defaultscale - this.initunit) {
                    this.scaletarget -= 0.01;
                } else {
                    this.scaledirection *= -1;
                }
            } else if (this.scaledirection == 1) {
                if (this.scaletarget <= this.defaultscale + this.initunit) {
                    this.scaletarget += 0.01;
                } else {
                    this.scaledirection *= -1;
                } 
            }
        }
    }

    setfullpower(powerparam) {
        this.reachfullpower = powerparam;
    }
    
}