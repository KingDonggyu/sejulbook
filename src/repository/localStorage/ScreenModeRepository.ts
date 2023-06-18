import LocalStorage from '../../lib/LocalStorage';

class ScreenModeRepository extends LocalStorage<string> {
  private state = {
    dark: 'Y',
    light: 'N',
  };

  constructor() {
    super('SEJULBOOL_DARK');
  }

  checkIsDarkMode() {
    const data = this.get();
    return data && data === this.state.dark;
  }

  setLightMode() {
    this.set(this.state.light);
  }

  setDarkMode() {
    this.set(this.state.dark);
  }
}

export default ScreenModeRepository;
