<script context="module">
    export async function load({session, }) {
        if(!session.authenticated) {
            return {
                status: 302,
                redirect: '/auth/unauthorized'
            }
        }
        return {
            props: {
                email: session.email
            }
        }
    }
</script>

<script>
    import { onMount } from "svelte";
    let name
    export let email
    onMount(async () => {
		const res = await fetch(`/user`);
		const user = await res.json();
        name = user.name
	});
</script>

<h1>Profile Page</h1>

<p>Welcome to your profile {name}! We got your email from the session, it should be {email} is that correct?</p>