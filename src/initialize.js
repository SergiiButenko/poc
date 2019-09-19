import config from 'config';
import {pocApi} from './provider';

const {endpoints: {base_url}} = config;

pocApi.setGlobalConfig({base_url});

window.poc = pocApi;
