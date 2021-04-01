<script>
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  let email
  let password
  
  async function login() {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(res.ok) {
        dispatch('success');
      }
    } catch(err) {
      console.log(err)
    }
  }
</script>
<h1>Login</h1>
<input type="email" bind:value={email} placeholder="Enter your email"/>
<input type="password" bind:value={password} placeholder="Enter your password"/>
<button on:click={login}>Login</button>