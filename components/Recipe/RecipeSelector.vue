<template>
	<div class="recipe-selector--main-container">
		<div class="recipe-selector--desktop-container">
			<Selector
				wire
				itemText="title"
				itemValue="code"
				label="Comidas"
				:items="meals"
				@input="handleChangeOnMealSelector"
			/>
		</div>

		<div class="recipe-selector--movil-container">
			<button
				v-for="meal in meals"
				:key="meal.code"
				:class="[
					'meals-btn',
					{
						'active': meal.active
					}
				]"
				type="button"
				@click="() => handleClickOnMealBtn(meal.code)"
			>{{ meal.title }}</button>
		</div>
	</div>
</template>

<script>
import { compose, decide, equality, setNewProperty } from 'functionallibrary'

export default {
	name: 'RecipeSelector',
	data: () => ({
		meals: [
			{ active: true, title: 'Todos', code: 'todos' },
			{ active: false, title: 'Desayuno', code: 'Desayuno' },
			{ active: false, title: 'Media manana', code: 'Media manana' },
			{ active: false, title: 'Almuerzo', code: 'Almuerzo' },
			{ active: false, title: 'Media tarde', code: 'Media tarde' },

			{ active: false, title: 'Cena', code: 'Cena' }
		]
	}),
	methods: {
		handleChangeOnMealSelector (code) {
			this.$emit('filter-recipes', code)
		},
		handleClickOnMealBtn (code) {
			this.$emit('filter-recipes', code)
			this.updateMeals(code)
		},
		updateMeals (code) {
			this.meals = this.meals.reduce((list, item) => {
				const unActiveMeal = compose(
					item => list.concat(item),
					setNewProperty('active', false)
				)
				const activeMeal = compose(
					item => list.concat(item),
					setNewProperty('active', true)
				)
				return decide(
					equality('code', code),
					activeMeal,
					unActiveMeal,
					item
				)
			}, [])
		}
	}
}
</script>

<styles lang="scss" scoped>
.recipe-selector--main-container {
	.recipe-selector {
		&--desktop-container {
			@apply hidden;

			@media screen and (min-width:600px) {
				@apply block;
			}
		}

		&--movil-container {
			@apply w-full;
			@apply whitespace-nowrap overflow-auto;
			@apply px-2 py-4;

			@media screen and (min-width:600px) {
				@apply hidden;
			}

			.meals-btn {
				@apply bg-gray-light;
				@apply text-gray-heavy;
				@apply rounded;
				@apply p-2 mr-2;
				font-size: 14px;
				min-width: 5rem;

				&.active {
					@apply bg-green-base;
					@apply text-gray-light font-bold;
				}
			}
		}
	}
}
</styles>
