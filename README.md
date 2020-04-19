# Svelte Persist Store
![Node.js CI](https://github.com/n0n3br/svelte-persist-store/workflows/Node.js%20CI/badge.svg)

This module makes possible to create writable and readable svelte stores that can be persisted in localStorage or sessionStorage, with or without compression. The created store will be automatically hydrated from the web storage stored value, if there's any. [lz-string](https://github.com/pieroxy/lz-string) is used for compression.

## Install

```bash
# you can use yarn
yarn add @n0n3br/svelte-persist-store
# or npm
npm install @n0n3br/svelte-persist-store
```

## Usage

```html
<!-- App.svelte -->
<script>
    import { writable, readable } from '@n0n3br/svelte-persist-store';
    import { onMount } from 'svelte';
    onMount(() => {
        const writableStore = writabe('writable', 0);
        const readableStore = readable('readable', new Date(), set => setTimeout(() => set(new Date()), 1000)));
    });
    const incrementCounter = () => writableStore.update(s => s + 1)
</script>

<main>
    <h1>The current time is {$readableStore.toLocaleString()}</h1>
    <hr />
    <h1>Counter value {$writableStore}</h1>
    <button on:click="{incrementCounter}">Increment Counter</button>
</main>
```

## API

### writable

    Creates a writable Svelte Store.
    It accetps 3 parameters, in the order presented below:

| Name         | Required | Default value                      | Description                                                            |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------- |
| name         | &#10003; |                                    | the name that will be used to persist de store state in web storage    |
| initialState | &#10003; |                                    | the initial state of the store                                         |
| options      |          | { compress: false, mode: 'local' } | an object with 2 keys, compress (boolean) and mode (local or session). |

### readable

    Creates a readable Svelte store.
    It accepts 4 parameters, in the order presented below:

| Name         | Required | Default Value                      | Description                                                                                                                                                                                                            |
| ------------ | -------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | &#10003; |                                    | the name that will be used to persist de store state in web storage                                                                                                                                                    |
| initialState | &#10003; |                                    | the initial state of the store                                                                                                                                                                                         |
| callback     | &#10003; |                                    | the callback function that will set the store value. it's the only way to update de store. the callback function receives the set function as a parameter. the set function can then be used to change the store value |
| options      |          | { compress: false, mode: 'local' } | an object with 2 keys, compress (boolean) and mode (local or session).                                                                                                                                                 |

# Tests

You can run the automated tests with the command

```bash
# you can use yarn
yarn test
# or npm
npm test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

| ![Rogério Amorim](https://avatars2.githubusercontent.com/u/371808?s=100&v=4) |
| :--------------------------------------------------------------------------: |
|                 [Rogério Amorim](https://github.com/n0n3br)                  |

See also the list of [contributors](https://github.com/n0n3br/pub-sub-store/graphs/contributors) who participated in this project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
