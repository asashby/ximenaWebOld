/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { atLeastOneTrue } from 'functionallibrary'
import { CounterTime } from '~/components/common'

import '~/components/Challenges/index.styles.scss'

import Rating from '~/components/Buttons/Rating'
import Icon from '~/components/Buttons/Icon'

export const BannerChallenges = Vue.component('BannerChallenges', {
	data: () => ({
		description: 'Un cuerpo sano requiere una mente enfocada',
		title: 'Entrenamientos'
	}),
	computed: {
		bannerMovil () {
			return require('~/assets/images/retos/banner_movil2.jpg')
		},
		bannerMovil2x () {
			return require('~/assets/images/retos/banner_movil2.jpg')
		},
		bannerDesktop () {
			return require('~/assets/images/retos/banner_desktop.webp')
		},
		bannerDesktop2x () {
			return require('~/assets/images/retos/banner_desktop@2x.webp')
		},
		bannerDesktop3x () {
			return require('~/assets/images/retos/banner_desktop@3x.webp')
		}
	},
	render () {
		return (
			<div class="challenges--banner">

				<div class="challenges--banner-container__image">
					<picture>
						<source
							srcset={ this.bannerDesktop }
							media="(min-width:600px)"
						></source>
						<source
							srcset={ `${this.bannerDesktop2x} 2x`}
							media="(min-width:600px)"
						></source>
						<source
							srcset={ `${this.bannerDesktop3x} 3x`}
							media="(min-width:600px)"
						></source>
						<source
							srcset={ `${this.bannerMovil2x} 2x`}
						></source>
						<img
							class="challenges--banner-container__image-img"
							src={ this.bannerMovil }
							alt="imagen banner de tips"
						></img>
					</picture>
				</div>

				<div class="challenges--banner-container__title">
					<h1>{this.title}</h1>
					{this.description
						? <p>{this.description}</p>
						: null}
				</div>
			</div>
		)
	}
})

export const ChallengeComponent = Vue.component('ChallengeComponent', {
	props: {
		img: {
			default: '',
			type: String
		},
		title: {
			default: '',
			type: String
		},
		description: {
			default: '',
			type: String
		},
		route: {
			default: '',
			type: String
		}
	},
	render () {
		return (
			<NuxtLink
				to={ `/entrenamientos/${this.route}` }
				class="challenge-component--main-container"
			>
				<div class="challenge-component--img_container">
					<div class="challenge-component--img_container-opacity"></div>
					<img class="challenge-component--img" src={this.img}></img>
				</div>
				<div class="challenge-component--title">
					<h3>{ this.title }</h3>
					{this.description ? <p>{this.description}</p> : null}
				</div>
			</NuxtLink>
		)
	}
})

export const BannerChallengeDetails = Vue.component('BannerChallengeDetails', {
	props: {
		img: {
			default: '',
			type: String
		},
		imgMobile: {
			default: '',
			type: String
		},
		showVideo: {
			default: false,
			type: Boolean
		}
	},
	computed: {
		bannerDesktop () {
			if (this.img) {
				return this.img
			} else {
				return '~/assets/images/retos/rutinas/banner_desktop@2x.jpg'
			}
		},
		bannerDesktop2x () {
			if (this.img) {
				return this.img
			} else {
				return '~/assets/images/retos/rutinas/banner_desktop@2x.jpg'
			}
		},
		bannerMovil () {
			if (this.imgMobile) {
				return this.imgMobile
			} else {
				return '~/assets/images/retos/rutinas/banner_desktop@2x.jpg'
			}
		},
		bannerMovil2x () {
			if (this.imgMobile) {
				return this.imgMobile
			} else {
				return '~/assets/images/retos/rutinas/banner_desktop@2x.jpg'
			}
		},
		iconPlay () {
			return require('~/assets/images/retos/rutinas/ejercicios/ejecucion/icon-play.svg')
		}
	},
	methods: {
		handleClickOnVideoBtn () {
			this.$emit('open-video')
		}
	},
	render () {
		return (
			<div class="workout--banner">
				<picture>
					<source
						srcset={ this.bannerDesktop }
						media="(min-width:600px)"
					></source>
					<source
						srcset={ `${this.bannerDesktop2x} 2x`}
						media="(min-width:600px)"
					></source>
					<source
						srcset={ `${this.bannerMovil2x} 2x`}
					></source>
					<img src={ this.bannerMovil } class="workout--banner-img"></img>
				</picture>
				{ this.showVideo && <div class="workout--container-btn-video">
					<button class="workout--btn-video" onClick={ this.handleClickOnVideoBtn }>
						<img src={ this.iconPlay } class="workout--btn-img"/>
					</button>
				</div> }
			</div>
		)
	}
})

