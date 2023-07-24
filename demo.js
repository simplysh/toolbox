import { reactive } from './source/reactive.js';

const { state, hydrate, watch } = reactive({
  name: 'Andrei',
});

watch('name', (now, prev) => console.log(`Name changed from ${prev} to ${now}`));

window.state = state;

hydrate();
