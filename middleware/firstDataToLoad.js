export default async ({ store }) => {
	// cargar datos del menu de opciones
	await store.dispatch('getMenuData')
}
