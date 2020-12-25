import { createMuiTheme } from '@material-ui/core';
import { common, grey } from '@material-ui/core/colors';

// Theme
export const PRIMARY_MAIN_COLOR = '#1f4fae';
export const PRIMARY_LIGHT_COLOR = '#5e7ae1';
export const PRIMARY_DARK_COLOR = '#0C2A6A';
export const PRIMARY_CONTRAST_TEXT = '#ffffff';
export const SECONDARY_MAIN_COLOR = '#88d79e';
export const SECONDARY_LIGHT_COLOR = '#91f9aa';
export const SECONDARY_DARK_COLOR = '#26944d';
export const SECONDARY_CONTRAST_TEXT = '#000000';
export const BACKGROUND_DEFAULT_COLOR = '#ffffff';
export const BACKGROUND_PAPER_COLOR = '#ffffff';
export const ERROR_MAIN_COLOR = '#B00020';
export const ERROR_CONTRAST_TEXT = '#ffffff';
export const OUTLINED_BUTTON_HOVER_BACKGROUND = '#e4eaf5';
export const PAGE_BACKGROUND_COLOR = '#f9f9f9';
export const SCROLLBAR_THUMB_COLOR = '#E0E0E0';

export const AppTheme = createMuiTheme({
	palette: {
		primary: {
			light: PRIMARY_LIGHT_COLOR,
			main: PRIMARY_MAIN_COLOR,
			dark: PRIMARY_DARK_COLOR,
			contrastText: PRIMARY_CONTRAST_TEXT
		},
		secondary: {
			light: SECONDARY_LIGHT_COLOR,
			main: SECONDARY_MAIN_COLOR,
			dark: SECONDARY_DARK_COLOR,
			contrastText: SECONDARY_CONTRAST_TEXT
		},
		background: {
			paper: BACKGROUND_PAPER_COLOR,
			default: BACKGROUND_DEFAULT_COLOR
		},
		error: {
			main: ERROR_MAIN_COLOR,
			contrastText: ERROR_CONTRAST_TEXT
		}
	},
	typography: {
		fontFamily: [
			'Roboto',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'"Fira Sans"',
			'"Droid Sans"',
			'"Helvetica Neue"',
			'sans-serif'
		].join(','),
		htmlFontSize: 16,
		h1: {
			fontSize: '3.75rem',
			lineHeight: '4.5rem',
			fontWeight: 300,
			fontStyle: 'normal',
			letterSpacing: '-0.03125rem'
		},
		h2: {
			fontSize: '3rem',
			lineHeight: '3.5rem',
			fontWeight: 400,
			fontStyle: 'normal'
		},
		h3: {
			fontSize: '2.125rem',
			lineHeight: '2.25rem',
			fontWeight: 400,
			fontStyle: 'normal'
		},
		h4: {
			fontSize: '1.75rem',
			fontWeight: 500,
			fontStyle: 'normal',
			letterSpacing: '0.01125rem'
		},
		h5: {
			fontSize: '1.25rem',
			lineHeight: '1.5rem',
			fontWeight: 500,
			fontStyle: 'normal',
			letterSpacing: '0.009375rem'
		},
		h6: {
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: 500,
			fontStyle: 'normal',
			letterSpacing: '0.009375rem'
		},
		subtitle1: {
			fontSize: '1rem',
			lineHeight: '1.5rem',
			fontWeight: 400,
			fontStyle: 'normal',
			letterSpacing: '0.009375rem'
		},
		subtitle2: {
			fontSize: '0.875rem',
			lineHeight: '1.125rem',
			fontWeight: 500,
			fontStyle: 'normal',
			letterSpacing: '0.00625rem'
		},
		body1: {
			fontSize: '1rem',
			lineHeight: '1.5rem',
			fontWeight: 400,
			fontStyle: 'normal',
			letterSpacing: '0.03125rem'
		},
		body2: {
			fontSize: '0.875rem',
			lineHeight: '1.25rem',
			fontWeight: 400,
			fontStyle: 'normal',
			letterSpacing: '0.015625rem'
		},
		button: {
			fontSize: '0.875rem',
			lineHeight: '1rem',
			fontWeight: 500,
			fontStyle: 'normal',
			letterSpacing: '0.078125rem',
			textTransform: 'uppercase'
		},
		caption: {
			fontSize: '0.75rem',
			lineHeight: '1rem',
			fontWeight: 400,
			fontStyle: 'normal',
			letterSpacing: '0.025rem'
		},
		overline: {
			fontSize: '0.625rem',
			lineHeight: '1rem',
			fontWeight: 500,
			fontStyle: 'normal',
			letterSpacing: '0.09375rem',
			textTransform: 'uppercase'
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'*': {
					boxSizing: 'border-box'
				},
				'html, #root': {
					width: '100%',
					height: '100%'
				},
				body: {
					width: '100%',
					height: '100%',
					margin: 0,
					fontSize: '16px',
					backgroundColor: PAGE_BACKGROUND_COLOR,
					'-webkit-font-smoothing': 'antialiased',
					'-moz-osx-font-smoothing': 'grayscale'
				},
				'::-webkit-scrollbar': {
					width: 6,
					height: 6
				},
				'::-webkit-scrollbar-track': {
					background: 'transparent'
				},
				'::-webkit-scrollbar-thumb': {
					borderRadius: 20,
					background: SCROLLBAR_THUMB_COLOR
				}
			}
		},
		MuiButton: {
			outlinedPrimary: {
				backgroundColor: common.white,
				borderColor: grey['400'],
				'&:hover': {
					backgroundColor: OUTLINED_BUTTON_HOVER_BACKGROUND,
				},
				'&$disabled': {
					backgroundColor: 'rgba(0,0,0,0.12)'
				}
			}
		},
		MuiDialogContent: {
			dividers: {
				paddingTop: '32px',
				paddingBottom: '32px',
			}
		},
		MuiAccordion: {
			root: {
				boxShadow: 'none',
				'&:before': {
					display: 'none'
				},
				'&$expanded': {
					margin: null
				}
			}
		},
		MuiAccordionSummary: {
			root: {
				'&$expanded': {
					minHeight: null
				}
			},
			content: {
				margin: '16px 0',
				'&$expanded': {
					margin: null
				}
			}
		},
		MuiAccordionDetails: {
			root: {
				padding: 0
			}
		}
	},
	props: {
		MuiCircularProgress: {
			thickness: 4,
			size: 24,
			color: 'secondary'
		}
	}
});
