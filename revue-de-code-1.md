# Revue de code 1

## Composants

---

### CharacterCreationForm.vue

Le defineProps est fide et n'a aucune props. S'il y n'est pas utiliser, il serait mieux de le suprimer.

:::danger ***Code***
```js
const props = defineProps<{
    
}>()
```
:::
:::tip ***Corrigé***
```js
const props = defineProps<{ // [!code --]
// [!code --]
}>() // [!code --]
```
:::

Il manque une gestion réactive au niveau des inputs avec un ref et v-model.

:::danger ***Code***
```ts
<input type="text" class="form-control" placeholder="First name" aria-label="First name">

<select class="form-select" aria-label="Sélection vaisseau">
```
:::
:::tip ***Corrigé***
```ts
<input v-model="firstName" type="text" class="form-control" placeholder="First name" aria-label="First name">

<select v-model="ship" class="form-select" aria-label="Sélection vaisseau">
```
dans `<script>`:
```ts
const firstName = ref('')
const ship = ref('')
```
:::

Le form devrait avoir un `@submit.prevent` à la place d'un `action="POST"` pour être capable d'intercepter l'envoie du form et faire un traitement quelquonc dans une fonction comme une vérifications bootstrap.
:::danger ***Code***
```ts
<form action="POST" class="form container">  
```
:::
:::tip ***Corrigé***
```ts
<form @submit.prevent="handleCreateCharacter" class="form container">
```
dans `<script>`:
```ts
function handleCreateCharacter(){
  validate()...
}
```
:::

L'option originale du selected devrait avoir un `disabled` pour éviter d'être sélectionné aisi qu'un **value**.
:::danger ***Code***
```html
<option selected>Sélectioner un vaisseau</option> 
```
:::
:::tip ***Corrigé***
```html
<option disabled selected value="">Sélectionner un vaisseau</option>
```
:::

## Services

### gameService.ts

Il manque une fonction `GET` pour aller chercher dans la base de donnée les personnages.

:::danger ***Code***
```ts
async function getRankings () {
  const { data } = await axios.get(`${API_URL}/rankings`)
  return data
}

async function getShips () {
  const { data } = await axios.get(`${API_URL}/ships`)
  return data
}
```
:::

:::tip ***Corrigé***
```ts
async function getRankings () {
  const { data } = await axios.get(`${API_URL}/rankings`)
  return data
}

async function getShips () {
  const { data } = await axios.get(`${API_URL}/ships`)
  return data
}

async function getCharacters () { // [!code ++]
  ... // [!code ++]
} // [!code ++]
```
:::