export const WorkoutTime = Vue.component('WorkoutTime', {
	props: {
		days: { default: 0, type: Number },
		users: { default: 0, type: Number },
		type: { default: '', type: String }
	},
	render () {
		return (
			<div class="workouttime-container">
				<div class="days-container">
					<span>{ this.days }</span>
					<small class="font-light">Dias</small>
				</div>
				<div class="type-container">
					<span>{ this.type }</span>
					<small class="font-light">Tipo</small>
				</div>
				<div class="users-container">
					<span>{ this.users }</span>
					<small class="font-light">Usuarios</small>
				</div>
			</div>
		)
	}
})

export const IntroductionChallengeDetails = Vue.component('IntroductionChallengeDetails', {
	props: {
		comments: { default: 0, type: Number },
		days: { default: 0, type: Number },
		description: { default: '', type: String },
		duration: { default: '', type: String },
		frequency: { default: '', type: String },
		level: { default: '', type: String },
		slug: { default: '', type: String },
		rating: { default: '', type: String },
		title: { default: '', type: String },
		type: { default: '', type: String },
		users: { default: 0, type: Number },
		coursepaid: { default: 0, type: Number },
		prices: { default: '0', type: String },
		readonlyRating: { default: false, type: Boolean },
		subtitle: { default: '', type: String },
		extid: { default: 0, type: Number }
	},
	computed: {
		...mapGetters([
			'getTokenMaki'
		])
	},
	methods: {
		async handlePayment () {
			const token = this.$store.$auth.strategies.local.token.get()
			const body = {
				orderId: '',
				link: ''
			}
			const { data: response } = await this.$http.patch(`courses/${this.slug}/payment`, body)
			const extId = response.external_id
			window.location.href = `${this.$auth.ctx.env.URL_TIENDA}${this.slug}/detalle-producto?shoper=true&token=${token}&orderExternalId=${extId}`
		}
	},
	render () {
		return (
			<div class="introduction--main-container">
				<div class="introduction-wrapper">
					<small class="introduction--pre-title font-light">
						{ this.subtitle }
					</small>

					<div class="introduction--title-container">
						{/* <NuxtLink to="/retos" class="introduction--link">
							<v-icon large>mdi-chevron-left</v-icon>
						</NuxtLink> */}
						<h1>
							{ this.title }
						</h1>
					</div>

					<small class="introduction--sub-title font-light">
						{ this.level }
						{ this.frequency && <span class="separation-text" >.</span> }
						{ this.frequency }
						{ this.duration && <span class="separation-text" >.</span> }
						{ this.duration }
					</small>
				</div>

				<div class="introduction--rating">
					<Rating
						rating={ this.rating }
						readonly={ this.readonlyRating }
					/>
					<span class="font-light">Ver los {this.comments} comentarios</span>
				</div>

				<WorkoutTime
					days={ this.days }
					users={ this.users }
					type={ this.type }
				/>
        	{ this.coursepaid === 0
					? <button
						onClick={ this.handlePayment }
						type="button"
						class="introduction-btn x-btn x-btn__green"
					>Solicitar reto
						<span class="d-block">
							{this.prices}
						</span>
					</button>
					: <button
						type="button"
						class="introduction-btn x-btn x-btn__green"
					>Iniciar reto</button>
				}
			</div>
		)
	}
})

export const SummaryChallengeDetails = Vue.component('SummaryChallengeDetails', {
	props: {
		content: { default: '', type: String }
	},
	render () {
		return (
			<p class="workout-summary font-light">{ this.content }</p>
		)
	}
})

export const WorkoutByDay = Vue.component('WorkoutByDay', {
	props: {
		day: { default: 0, types: [Number, String] },
		done: { default: 0, type: Number },
		img: { default: '', type: String },
		code: { default: '', type: String },
		route: { default: '', type: String },
		title: { default: '', type: String },
		id: { default: 0, types: [Number, String] },
		idcourse: { default: 0, types: [Number, String] },
		coursepaid: { default: 0, type: Number }
	},
	computed: {
		goToRoutine () {
			const { fullPath } = this.$route
			return { path: `${fullPath}/rutinas/${this.route}id:${this.id}` }
		},
		iconDay () {
			return require('~/assets/images/retos/rutinas/icon-day.png')
		}
	},
	render () {
		return (
			<NuxtLink
				event={ this.coursepaid === 0 ? '' : 'click' }
				to={ this.goToRoutine }
				class="workout-day--container"
			>
				<div class="img">
					<img src={this.img || this.iconDay}></img>
				</div>

				<div class="description">
					<label class="font-light">Día { this.day }</label>
					<h3>{this.title}</h3>
				</div>

				<div class="done">
					{this.done !== 0 ? <Icon icon="mdi-check"/> : <Icon icon="mdi-lock"/>}
				</div>
			</NuxtLink>
		)
	}
})

