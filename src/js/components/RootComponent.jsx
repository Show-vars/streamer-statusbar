import React from 'react';

import SimpleText from '../texts/SimpleText.jsx';
import MPDStatusText from '../texts/MPDStatusText.jsx';

const translateX = (el, x) => el.style.transform = "translateX(" + x + "px)";
const scaleX = (el, x) => el.style.transform = "scaleX(" + x + "px)";
const opacity = (el, o) => el.style.opacity = o;
const boundf = (min, max, x) => x > max ? max : x < min ? min : x;

export default class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.rotateText = this.rotateText.bind(this);
    this.timeoutId = 0;
    this.delay = 8000;

    this.rotateArray = [
      new SimpleText("Thanks for watching!", "fa-thumbs-up"),
      new SimpleText("Don't forget to subscribe", "fa-heart"),
      new MPDStatusText("http://192.168.1.10:8080/status", "fa-music")
    ];

    this.state = {
      rotateIndex: 0
    }
  }

  componentDidMount() {
    this.timeoutId = setTimeout(this.rotateText, this.delay);
  }

  componentWillUnmount() {
    if(this.timeoutId) clearTimeout(this.timeoutId);
  }

  rotateText() {
    this.state.rotateIndex = (this.state.rotateIndex + 1) % this.rotateArray.length;
    const currentText = this.rotateArray[this.state.rotateIndex];

    this.refs.text.setText(currentText, () => {
      this.timeoutId = setTimeout(this.rotateText, this.delay);
    });
  }

  render() {
    const currentText = this.rotateArray[this.state.rotateIndex];

    return (
      <div className="root-container">
        <FloatingText ref="text" text={currentText}/>
      </div>
    )
  }
}

class FloatingText extends React.Component {
  constructor(props){
    super(props);

    this.drawAnimation = this.drawAnimation.bind(this);
    this.resetAnimation = this.resetAnimation.bind(this);
    this.setText = this.setText.bind(this);
    this.updateText = this.updateText.bind(this);

    this.animation = new Animation(this.drawAnimation);
    this.time = 0;
    this.animationState = 3; // 0 - fade in text, 1 - splide text, 2 - fade out text, 3 - fade in all, 4 - fade out all, 5 - wait fade out, 6 - wait slide text

    this.currentText = this.props.text;
  }

  componentDidMount() {
    this.animation.start();

    this.updateText();

    this.intervalId = setInterval(this.rotateText, 4000);
  }

  componentWillUnmount() {
    this.animation.stop();
  }

  drawAnimation(dt, t) {
    if(this.animationState === 0) {
      const op = this.time * 4;

      opacity(this.refs.text, boundf(0, 1, op));

      if(op >= 1) {
        opacity(this.refs.text, 1);
        this.animationState = 6;
        this.time = 0;
      }
    } else if(this.animationState === 1) {
      const box = this.refs.box.getBoundingClientRect();
      const txt = this.refs.text.getBoundingClientRect();

      if(box.width >= txt.width) {
        this.time = 0;
        translateX(this.refs.text, 0);
      } else if(box.left >= txt.right) {
        opacity(this.refs.text, 0);
        translateX(this.refs.text, 0);
        this.animationState = 0;
        this.time = 0;
      } else if(box.right > txt.right) {
        this.animationState = 5;
        this.time = 0;
      } else {
        translateX(this.refs.text, -this.time * 40);
      }
    } else if(this.animationState === 2) {
      const op = 1 - this.time * 4;

      opacity(this.refs.text, boundf(0, 1, op));

      if(op <= 0) {
        opacity(this.refs.text, 0);
        translateX(this.refs.text, 0);

        this.animationState = 0;
        this.time = 0;
      }
    } else if(this.animationState === 3) {
      const op = this.time * 4;

      opacity(this.refs.text, boundf(0, 1, op));
      opacity(this.refs.icon, boundf(0, 1, op));

      if(op >= 1) {
        opacity(this.refs.text, 1);
        opacity(this.refs.icon, 1);
        this.animationState = 1;
        this.time = 0;
      }
    } else if(this.animationState === 4) {
      const op = 1 - this.time * 4;

      opacity(this.refs.text, boundf(0, 1, op));
      opacity(this.refs.icon, boundf(0, 1, op));

      if(op <= 0) {
        opacity(this.refs.text, 0);
        opacity(this.refs.icon, 0);
        translateX(this.refs.text, 0);

        this.updateText();
        this.animationState = 3;
        this.time = 0;
      }
    } else if(this.animationState === 5) {
      if(this.time > 1) {
        this.animationState = 2;
        this.time = 0;
      }
    } else if(this.animationState === 6) {
      if(this.time > 1) {
        this.animationState = 1;
        this.time = 0;
      }
    }

    this.time += dt;
  }

  resetAnimation() {
    opacity(this.refs.text, 1);
    this.animationState = 4;
    this.time = 0;
  }

  setText(text, callback) {
    this.currentText = text;
    this.currentText.update(() => {
      this.resetAnimation();

      if(callback) callback();
    });
  }

  updateText() {
    this.refs.text.innerHTML = this.currentText.getText();
    this.refs.icon.className = "fas " + this.currentText.getIcon();
  }

  render() {
    return (
      <div className="floating-text">
        <div className="icon">
          <i className="fas" ref="icon"></i>
        </div>
        <div className="text" ref="box">
          <span ref="text"></span>
        </div>
      </div>
    )
  }
}

class Animation {
  constructor(drawcb) {
    this.drawcb = drawcb;
    this.enabled = false;
    this.lastt = 0;

    this.draw = this.draw.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  draw(t) {
    const newt = t / 1000;

    this.drawcb(newt - this.lastt, t);

    this.lastt = newt;

    if (this.enabled) {
      requestAnimationFrame(this.draw);
    }
  }

  start() {
    this.enabled = true;
    requestAnimationFrame(this.draw);
  }


  stop() {
    this.enabled = false;
  }
}
