/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'
import '../uikit/styles/pkit.scss'
import '@assets/fonts/material-design/material-design.min.css'
import '@assets/fonts/web-icons/web-icons.min.css'

const req = require.context('../uikit', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
