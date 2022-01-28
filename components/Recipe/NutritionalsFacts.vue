<template>
  <div class="recipe-nutritionals-fact--main-container">
    <h2>Informacion nutricional</h2>
    <div class="nutritionals-facts--container">
      <div
        v-for="(nt, ntIndex) in nutritionalFacts"
        :key="ntIndex"
        :class="classDefiner(ntIndex)"
      >
        <label>{{ nt.macro }}</label>
        <span>{{ nt.quantity }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'NutricionalsFacts',
	props: {
		nutritionalFacts: { default: () => [], type: Array }
	},
	methods: {
		classDefiner (index) {
			const baseClass = 'nutritionals-facts--container_element'
			if (index === 0) {
				return `cal ${baseClass}`
			} else if (index === 1) {
				return `carbs ${baseClass}`
			} else if (index === 2) {
				return `proteins ${baseClass}`
			} else if (index === 3) {
				return `fats ${baseClass}`
			}
		}
	}
}
</script>
<styles lang="scss" scoped>
.recipe-nutritionals-fact--main-container {
	@apply my-12;
	@apply text-gray-light;

	h2 {
		@apply font-bold text-xl;
		@apply w-full;
		@apply text-left;
		@apply mb-4;
	}

	.nutritionals-facts--container {
		@apply grid gap-4 grid-cols-2;

		@media screen and (min-width:600px) {
			@apply grid-cols-4;
		}

		&_element {
			@apply rounded-xl;
			@apply p-4;
			@apply bg-gray-darkest;
			@apply grid gap-4;

			label {
				@apply font-bold text-sm;
				@apply whitespace-nowrap;
			}
			span {
				@apply font-bold text-4xl;
			}

			&.cal {
				label {
					color: #fe5712;
				}
			}

			&.carbs {
				label {
					color: #fe375f;
				}
			}

			&.proteins {
				label {
					color: #30d38b;
				}
			}

			&.fats {
				label {
					color: #da8c0d;
				}
			}

		}
	}
}
</styles>
