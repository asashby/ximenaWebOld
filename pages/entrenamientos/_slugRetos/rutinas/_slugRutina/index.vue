<template>
  <div class="routine-details--main-container">
    <BannerRoutineDetails
      :url-image="details.url_image"
      :url-image-mobile="details.mobile_image"
    />

    <div class="routine-details--content">
      <div class="routine-details--introduction-container">
        <RoutineSummary
          :duration="details.duration"
          :frequence="details.frequency"
          :level="details.level"
          :rest-time="details.time_rest"
          :super-title="details.subtitle"
          :title="details.title"
          :working-time="details.duration"
        />
      </div>

      <div class="routine-details--workout-container">
        <RoutineComponent
          v-for="w in excercises"
          :key="w.code"
          :reps="w.series_reps.reps"
          :series="w.series_reps.series"
          :done="w.flag_completed"
          :title="w.title"
          :slug="w.slug"
          :route="w.code || w.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BannerRoutineDetails, RoutineSummary, RoutineComponent } from '~/components/Challenges'

async function fetch () {
	const arrayRoute = this.$route.params.slugRutina.split('id:')
	const slugRutina = arrayRoute[0]
	const id = arrayRoute[1]
	const idDetail = this.detailsRetoID
	await this.$store.dispatch('challenges/getDetailRoutine', { slugRutina, idDetail })
	await this.$store.dispatch('challenges/getRoutineExcercises', id)
}

export default {
	name: 'PaginaDeRutina',
	components: {
		BannerRoutineDetails,
		RoutineSummary,
		RoutineComponent
	},
	computed: {
		...mapState('challenges', {
			detailsRetoID: state => state.details.id,
			details: state => state.routine.details,
			excercises: state => state.routine.excercises
		})
	},
	fetch
}
</script>

<styles lang="scss" scoped>
.routine-details--main-container {
	.routine-details--content {
		@apply px-2 pb-8;
		@apply mx-auto;
		max-width: 709px;

		.routine-details--introduction-container {
			@apply transform -translate-y-4;
			@apply mx-auto;
			max-width: 650px;
		}
	}

	.routine-details--workout-container {
		@apply mt-12;
		@apply grid gap-4;

		@media screen and (min-width:600px) {
			@apply grid-cols-2 gap-8;
		}
	}
}
</styles>
