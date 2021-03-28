<script>
import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  let email
  let password
  
  async function register() {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        body: {
          email,
          password
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
<h1>Register</h1>
<input type="email" bind:value={email} placeholder="Enter your email"/>
<input type="password" bind:value={password} placeholder="Enter your password"/>
<button on:click={register}>Register</button>