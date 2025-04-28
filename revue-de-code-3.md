# Revue de code 3
## Composants

### Game.vue

La fonction proceedWithReparing est un peu complexe et pourrait probablement être séparer en plusieurs fonctions.

:::danger ***Code***
```ts
function proceedWithReparing(){
    let amountOfPercentToRepare = 100 - Math.round(player.value.ship.vitality * 100 / player.value.ship.maxVitality)
    if(amountOfPercentToRepare * COST_OF_REPARE_PER_PERCENT > player.value.credit){
      amountOfPercentToRepare = Math.round(player.value.credit / COST_OF_REPARE_PER_PERCENT)
    }
    player.value.ship.vitality += (amountOfPercentToRepare * (player.value.ship.maxVitality / 100))
    player.value.credit = player.value.credit % COST_OF_REPARE_PER_PERCENT
    proceedWithFleeing()
}
```
:::
:::tip ***Corrigé***
```ts
function proceedWithReparing(){
    player.value.ship.vitality += (getAmountToRepare() * (player.value.ship.maxVitality / 100))
    player.value.credit = player.value.credit % COST_OF_REPARE_PER_PERCENT
    proceedWithFleeing()
}

function getAmountToRepare(){
    let amountOfPercentToRepare = 100 - Math.round(player.value.ship.vitality * 100 / player.value.ship.maxVitality)
    if(amountOfPercentToRepare * COST_OF_REPARE_PER_PERCENT > player.value.credit){
      amountOfPercentToRepare = Math.round(player.value.credit / COST_OF_REPARE_PER_PERCENT)
    }
    return amountOfPercentToRepare
}
```
:::

Le nom de la ref `quittingGame` n'est pas très clair. Il serait mieux de lui donner un nom plus précit pour aider à la compréhension.

:::danger ***Code***
```ts
const quittingGame = ref(false)
```
:::
:::tip ***Corrigé***
```ts
const isPlayerQuittingGame = ref(false)
```
:::

### Leaderboard.vue

Dans le `v-for` de `Leaderboard`. Il serait mieux d'utiliser le `id` du ranking comme `key` à la place de index, car celle-ci restera unique au ranking, alors que l'index peut changer dépendament du trie de la liste.

:::danger ***Code***
```ts
<LeaderboardItem 
        v-for="(ranking, index) of rankings"
        :key="index"
        :ranking="ranking"
        :position="index"
      />
```
:::
:::tip ***Corrigé***
```ts
<LeaderboardItem 
        v-for="(ranking, index) of rankings"
        :key="ranking.id"
        :ranking="ranking"
        :position="index"
      />
```
:::

### NavBar.vue

Il serait probablement intéressant pour l'accessibilité des utilisateurs de rendre le logo de la nav cliquable et que celle-ci redirige vers l'accueil.

:::danger ***Code***
```ts
<img
src="../assets/images/logo.png"
alt="Logo du jeu"
width="60"
class="me-2"
/>
<span class="text-warning fw-bold fs-4">Wars In The Stars</span>
```
:::
:::tip ***Corrigé***
```ts
<RouterLink class="nav-link p-0" id="homePage" to="/">
    <img
    src="../assets/images/logo.png"
    alt="Logo du jeu"
    width="60"
    class="me-2"
    />
    <span class="text-warning fw-bold fs-4">Wars In The Stars</span>
</RouterLink>
```
:::

## Vues

### GameView.vue

Il y a un `import` non utilisé. Il devrait être supprimé.

:::danger ***Code***
```ts
import { useRoute } from 'vue-router'
import Game from '../components/Game.vue'
```
:::

:::
:::tip ***Corrigé***
```ts
import { useRoute } from 'vue-router' // [!code --]
import Game from '../components/Game.vue'
```
:::

### NotFoundView.vue

Cette vue n'a pas été très travaillée. Cela aurait été mieux d'utiliser bootstrap pour rendre la vue semblable en apparence aux autres vues.

:::danger ***Code***
```html
<template>
    <div class="container d-flex min-vh-100">
        <span class="title">404 - Cette page n'existe pas...</span>
    </div>
</template>
```
:::

:::
:::tip ***Corrigé - exemple chatGPT***
```html
<template>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="text-center">
            <h1 class="display-1 text-danger">404</h1>
            <p class="lead">Cette page n'existe pas...</p>
            <a href="/" class="btn btn-primary">Retour à l'accueil</a>
        </div>
    </div>
</template>
```
:::

## Tests

### CharacterCreatorForm.test.ts

2 tests non fonctionnelle. Il serait mieux de les enlever.

:::danger ***Code***
```ts
// it('if form is valid, invalid-feedback is not visible',async () => {
  //   const username = 'Joey'
  //   const shipName = 'X-ing'
  //   const wrapper = mount(CharacterCreatorForm)

  //   await wrapper.find('input').setValue(username)
  //   await wrapper.find('select').setValue(shipName)
  //   expect(wrapper.find('input').element.value).toBe('Joey')
  //   await wrapper.find('form').trigger('submit.prevent')

  //   expect(wrapper.text()).toContain('Le nom doit contenir au moins 3 caractères!')
  // })

  // it('when valid form summited, router push to GameView',async () => {
  //   const username = 'Joe'
  //   const shipName = 'X-Wing'
  //   const wrapper = mount(CharacterCreatorForm)

  //   const routerSpy = vi.spyOn(router, 'push')

  //   await wrapper.find('input').setValue(username)
  //   await wrapper.find('select').setValue(shipName)
  //   await wrapper.find('button').trigger('click')

  //   expect(routerSpy).toHaveBeenCalled()
  // })
```
:::

:::
:::tip ***Corrigé***
```ts
// it('if form is valid, invalid-feedback is not visible',async () => { // [!code --]
  //   const username = 'Joey' // [!code --]
  //   const shipName = 'X-ing' // [!code --]
  //   const wrapper = mount(CharacterCreatorForm) // [!code --]

  //   await wrapper.find('input').setValue(username) // [!code --]
  //   await wrapper.find('select').setValue(shipName) // [!code --]
  //   expect(wrapper.find('input').element.value).toBe('Joey') // [!code --]
  //   await wrapper.find('form').trigger('submit.prevent') // [!code --]

  //   expect(wrapper.text()).toContain('Le nom doit contenir au moins 3 caractères!') // [!code --]
  // }) // [!code --]

  // it('when valid form summited, router push to GameView',async () => { // [!code --]
  //   const username = 'Joe' // [!code --]
  //   const shipName = 'X-Wing' // [!code --]
  //   const wrapper = mount(CharacterCreatorForm) // [!code --]

  //   const routerSpy = vi.spyOn(router, 'push') // [!code --]

  //   await wrapper.find('input').setValue(username) // [!code --]
  //   await wrapper.find('select').setValue(shipName) // [!code --]
  //   await wrapper.find('button').trigger('click') // [!code --]

  //   expect(routerSpy).toHaveBeenCalled() // [!code --]
  // }) // [!code --]
```
:::