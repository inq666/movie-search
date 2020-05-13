import keys from './src/data';

class KeyBoard {
  constructor() {
    this.ruUpperCase = keys.ruUpperCase;
    this.ruLowerCase = keys.ruLowerCase;
    this.engUpperCase = keys.engUpperCase;
    this.engLowerCase = keys.engLowerCase;
    this.keyCode = keys.keyCode;
    this.capsMode = false;
    this.keyboardActive = false;
    this.language = true;
    this.wrapper = document.querySelector('.wrapper');
  }

  addDomElements() {
    this.keyBoardButton = document.querySelector('.button-keyboard');
    this.capsLock = document.querySelector('.capsLock');
    this.upperCaseKey = document.querySelectorAll('.off');
    this.lowerCaseKey = document.querySelectorAll('.on');
    this.rightShift = document.querySelector('.shiftRight');
    this.leftShift = document.querySelector('.shiftLeft');
    this.rusKeys = document.querySelectorAll('.activeKeys');
    this.engKeys = document.querySelectorAll('.disableKeys');
    this.input = document.querySelector('.search');
    this.changeLanguage = document.querySelector('.language');
  }

  addKeysListener() {
    window.addEventListener('resize', () => this.reziseWindow());
    this.wrapper.addEventListener('click', (e) => this.mouseClick(e));
    this.leftShift.addEventListener('mousedown', () => this.caseUpper());
    this.rightShift.addEventListener('mousedown', () => this.caseUpper());
    this.leftShift.addEventListener('mouseup', () => this.caseLower());
    this.rightShift.addEventListener('mouseup', () => this.caseLower());
    window.addEventListener('blur', () => {
      document.querySelectorAll('.activeKeyBoard').forEach((item) => item.classList.remove('activeKeyBoard'));
    });
    this.changeLanguage.addEventListener('click', () => {
      if (this.language) {
        this.language = false;
        this.rusCase();
      } else {
        this.language = true;
        this.engCase();
      }
    });
    this.keyBoardButton.addEventListener('click', () => {
      if (this.keyboardActive) {
        this.keyboardActive = false;
        this.wrapper.style.display = 'none';
      } else {
        this.keyboardActive = true;
        this.input.focus();
        this.wrapper.style.display = 'block';
      }
    });
    this.input.addEventListener('blur', () => {
      if (this.keyboardActive) {
        this.input.focus();
      }
    });
  }

  reziseWindow() {
    const disableKeyboardWidth = 1110;
    if (document.documentElement.clientWidth < disableKeyboardWidth) {
      this.keyboardActive = false;
      this.wrapper.style.display = 'none';
    }
  }

  addVirtualKeys() {
    for (let i = 0; i < this.keyCode.length; i += 1) {
      const key = document.createElement('div');
      const classNameKey = this.keyCode[i][0].toLowerCase() + this.keyCode[i].slice(1);
      key.classList.add('key');
      key.classList.add(classNameKey);
      this.wrapper.append(key);

      const ruKey = document.createElement('div');
      ruKey.classList.add('activeKeys');
      this.wrapper.lastChild.append(ruKey);

      const engKey = document.createElement('div');
      engKey.classList.add('disableKeys');
      this.wrapper.lastChild.append(engKey);

      const ruKeyUpper = document.createElement('span');
      ruKeyUpper.classList.add('off');
      ruKeyUpper.innerHTML = this.ruUpperCase[i];
      this.wrapper.lastChild.firstChild.append(ruKeyUpper);

      const ruKeyLower = document.createElement('span');
      ruKeyLower.classList.add('on');
      ruKeyLower.innerHTML = this.ruLowerCase[i];
      this.wrapper.lastChild.firstChild.append(ruKeyLower);

      const engKeyUpper = document.createElement('span');
      engKeyUpper.classList.add('off');
      engKeyUpper.innerHTML = this.engUpperCase[i];
      this.wrapper.lastChild.lastChild.append(engKeyUpper);

      const engKeyLower = document.createElement('span');
      engKeyLower.classList.add('on');
      engKeyLower.innerHTML = this.engLowerCase[i];
      this.wrapper.lastChild.lastChild.append(engKeyLower);
    }
  }

  checkKey(str) {
    switch (str) {
      case 'Backspace':
        this.deleteSymbolPrev();
        break;
      case 'CapsLock':
        this.changeCase();
        break;
      default:
    }
  }

  mouseClick(e) {
    const target = e.target.closest('.key');
    if (!target) return;
    const targetKey = target.className.split(' ')[1];
    this.checkKey(targetKey[0].toUpperCase() + targetKey.slice(1));
    target.classList.add('active');
    setTimeout(() => target.classList.remove('active'), 500);
    const text = e.target.closest('.key').querySelector('.activeKeys').querySelector('.on').textContent;
    if (text.length > 1) return;
    this.input.value += text;
  }

  changeCase() {
    if (this.capsMode) {
      this.capsLock.style.backgroundColor = 'rgb(201, 201, 201)';
      this.capsMode = false;
      this.caseLower();
    } else {
      this.capsLock.style.backgroundColor = 'rgb(164, 164, 255)';
      this.capsMode = true;
      this.caseUpper();
    }
  }

  caseUpper() {
    this.lowerCaseKey.forEach((item) => item.classList.remove('on'));
    this.lowerCaseKey.forEach((item) => item.classList.add('off'));
    this.upperCaseKey.forEach((item) => item.classList.remove('off'));
    this.upperCaseKey.forEach((item) => item.classList.add('on'));
  }

  caseLower() {
    this.lowerCaseKey.forEach((item) => item.classList.remove('off'));
    this.lowerCaseKey.forEach((item) => item.classList.add('on'));
    this.upperCaseKey.forEach((item) => item.classList.remove('on'));
    this.upperCaseKey.forEach((item) => item.classList.add('off'));
  }

  deleteSymbolPrev() {
    const cursorNum = this.input.selectionStart;
    if (!cursorNum) return;
    const string = this.input.value;
    this.input.value = string.slice(0, cursorNum - 1) + string.slice(cursorNum, string.length);
    this.input.selectionStart = cursorNum - 1;
    this.input.selectionEnd = cursorNum - 1;
  }

  rusCase() {
    this.rusKeys.forEach((item) => item.classList.remove('disableKeys'));
    this.rusKeys.forEach((item) => item.classList.add('activeKeys'));
    this.engKeys.forEach((item) => item.classList.remove('activeKeys'));
    this.engKeys.forEach((item) => item.classList.add('disableKeys'));
  }

  engCase() {
    this.rusKeys.forEach((item) => item.classList.remove('activeKeys'));
    this.rusKeys.forEach((item) => item.classList.add('disableKeys'));
    this.engKeys.forEach((item) => item.classList.remove('disableKeys'));
    this.engKeys.forEach((item) => item.classList.add('activeKeys'));
  }
}

const virtualKeyBoard = new KeyBoard();
window.onload = () => {
  virtualKeyBoard.addVirtualKeys();
  virtualKeyBoard.addDomElements();
  virtualKeyBoard.addKeysListener();
  virtualKeyBoard.engCase();
};

export default virtualKeyBoard;
