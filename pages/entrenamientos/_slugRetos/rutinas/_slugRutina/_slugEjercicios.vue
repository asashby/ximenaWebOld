<template>
  <div class="excercises-details--main-container">
    <BannerExcercises
      :url-image="details.url_image"
      :url-image-mobile="details.mobile_image"

      @open-video="openVideo"
    />

    <div class="excercises-details--content">
      <div class="excercises-details--introduction-container">
        <ExcerciseSummary
          :duration="sets.duration"
          :frequence="sets.frequence"
          :level="sets.level"
          :rest-time="sets.time_rest"
          :super-title="sets.subtitle"
          :title="sets.title"
          :working-time="sets.max_time"
          :content="sets.content"
        />
      </div>

      <div class="excercises-details--workout-container">
        <ExcerciseComponent
          v-for="(w, wIndex) in sets.series"
          :key="wIndex"
          :item="w"
          :reps="w.reps"
          :series="w.serie"
          :state="w.flag_complete"
          :index="wIndex"
          @change-state-prop="updateExcerciseState"
        />
      </div>

      <FinishedWorkout
        v-model="showWorkoutModal"
        @close-modal="closeModalFinishedWorkout"
        @open-modal-comment="openModalComment"
      />

      <VideoModal
        v-if="sets.url_video"
        :value="showVideo"
        :url-video="sets.url_video"
        @close-video-modal="closeVideoModal"
      />

      <CommentList
        :value="showComment"
        @close-modal="showComment = false"
      />
      <SendComment
        :value="showSendComment"
        :rating="rating"
        @close-modal="showSendComment = false"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BannerExcercises, ExcerciseSummary, ExcerciseComponent } from '~/components/Challenges'
import FinishedWorkout from '~/components/Modal/FinishedWorkout'
import VideoModal from '~/components/Modal/VideoModal'
import CommentList from '~/components/Modal/CommentList'
import SendComment from '~/components/Modal/SendComment'

async function fetch () {
	const arrayRoute = this.$route.params.slugRutina.split('id:')
	const slugExercises = this.$route.params.slugEjercicios
	const id = arrayRoute[1]
	await this.$store.dispatch('challenges/getDetailExcercises', { id, slugExercises })
}

async function updateExcerciseState ({ setState, index }) {
	const arrayRoute = this.$route.params.slugRutina.split('id:')
	const unitId = arrayRoute[1]
	const questionId = this.sets.id
	await this.$store.dispatch('challenges/updateSet', { setState, unitId, questionId, index })
}

function openVideo () {
	this.showVideo = true
}

function closeVideoModal () {
	this.showVideo = false
}

function closeModalFinishedWorkout () {
	this.$store.dispatch('challenges/updateFinishModal', false)
}

function openModalComment (value) {
	this.$store.dispatch('challenges/updateFinishModal', false)
	this.rating = value
	this.showSendComment = true
}
function data () {
	return {
		showVideo: false,
		video: 'https://player.vimeo.com/video/556321582',
		showComment: false,
		showSendComment: false,
		rating: 0
	}
}

export default {
	name: 'PaginaDeEjercicios',
	components: {
		BannerExcercises,
		ExcerciseComponent,
		ExcerciseSummary,
		FinishedWorkout,
		VideoModal,
		CommentList,
		SendComment
	},
	data,
	fetch,
	computed: {
		...mapState('challenges', {
			details: state => state.routine.details,
			sets: state => state.sets,
			showWorkoutModal: state => state.showWorkoutModal
		})
	},
	methods: {
		updateExcerciseState,
		openVideo,
		closeVideoModal,
		closeModalFinishedWorkout,
		openModalComment
	}
}
</script>

<styles lang="scss" scoped>
.excercises-details--main-container {
	.excercises-details--content {
		@apply px-2 pb-8;
		@apply mx-auto;
		max-width: 709px;

		.excercises-details--introduction-container {
			@apply transform -translate-y-4;
		}
	}

	.excercises-details--workout-container {
		@apply mt-12;
		@apply grid gap-4;
	}
}
</styles>
