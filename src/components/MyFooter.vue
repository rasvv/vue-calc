<template>
	<div>
		<v-row class="d-flex justify-center" >
			<v-col cols="2"></v-col>

			<v-col cols="8" class="d-flex justify-center">
				2021 - {{ new Date().getFullYear() }}   &copy;   Все права защищены			
			</v-col>
			<v-col cols="2" class="d-flex justify-end">
				Автор
				<a href="https://rasvv.ru" target="blank" ><img src="../assets/rvv.png" alt="rvv" height="20px"></a>
			</v-col>

			</v-row>
	</div>
</template>

<style lang="sass" scoped>
*
	font-size: 18px

</style>
