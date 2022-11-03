import { reactive } from './source/reactive.js';

const [state, hydrate] = reactive({
  name: 'Andrei',
});

window.state = state;

hydrate();
hydrate();
