import axios from 'axios';

import RotText from '../RotText.jsx';

export default class MPDStatusText extends RotText {
  constructor(endpoint, icon) {
    super();

    this.endpoint = endpoint;
    this.currentTrack = "";
    this.icon = icon;

    this.update();
  }

  getText() {
    return "Now playing: " + this.currentTrack;
  }

  getIcon() {
    return this.icon;
  }

  update(callback) {
    axios.get(this.endpoint).then(({data}) => {
      var currentTrack = data.response.currentsong.title || undefined;
      var isPlaying = data.response.status.state === "play";

      currentTrack = currentTrack.replace(/ *\[[^\]]*\] */g, "");
      this.currentTrack = currentTrack;

      if(callback) callback();
    }).catch(error => {
      console.log(error);
      
      if(callback) callback();
    });
  }
}
