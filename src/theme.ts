import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';

let defaultTheme: ThemeInterface = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    small: '50rem',
    medium: '75rem',
    large: '105rem',
  },
  colors: {
    tonalOffset: 0.2,
    primary: {
      main: '#32329f',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    secondary: {
      main: 'black'
    },
    success: {
      main: '#1d8127',
      light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    warning: {
      main: '#ffa500',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    error: {
      main: '#d41f1c',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
    },
    border: {
      dark: 'rgba(0,0,0, 0.1)',
      light: '#ffffff',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.success.main),
        tabTextColor: ({ colors }) => colors.responses.success.color,
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.error.main),
        tabTextColor: ({ colors }) => colors.responses.error.color,
      },
      redirect: {
        color: ({ colors }) => colors.warning.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
        tabTextColor: ({ colors }) => colors.responses.redirect.color,
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
        tabTextColor: ({ colors }) => colors.responses.info.color,
      },
    },
    http: {
      get: '#2F8132',
      post: '#186FAF',
      put: '#95507c',
      options: '#947014',
      patch: '#bf581d',
      delete: '#cc3333',
      basic: '#707070',
      link: '#07818F',
      head: '#A23DAD',
      pub: '#186FAF',
      sub: '#2F8132',
    },
  },
  schema: {
    linesColor: (theme) =>
      lighten(
        theme.colors.tonalOffset,
        desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
      ),
    defaultDetailsWidth: '75%',
    typeNameColor: (theme) => theme.colors.text.secondary,
    typeTitleColor: (theme) => theme.schema.typeNameColor,
    requireLabelColor: (theme) => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    nestedBackground: '#fafafa',
    arrow: {
      size: '1.1em',
      color: (theme) => theme.colors.text.secondary,
    },
  },
  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily: 'Roboto, sans-serif',
    smoothing: 'antialiased',
    optimizeSpeed: true,
    headings: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '400',
      h1: {
        fontWeight: ({ typography }) => typography.headings.fontWeight,
      },
      h2: {
        fontWeight: ({ typography }) => typography.headings.fontWeight,
      },
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '13px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#e53935',
      backgroundColor: 'rgba(38, 50, 56, 0.05)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.primary.main,
      textDecoration: 'none',
      visited: ({ typography }) => typography.links.color,
      hover: {
        color: ({ typography }) => lighten(0.2, typography.links.color),
        textDecoration: 'none currentcolor solid'
      }
    },
  },
  sidebar: {   
    fontSize: '0.8em',
    fontWeight: '600',
    padding: '12.5px',
    opacity: '0.7',
    level0Items: {
      backgroundColor: '#fafafa',
      color: '#000000',
      active: {
        color: '#000000',
        backgroundColor: '#fafafa'
      },
      hover: {
        color: '#000000',
        backgroundColor: '#fafafa'
      },
      textTransform: 'uppercase',
      arrow: {
        size: '1.5em',
        color: '#000000',
      },
    },
    level1Items: {
      backgroundColor: ({sidebar}) => sidebar.level0Items.backgroundColor,
      color: ({sidebar}) => sidebar.level0Items.color,
      active: {
        color: ({sidebar}) => sidebar.level0Items.active.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.active.backgroundColor
      },
      hover: {
        color: ({sidebar}) => sidebar.level0Items.hover.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.hover.backgroundColor
      },
      textTransform: ({sidebar}) => sidebar.level0Items.textTransform,
      arrow: {
        size: ({sidebar}) => sidebar.level0Items.arrow.size,
        color: ({sidebar}) => sidebar.level0Items.arrow.color
      },
    },
    level2Items: {
      backgroundColor: ({sidebar}) => sidebar.level0Items.backgroundColor,
      color: ({sidebar}) => sidebar.level0Items.color,
      active: {
        color: ({sidebar}) => sidebar.level0Items.active.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.active.backgroundColor
      },
      hover: {
        color: ({sidebar}) => sidebar.level0Items.hover.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.hover.backgroundColor
      },
      textTransform: ({sidebar}) => sidebar.level0Items.textTransform,
      arrow: {
        size: ({sidebar}) => sidebar.level0Items.arrow.size,
        color: ({sidebar}) => sidebar.level0Items.arrow.color
      },
    },
  },
  logo: {
    maxHeight: ({ sidebar }) => sidebar.width,
    maxWidth: ({ sidebar }) => sidebar.width,
    gutter: '2px',
  },
  rightPanel: {
    backgroundColor: '#263238',
    width: '40%',
    textColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
  },
  border: {
    radius: '2px',
  },
  dropdown: {
    color: '#263238',
    focus: {
      boxShadow: `0px 0px 0px 1px ${(props) => props.theme.colors.primary.main}`,
      backgroundColor: 'transparent'
    }
  },
  donwloadButton: {
    hover: {
      color: 'inherit'
    }
  },
  markdown: {
    table: {
      border: {
        color: '#ccc',
      },
      backgroundColor: 'transparent'
    }
  }
};

