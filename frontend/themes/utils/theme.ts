import { themes } from '../index';
import { IMappedTheme, ITheme } from './extend';

export const mapTheme = (variables: ITheme): IMappedTheme => ({
  '--color-primary': variables.primary || '',
  '--color-secondary': variables.secondary || '',
  '--color-tertiary': variables.tertiary || '',
});

export const applyTheme = (theme: string): void => {
  const themeObject: IMappedTheme = mapTheme(themes[theme]);
  if (!themeObject) return;

  const root = document.documentElement;

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return;
    }

    root.style.setProperty(property, themeObject[property]);
  });
};
