<template>
	<div>
	</div>
</template>



<script>

export default {
	mounted() {
        this.$swal(`${this.$store.state.apiInternalError}`)	
        setTimeout(window.close, 5000)
	}
}

</script>



<style scoped>

</style>