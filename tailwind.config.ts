import type { Config } from 'tailwindcss'
const withMT = require("@material-tailwind/react/utils/withMT");
const config: Config = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      
      'tablet': {'max': '959px'},
      // => @media (min-width: 640px) { ... }
    },
  },
rippleui :{
  removeThemes :[
  "white", "whateverTheme"
  ]
},
  plugins: [
  require("rippleui")
  ],
})
export default config
