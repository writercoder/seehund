import { addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import grommetDecorator from './grommetDecorator'

addDecorator(StoryRouter())
addDecorator(grommetDecorator)
