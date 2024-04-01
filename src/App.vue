<template>
  <v-app class="d-flex column">
    <v-main>
      <Calculator />
    </v-main>
  </v-app>
</template>

<script>
import Calculator from './components/Calculator.vue';

export default {
  name: 'App',

  components: {
    Calculator,
  },
};
</script>

<style lang="sass">
html
	box-sizing: border-box
	margin: 0
	padding: 0

main
	height: 100vh

fieldset
	width: 100%
	border: 1px solid #339dc7
	/* Чтобы подстраивался под контент */
	display: inline-block
	padding: 10px

legend
	color: #339dc7
	font-style: italic

v-row
	margin: 0 -12 0 0 !important

.calc
	height: 95vh

	&__form
		// min-height: 1050px
		// height: 95vh
		min-height: 95vh
		display: flex
		justify-content: center

	&__types
		padding: 5px

	&__item
		display: flex
		padding: 0
		margin: 0

	&__items
		width: 100%
		display: flex
		justify-content: space-around
		display: block
		margin: 0

	&__nuclids
		width: 90%
		background-color: aliceblue
		display: list-inline
		min-height: 700px

		&-card
			border-bottom: 1px solid #ccc
			width: 100%
			padding: 10px

.v-btn:not(.v-btn--round).v-size--default
	width: 100%
	min-width: 0
	padding: 0
	margin-bottom: 10px

.bordered
	margin: 0
	width: 100%
	border: 1px solid lightblue
	border-radius: 10px

.borred
	height: 92vh

.buttons
	padding: 0
	gap: 30px
	width: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center

.input
	margin-top: -20px
	padding: 0

.gap
	gap: 10px

.left
	overflow-y: scroll
	height: 70vh

.right
	overflow-y: auto
	overflow-x: none
	height: 90vh

.h100
	height: 100vh

.nuclids__top
	width: 100%
	display: flex
	justify-content: space-between

	&-left
		display: flex
		flex-direction: column
		justify-content: space-between

.lineheight
	padding: 2px 8px

.nuclids__bottom
	width: 100%
	display: flex
	justify-content: space-between

.posparent
	position: relative
	// width: 100%

.poschild
	// align-self: end
	position: fixed
	// left: 95%
	right: -95%
	// top: 10px

.v-dialog
	overflow-y: auto !important
	persistent: true

@media (min-width: 2800px)
	.container
		max-width: 3700px !important
</style>
