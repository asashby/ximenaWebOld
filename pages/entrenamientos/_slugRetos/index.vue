<template>
  <div class="workout-details--main-container">
    <BannerChallengeDetails
      :img="challenge.banner"
      :img-mobile="challenge.mobile_image"
      :show-video="!!challenge.url_video"
      @open-video="openVideo"
    />

    <div class="workout-details--content">
      <div class="workout-details--introduction-container">
        <IntroductionChallengeDetails
          :comments="challenge.comments"
          :days="challenge.days"
          :description="challenge.description"
          :duration="challenge.duration"
          :frequency="challenge.frequency"
          :level="challenge.level"
          :slug="challenge.slug"
          :rating="challenge.rating"
          :title="challenge.title"
          :type="challenge.type"
          :users="challenge.users"
          :coursepaid="challenge.course_paid"
          :prices="challenge.prices"
          :subtitle="challenge.subtitle"
          :extid="challenge.ext_id"
          readonly-rating
        />
      </div>

      <SummaryChallengeDetails
        :content="challenge.description"
      />

      <div class="workout-details--workout-container">
        <WorkoutByDay
          v-for="w in workout"
          :id="w.id"
          :key="w.code"
          :code="w.code"
          :day="w.day"
          :done="w.flag_complete_unit"
          :img="w.url_icon"
          :title="w.title"
          :route="w.slug || w.title"
          :idcourse="challenge.id"
          :coursepaid="challenge.course_paid"
        />
      </div>
    </div>
    <VideoModal
      v-if="challenge.url_video"
      :value="showVideo"
      :url-video="challenge.url_video"
      @close-video-modal="closeVideoModal"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BannerChallengeDetails, IntroductionChallengeDetails, SummaryChallengeDetails, WorkoutByDay } from '~/components/Challenges'
import VideoModal from '~/components/Modal/VideoModal'

async function fetch () {
	const { slugRetos } = this.$route.params
	await this.$store.dispatch('challenges/getDetails', slugRetos)
	await this.$store.dispatch('challenges/getDetailsWorkout', slugRetos)
}

function openVideo () {
	this.showVideo = true
}

function closeVideoModal () {
	this.showVideo = false
}

function data () {
	return {
		showVideo: false
	}
}

export default {
	name: 'PaginaDetalleReto',
	components: {
		BannerChallengeDetails,
		IntroductionChallengeDetails,
		SummaryChallengeDetails,
		WorkoutByDay,
		VideoModal
	},
	data,
	fetch,
	computed: {
		...mapState('challenges', {
			challenge: state => state.details,
			workout: state => state.workout
		})
	},
	methods: {
		openVideo,
		closeVideoModal
	}
}
</script>

<styles lang="scss" scoped>
.workout-details--main-container {
	.workout-details--content {
		@apply px-3 pb-8;
		@apply mx-auto;
		max-width: 805px;

		.workout-details--introduction-container {
			@apply transform -translate-y-12;
		}
	}

	.workout-details--workout-container {
		@apply mt-12;
		@apply grid gap-4;

		@media screen and (min-width:600px) {
			@apply grid-cols-2 gap-12;
		}
	}
}
</styles>
