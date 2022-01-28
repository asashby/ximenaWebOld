# Recomendaciones sobre auth con facebook (aplica lo mismo para google)

1. No es recomendable usar "*" como versión de auth-nuxt en el package.json ya que ante cualquier mínimo cambio puede afectar la implememtanción que han realizado, les recomiendo utilizar la última versión estable o una versión beta, pero siempre indicando la versión.

2. auth-nuxt luego de pasar por cualquier strategy te agrega una variable $auth dónde establece el estado de la autenticación y dependiendo del provider la información del usuario. Siempre intentar referenciar a esa y no generar nuevos objetos.

```js
await this.$auth.loginWith('facebook')
// acá ya tengo info del auth en $this.$auth
// $this.$auth.loggedIn -- true o false
// $this.$auth.user -- false o un objeto dependiendo de la configuración.
```

3. En el caso de facebook se puede obtener la info del usuario automáticamente sin dato adicional usando la configuración de endpoints

```js
// nuxt.config.js
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    endpoints: {
      // modificar la url dependiendo de la información que requieran
      userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
    }
  },
```

De esa manera no deben escribir el código luego de llamar al método loginWith('facebook')

```js
		loginWithFacebook (hash) {
			const facebookToken = hash.get('#access_token')
			if (facebookToken) {
				// const url = 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email'
				// const headers = {
				// 	Authorization: `Bearer ${facebookToken}`
				// }
        /* ******************************
          En lugar del código de arriba pueden usar $this.auth y revisar la info que el provider ya provee.
          para el access token pueden revisar el objeto $storage
          $nuxt.$auth.$storage._state
          Util para cuando no tengan el token en la url. 
        *********************************/
				const { data: res } = await this.$axios.get(url, { headers })
				this.updateUserData(res)
        // Mezclar dos procesos de autenticación no me parece una buena idea.
        // No entiendo el caso de uso, pero recomiendo no hacerlo.
				await this.$auth.loginWith('local', { data: this.userData })
				this.$router.push('/objetivos')
			} else {
				console.log('No hay token de facebook')
			}
		},
```

De acuerdo al código de arriba con las siguientes modificaciones me funciona correctamente y me redirige a la sección
de objetivos.

```js
    loginWithFacebook (hash) {
      const facebookToken = hash.get('#access_token')
      if (facebookToken) {
        // No entiendo el objetivo de esto, pero nuevamente mi recomendacion
        // es que siempre obtengan los datos del $auth object.
        // Si necesitan información adicional que no viene del provider
        // creo que lo mejor es crear otro objeto en el store.
				const headers = {
					Authorization: $nuxt.$auth.$storage._state['_token.facebook'] 
				}
        const { data: res } = await this.$axios.get(url, { headers })
				this.updateUserData(res)
        this.$router.push('/objetivos')
      } else {
        console.log('No hay token de facebook')
      }
    },
```

4. La verificación anterior la están realizando en el lado del cliente, especificamente en el mounted. Creo que deberían aprovechar nuxt para esto y hacer esa verificación en el lado del servidor. Si por alguna razón igual necesitan hacerlo en el lado del cliente está bien. Esto aplica para todo, cualquier carga inicial es mejor hacerlo en el lado del servidor en la medida de lo posible.

5. Para la parte de google es igual ya que ambos providers trabajan sobre OAuth no se debe hacer ningún cambio adicional a menos que por negocio ustedes deseen agregar llamados extras a su servidor pueden usar el objeto $auth
para acceder a la data que google te da luego del login.

```js
// Google no siempre retorna el hash en la url así que no es del todo seguro
// confiarse de eso, en este caso con el siguiente código pude acceder a la aplicación
// sin problemas.
		loginWithGoogle (hash) {
			this.$router.push('/objetivos')
		},
```

### Demo

[Login con Facebook](https://user-images.githubusercontent.com/461124/122651431-5e761680-d0fe-11eb-96a4-8bca92b94ea7.mp4)

[Login con Google](https://user-images.githubusercontent.com/461124/122651434-62099d80-d0fe-11eb-86ae-22299aff9c42.mp4)


###### Que sad que ahora usen espacios en lugar de tabs y ya no agreguen punto y coma al final. Pensé que me querían 😢.