export const BannerRoutineDetails = Vue.component('BannerRoutineDetails', {
	props: {
		urlImage: { default: '', type: String },
		urlImageMobile: { default: '', type: String }
	},
	computed: {
		bannerDesktop () {
			if (this.urlImage) {
				return this.urlImage
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/banner_desktop.jpg')
			}
		},
		bannerDesktop2x () {
			if (this.urlImage) {
				return this.urlImage
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/banner_desktop@2x.jpg')
			}
		},
		bannerMovil () {
			if (this.urlImageMobile) {
				return this.urlImageMobile
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/banner_movil.jpg')
			}
		},
		bannerMovil2x () {
			if (this.urlImageMobile) {
				return this.urlImageMobile
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/banner_movil@2x.jpg')
			}
		}
	},
	render () {
		return (
			<div class="workout--banner">
				<picture>
					<source
						srcset={ this.bannerDesktop }
						media="(min-width:600px)"
					></source>
					<source
						srcset={ `${this.bannerDesktop2x} 2x`}
						media="(min-width:600px)"
					></source>
					<source
						srcset={ `${this.bannerMovil2x} 2x`}
					></source>
					<img src={ this.bannerMovil } class="workout--banner-img"></img>
				</picture>
			</div>
		)
	}
})

export const RoutineComponent = Vue.component('RoutineComponent', {
	props: {
		done: { default: 0, type: Number },
		reps: { default: 0, type: Number },
		route: { default: '', type: String },
		series: { default: 0, type: Number },
		slug: { default: '', type: String },
		title: { default: '', type: String }
	},
	computed: {
		buildRoute () {
			const { fullPath } = this.$route
			return `${fullPath}/${this.route}`
		},
		playButton () {
			return require('~/assets/images/recetas/detalle/play_btn.svg')
		}
	},
	render () {
		return (
			<NuxtLink
				to={ this.buildRoute }
				class="routine-day--container"
			>
				<div class="img">
					<img src={ this.playButton }></img>
				</div>

				<div class="description">
					<label class="font-light">{ this.series } series - {this.reps} repeticiones</label>
					<h3>{this.title}</h3>
				</div>

				<div class="done">
					{this.done === 1 ? <Icon large icon="mdi-check"/> : null}
				</div>
			</NuxtLink>
		)
	}
})

export const RoutineSummary = Vue.component('RoutineSummary', {
	props: {
		duration: { default: '', type: String },
		frequence: { default: '', type: String },
		level: { default: '', type: String },
		restTime: { default: 60, type: Number },
		superTitle: { default: '', type: String },
		title: { default: '', type: String },
		workingTime: { default: '', type: String }
	},
	computed: {
		goBack () {
			const { slugRetos } = this.$route.params
			return `/entrenamientos/${slugRetos}`
		}
	},
	render () {
		return (
			<div class="routine-summary--main-container">
				<div class="routine-summary-wrapper">
					<small class="routine-summary--pre-title font-light"> { this.superTitle } </small>

					<div class="routine-summary--title-container">
						<NuxtLink to={ this.goBack } class="routine--link">
							<Icon icon="mdi-chevron-left" large/>
						</NuxtLink>
						<h1>
							{ this.title }
						</h1>
					</div>
				</div>

				<div class="routine-summary--working-time__container font-light">
					<div class="working-time">
						<h3>{ this.workingTime }</h3>
						<small class="font-light">min</small>
					</div>

					<div class="rest-time">
						<h3>{ this.restTime }</h3>
						<small class="font-light">Seg - Descanso</small>
					</div>
				</div>

				<span class="text-xs flex justify-center">
					{ this.level }
					{ this.frequency && <span class="separation-text" >.</span> }
					{ this.frequency }
					{ this.duration && <span class="separation-text" >.</span> }
					{ this.duration } min
				</span>
			</div>
		)
	}
})

export const BannerExcercises = Vue.component('BannerExcercises', {
	props: {
		urlImage: { default: '', type: String },
		urlImageMobile: { default: '', type: String }
	},

	computed: {
		bannerDesktop () {
			if (this.urlImage) {
				return this.urlImage
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/ejecucion/banner_desktop.jpg')
			}
		},
		bannerDesktop2x () {
			if (this.urlImage) {
				return this.urlImage
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/ejecucion/banner_desktop@2x.jpg')
			}
		},
		bannerMovil () {
			if (this.urlImageMobile) {
				return this.urlImageMobile
			}
			return require('~/assets/images/retos/rutinas/ejercicios/ejecucion/banner_movil.jpg')
		},
		bannerMovil2x () {
			if (this.urlImageMobile) {
				return this.urlImageMobile
			} else {
				return require('~/assets/images/retos/rutinas/ejercicios/ejecucion/banner_movil@2x.jpg')
			}
		},
		iconPlay () {
			return require('~/assets/images/retos/rutinas/ejercicios/ejecucion/icon-play.svg')
		}
	},
	methods: {
		handleClickOnVideoBtn () {
			this.$emit('open-video')
		}
	},
	render () {
		return (
			<div class="workout--banner">
				<picture>
					<source
						srcset={ this.bannerDesktop }
						media="(min-width:600px)"
					></source>
					<source
						srcset={ `${this.bannerDesktop2x} 2x`}
						media="(min-width:600px)"
					></source>
					<source
						srcset={ `${this.bannerMovil2x} 2x`}
					></source>
					<img src={ this.bannerMovil } class="workout--banner-img"></img>
				</picture>
				<div class="workout--container-btn-video">
					<button class="workout--btn-video" onClick={ this.handleClickOnVideoBtn }>
						<img src={ this.iconPlay } class="workout--btn-img"/>
					</button>
				</div>
			</div>
		)
	}
})