const payvisionTheme: ThemeInterface = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    small: '50rem',
    medium: '75rem',
    large: '105rem',
  },
  colors: {
    tonalOffset: 0.2,
    primary: {
      main: '#3237be',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    secondary: {
      main: '#007364'
    },
    success: {
      main: '#00cd78',
      light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    warning: {
      main: '#ffc882',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    error: {
      main: '#be3c50',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
    },
    border: {
      dark: 'rgba(0,0,0, 0.1)',
      light: '#ffffff',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.success.main),
        tabTextColor: ({ colors }) => colors.responses.success.color,
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.error.main),
        tabTextColor: ({ colors }) => colors.responses.error.color,
      },
      redirect: {
        color: ({ colors }) => colors.warning.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
        tabTextColor: ({ colors }) => colors.responses.redirect.color,
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
        tabTextColor: ({ colors }) => colors.responses.info.color,
      },
    },
    http: {
      get: '#ffc882',
      post: '#af9bff',
      put: '#95507c',
      options: '#c8ffe1',
      patch: '#ff7d6e',
      delete: '#be3c50',
      basic: '#465a64',
      link: '#00cd78',
      head: '#b9dcff',
      pub: '#3237be',
      sub: '#007364',
    },
  },
  schema: {
    linesColor: (theme) =>
      lighten(
        theme.colors.tonalOffset,
        desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
      ),
    defaultDetailsWidth: '75%',
    typeNameColor: (theme) => theme.colors.text.secondary,
    typeTitleColor: (theme) => theme.schema.typeNameColor,
    requireLabelColor: (theme) => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    nestedBackground: '#f6f8fa',
    arrow: {
      size: '1.1em',
      color: (theme) => theme.colors.text.secondary,
    },
  },
  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily: 'Founders, sans-serif',
    smoothing: 'antialiased',
    optimizeSpeed: true,
    headings: {
      fontFamily: 'Founders, sans-serif',
      fontWeight: '300',
      h2: {
        fontWeight: '600',
      },
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '14px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#be3c50',
      backgroundColor: 'rgba(38, 50, 56, 0.05)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.secondary.main,
      textDecoration: 'underline',
      visited: '#af9bff',
      hover: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
  },
  sidebar: {
    fontSize: '14px',
    fontWeight: '600',
    padding: '10px',
    width: '260px',
    opacity: '1',
    level0Items: {
      backgroundColor: 'white',
      color: '#FF7D6E',
      active: {
        color: ({sidebar}) => sidebar.level0Items.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.backgroundColor
      },
      hover: {
        color: ({sidebar}) => sidebar.level0Items.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.backgroundColor
      },
      textTransform: 'uppercase',
      arrow: {
        size: '1.5em',
        color: ({sidebar}) => sidebar.level0Items.color,
      },
    },
    level1Items: {
      backgroundColor: ({sidebar}) => sidebar.level0Items.backgroundColor,
      color: ({sidebar}) => sidebar.level0Items.color,
      active: {
        color: ({sidebar}) => sidebar.level0Items.active.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.active.backgroundColor
      },
      hover: {
        color: ({sidebar}) => sidebar.level0Items.hover.color,
        backgroundColor: ({sidebar}) => sidebar.level0Items.hover.backgroundColor
      },
      textTransform: 'uppercase',
      arrow: {
        size: ({sidebar}) => sidebar.level0Items.arrow.size,
        color: ({sidebar}) => sidebar.level0Items.arrow.color
      },
    },
    level2Items: {
      backgroundColor: ({sidebar}) => sidebar.level0Items.backgroundColor,
      color: '#465a64',
      active: {
        color: 'white',
        backgroundColor: (theme) => theme.colors.primary.main
      },
      hover: {
        color: '#000000',
        backgroundColor: '#f2f2e9'
      },
      textTransform: 'none',
      arrow: {
        size: ({sidebar}) => sidebar.level1Items.arrow.size,
        color: (theme) => theme.sidebar.level2Items.color,
      },
    },
  },
  logo: {
    maxHeight: ({ sidebar }) => sidebar.width,
    maxWidth: ({ sidebar }) => sidebar.width,
    gutter: '2px',
  },
  rightPanel: {
    backgroundColor: '#263238',
    width: '40%',
    textColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
  },
  border: {
    radius: '0',
  },
  dropdown: {
    color: (theme) => theme.colors.primary.main,
    focus: {
      boxShadow: `0px 0px 0px 0px ${(props) => props.theme.colors.primary.main}`,
      backgroundColor: '#b9dcff'
    }
  },
  donwloadButton: {
    hover: {
      color: '#b9dcff'
    }
  },
  markdown: {
    table: {
      border: {
        color: '#e5e7ea',
      },
      backgroundColor: '#f6f8fa'
    }
  }
};

