import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';

const defaultTheme: ThemeInterface = {
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
        fontSize: '1.85714em',
        fontWeight: ({ typography }) => typography.headings.fontWeight,
      },
      h2: {
        fontSize: '1.57143em',
        fontWeight: ({ typography }) => typography.headings.fontWeight,
      },
      h3: {
        fontSize: '1.27em',
        fontWeight: ({ typography }) => typography.headings.h2.fontWeight,
      },
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '12px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      backgroundColor: 'rgba(38, 50, 56, 0.4)',
      selected: {
        background: 'rgba(128, 203, 196, 0.2)',
      },
      colors: {
        main: '#EEFFFF',
        attribute: '#C792EA',
        atom: '#F78C6C',
        bracket: '#997',
        builtin: '#FFCB6B',
        comment: '#546E7A',
        def: '#82AAFF',
        meta: '#FFCB6B',
        number: '#FF5370',
        keyword: '#C792EA',
        operator: '#89DDFF',
        property: '#C792EA',
        qualifier: '#DECB6B',
        string: '#C3E88D',
        string2: '#f07178',
        tag: '#FF5370',
        type: '#DECB6B',
        variable: '#f07178',
        variable2: '#EEFFFF'
      },
      guttermarker: {
        color: '#546E7A',
      },
      cursor: {
        color: '#FFCC00',
      }
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
    width: '260px',
    backgroundColor: '#fafafa',
    textColor: '#333333',
    activeTextColor: (theme) =>
      theme.sidebar.textColor !== defaultTheme.sidebar!.textColor
        ? theme.sidebar.textColor
        : theme.colors.primary.main,
    groupItems: {
      backgroundColor: 'transparent',
      color: ({ sidebar }) => sidebar.textColor,
      fontSize: '0.8em',
      fontWeight: 'inherit',
      opacity: '0.7',
      active: {
        color: ({ sidebar }) => sidebar.groupItems.color,
        backgroundColor: ({ sidebar }) => sidebar.backgroundColor
      },
      hover: {
        color: ({ sidebar }) => sidebar.groupItems.color,
        backgroundColor: ({ sidebar }) => sidebar.groupItems.backgroundColor
      },
      textTransform: 'uppercase',
      arrow: {
        size: ({ sidebar }) => sidebar.arrow.size,
        color: ({ sidebar }) => sidebar.arrow.color
      },
    },
    level1Items: {
      backgroundColor: 'transparent',
      color: ({ sidebar }) => sidebar.groupItems.color,
      fontSize: '0.929em',
      fontWeight: 'inherit',
      opacity: '1',
      active: {
        color: ({ sidebar }) => sidebar.activeTextColor,
        backgroundColor: (theme) => darken(0.05, theme.sidebar.backgroundColor)
      },
      hover: {
        color: ({ sidebar }) => sidebar.activeTextColor,
        backgroundColor: ({ sidebar }) => sidebar.level1Items.active.backgroundColor
      },
      textTransform: 'none',
      arrow: {
        size: ({ sidebar }) => sidebar.arrow.size,
        color: ({ sidebar }) => sidebar.arrow.color
      },
    },
    level2Items: {
      backgroundColor: 'transparent',
      color: ({ sidebar }) => sidebar.textColor,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      opacity: '1',
      active: {
        color: ({ sidebar }) => sidebar.level2Items.color,
        backgroundColor: (theme) => darken(0.1, theme.sidebar.backgroundColor)
      },
      hover: {
        color: ({ sidebar }) => sidebar.level2Items.color,
        backgroundColor: ({ sidebar }) => sidebar.level2Items.active.backgroundColor
      },
      textTransform: 'none',
      arrow: {
        size: ({ sidebar }) => sidebar.arrow.size,
        color: ({ sidebar }) => sidebar.arrow.color
      },
    },
    arrow: {
      size: '1.5em',
      color: '#000000'
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
    textColor: '#ffffff'
  },
  codeBlock: {
    fontSize: ({typography}) => typography.code.fontSize,
    fontFamily: ({typography}) => typography.code.fontFamily,
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
    border:{
      radius: '5px',
    },
    colors: {
      symbol: ({rightPanel}) => rightPanel.textColor,
      property: ({codeBlock}) => codeBlock.colors.symbol,
      string: '#a0fbaa',
      boolean: '#e64441',
      number: '#4a8bb3'
    }
  },
  border: {
    radius: '2px',
  },
  dropdown: {
    color: '#263238',
    focus: {
      boxShadow: `0px 0px 0px 1px ${(props) => props.theme.colors.primary.main}`
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
  fontSize: string;
  fontWeight: string;
  opacity: string;
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
      selected: {
        background: string
      };
      colors: {
        main: string,
        attribute: string;
        atom: string;
        bracket: string;
        builtin: string;
        comment: string;
        def: string;
        meta: string;
        number: string;
        keyword: string;
        operator: string;
        property: string;
        qualifier: string;
        string: string;
        string2: string;
        tag: string;
        type: string;
        variable: string;
        variable2: string;
      };
      guttermarker: {
        color: string;
      };
      cursor: {
        color: string;
      };
      wrap: boolean;
    };
    headings: {
      fontFamily: string;
      fontWeight: string;
      h1: {
        fontSize: string;
        fontWeight: string;
      };
      h2: {
        fontSize: string;
        fontWeight: string;
      };
      h3: {
        fontSize: string;
        fontWeight: string;
      };
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
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
    groupItems: SidebarItemSetttings;
    level1Items: SidebarItemSetttings;
    level2Items: SidebarItemSetttings;
    arrow: {
      size: string;
      color: string;
    };
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
    fontSize: string;
    fontFamily: string;
    border: {
      radius: string;
    };
    colors: {
      symbol: string;
      property: string;
      string: string;
      boolean: string;
      number: string;
    };
  };
  border: {
    radius: string;
  };
  dropdown: {
    color: string;
    focus: {
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