export const ExcerciseSummary = Vue.component('ExcerciseSummary', {
	props: {
		duration: { default: '', type: String },
		frequence: { default: '', type: String },
		level: { default: '', type: String },
		restTime: { default: '', type: String },
		superTitle: { default: '', type: String },
		title: { default: '', type: String },
		workingTime: { default: '', type: String },
		content: { default: '', type: String }
	},
	computed: {
		excerciseName () {
			return this.$route.params.slugEjercicios
		},
		goBack () {
			const { slugRetos, slugRutina } = this.$route.params
			return `/entrenamientos/${slugRetos}/rutinas/${slugRutina}`
		}
	},
	render () {
		return (
			<div class="routine-summary--main-container">
				<div class="routine-summary-wrapper">
					<small class="routine-summary--pre-title"> { this.superTitle } </small>

					<div class="routine-summary--title-container">
						<NuxtLink to={ this.goBack } class="routine--link">
							<Icon icon="mdi-chevron-left" large/>
						</NuxtLink>
						<h1>
							{ this.title }
						</h1>
					</div>
				</div>

				<div class="routine-summary--working-time__container">
					<div class="working-time">
						<h3>{ this.workingTime }</h3>
						<small class="font-light">min</small>
					</div>

					<div class="rest-time">
						<h3>{ this.restTime }</h3>
						<small class="font-light">Seg - Descanso</small>
					</div>
				</div>
				<div class="text-xs flex justify-center">
					<p>{ this.content }</p>
				</div>
			</div>
		)
	}
})

export const ExcerciseComponent = Vue.component('ExcerciseComponent', {
	props: {
		id: { default: 0, type: Number },
		index: { default: 0, type: Number },
		restTime: { default: 60, type: Number },
		state: { default: 0, type: Number },
		reps: { default: 0, type: Number },
		series: { default: 0, type: Number }
	},
	data: () => ({
		restInitialized: false,
		restFinished: false
	}),
	computed: {
		...mapGetters('challenges', [
			'getAllSeries'
		]),
		showCheck () {
			return atLeastOneTrue(
				this.restInitialized,
				this.state === 1
			)
		}
	},
	methods: {
		changeStateProperty (flagState) {
			this.$emit(
				'change-state-prop',
				{ setState: flagState, index: this.index })
		},
		/*
		 * @param { boolean } finish - determina si el descanso termino o no
		 */
		handlerChangeTime (finish) {
			this.restFinished = finish

			if (this.restFinished) {
				this.restInitialized = false
				this.changeStateProperty(1)
			}
		},
		handleClickOnCheck () {
			if (this.index === 0) {
				if (this.state === 0) {
					this.restInitialized = true
					this.restfinished = false
				}
			} else {
				const beforeIndex = this.index - 1
				const itemBefore = this.getAllSeries[beforeIndex].flag_complete
				if (itemBefore === 1) {
					if (this.state === 0) {
						this.restInitialized = true
						this.restfinished = false
					}
				}
			}
		}
	},
	render () {
		return (
			<div
				class={ `excercise-control--main-container ${this.restInitialized ? 'resting' : ''}` }
			>
				<div class="left-side--container">
					{this.restInitialized
						? <span class="rest">Descanso</span>
						: <div class="set-and-rep">
							<label class="font-light">Set { this.index + 1 }</label>
							<h3>{ this.reps } Repeticiones</h3>
						</div>}
				</div>

				<div class="right-side--container">
					<div class="counter">
						{this.restInitialized
							? <CounterTime
								time={ this.restTime }
								on-rest-finished={ this.handlerChangeTime }
							></CounterTime>
							: null}
					</div>

					<button
						type="button"
						class="check"
						onClick={ this.handleClickOnCheck }
					>
						{this.showCheck ? <Icon large icon="mdi-check"/> : null}
					</button>
				</div>
			</div>
		)
	}
})