console.log('theme', payvisionTheme);
defaultTheme = payvisionTheme;

export default defaultTheme;

export function resolveTheme(theme: ThemeInterface): ResolvedThemeInterface {
  const resolvedValues = {};
  let counter = 0;
  const setProxy = (obj, path: string) => {
    Object.keys(obj).forEach((k) => {
      const currentPath = (path ? path + '.' : '') + k;
      const val = obj[k];
      if (typeof val === 'function') {
        Object.defineProperty(obj, k, {
          get() {
            if (!resolvedValues[currentPath]) {
              counter++;
              if (counter > 1000) {
                throw new Error(
                  `Theme probably contains circular dependency at ${currentPath}: ${val.toString()}`,
                );
              }

              resolvedValues[currentPath] = val(theme);
            }
            return resolvedValues[currentPath];
          },
          enumerable: true,
        });
      } else if (typeof val === 'object') {
        setProxy(val, currentPath);
      }
    });
  };

  setProxy(theme, '');
  return JSON.parse(JSON.stringify(theme));
}

export interface ColorSetting {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface HTTPResponseColos {
  color: string;
  backgroundColor: string;
  tabTextColor: string;
}

export interface FontSettings {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  lineHeight: string;
  color: string;
}

export interface SidebarItemSetttings {
  backgroundColor: string;
  color: string;
  active: {
    backgroundColor: string;
    color: string;
  };
  hover: {
    backgroundColor: string;
    color: string;
  };
  textTransform: string;
  arrow: {
    size: string;
    color: string;
  };
}

export interface ResolvedThemeInterface {
  spacing: {
    unit: number;
    sectionHorizontal: number;
    sectionVertical: number;
  };
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
  colors: {
    tonalOffset: number;
    primary: ColorSetting;
    secondary: ColorSetting;
    success: ColorSetting;
    warning: ColorSetting;
    error: ColorSetting;
    gray: {
      50: string;
      100: string;
    };
    border: {
      light: string;
      dark: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    responses: {
      success: HTTPResponseColos;
      error: HTTPResponseColos;
      redirect: HTTPResponseColos;
      info: HTTPResponseColos;
    };
    http: {
      get: string;
      post: string;
      put: string;
      options: string;
      patch: string;
      delete: string;
      basic: string;
      link: string;
      head: string;
      pub: string;
      sub: string;
    };
  };
  schema: {
    linesColor: string;
    defaultDetailsWidth: string;
    typeNameColor: string;
    typeTitleColor: string;
    requireLabelColor: string;
    labelsTextSize: string;
    nestingSpacing: string;
    nestedBackground: string;
    arrow: {
      size: string;
      color: string;
    };
  };
  typography: {
    fontSize: string;
    lineHeight: string;
    fontWeightLight: string;
    fontWeightRegular: string;
    fontWeightBold: string;
    fontFamily: string;

    smoothing: string;
    optimizeSpeed: boolean;

    code: FontSettings & {
      backgroundColor: string;
      wrap: boolean;
    };
    headings: {
      fontFamily: string;
      fontWeight: string;
      h1: {
        fontWeight: string;
      }
      h2: {
        fontWeight: string;
      }
      lineHeight: string;
    };
    links: {
      color: string;
      textDecoration: string;
      visited: string;
      hover: {
        color: string;
        textDecoration: string;
      }
    };
  };
  sidebar: {
    width: string;
    fontSize: string;
    fontWeight: string;
    padding: string;
    opacity: string;
    level0Items: SidebarItemSetttings;
    level1Items: SidebarItemSetttings;
    level2Items: SidebarItemSetttings;
  };
  logo: {
    maxHeight: string;
    maxWidth: string;
    gutter: string;
  };
  rightPanel: {
    backgroundColor: string;
    textColor: string;
    width: string;
  };
  codeBlock: {
    backgroundColor: string;
  };
  border: {
    radius: string;
  };
  dropdown: {
    color: string;
    focus: {
      backgroundColor: string;
      boxShadow: string;
    }
  };
  donwloadButton: {
    hover: {
      color: string
    };
  };
  markdown: {
    table: {
      border: {
        color: string;
      };
      backgroundColor: string;
    }
  }

  extensionsHook?: (name: string, props: any) => string;
}

export type primitive = string | number | boolean | undefined | null;
export type AdvancedThemeDeep<T> = T extends primitive
  ? T | ((theme: ResolvedThemeInterface) => T)
  : AdvancedThemeObject<T>;
export type AdvancedThemeObject<T> = { [P in keyof T]?: AdvancedThemeDeep<T[P]> };
export type ThemeInterface = AdvancedThemeObject<ResolvedThemeInterface>;
