import RotText from '../RotText.jsx';

export default class SimpleText extends RotText {
  constructor(text, icon) {
    super();

    this.text = text;
    this.icon = icon;
  }

  getText() {
    return this.text;
  }

  getIcon() {
    return this.icon;
  }
}
