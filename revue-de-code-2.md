# Revue de code 2
Cette revue de code ne sera pas très longue, car je n'ai pas travaillé énormément sur le TP2 cette semaine.

## Composants

### CharacterCreationForm.vue

Le mot clé `let` ou `const` devrait être utilisé à la place de `var` pour `isValid`.

:::danger ***Code***
```ts
var isValid:boolean = false
```
:::
:::tip ***Corrigé***
```ts
let isValid = false
```
:::

Le `.ts` est superflu pour les imports.

:::danger ***Code***
```ts
import type {Ship} from '../scripts/type.ts'
```
:::
:::tip ***Corrigé***
```ts
import type {Ship} from '../scripts/type'
```
:::

Les lignes de code inutiles en commentaire devraient être supprimées.

:::danger ***Code***
```ts
onMounted(async () => {
  //isLoading.value = true
  try {
    const data = await gameService.getShips()
    ships.value = data
  } catch (error) {
    console.error('Erreur avec le service: ', (error as any).message)
  } finally {
    // isLoading.value = false
  }
})
```
:::
:::tip ***Corrigé***
```ts
onMounted(async () => {
  //isLoading.value = true // [!code --]
  try {
    const data = await gameService.getShips()
    ships.value = data
  } catch (error) {
    console.error('Erreur avec le service: ', (error as any).message)
  } finally {
    // isLoading.value = false // [!code --]
  }
})
```
:::

### GameView.vue

Les imports qui sont du même fichier devraient être rassemblés.

:::danger ***Code***
```ts
import type { Player } from '../scripts/type.ts'
import type {Ship} from '../scripts/type.ts'
```
:::
:::tip ***Corrigé***
```ts
import type { Player, Ship } from '../scripts/type'
```
:::