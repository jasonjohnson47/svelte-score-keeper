<script lang="ts">

    import { onMount } from 'svelte';

    export let id: string = '';
    export let label: string = '';
    export let type: string = '';
    export let value: string = '';
    
    let input: HTMLInputElement;

    $: containerClasses = ['floating-label'];
    $: containerClass = containerClasses.join(' ');

    onMount(async () => {

        // Make the label float when the field is focused
        input.addEventListener('focusin', function() {
            containerClasses = ['floating-label', 'has-focus', 'is-floating'];
        });

        // Move the label back on blur/focusout, but only if the field is empty
        input.addEventListener('focusout', function() {
            containerClasses = containerClasses.filter((containerClass) => {
                return containerClass !== 'has-focus';
            });
            if (input.value === '' || input.value === null) {
                containerClasses = containerClasses.filter((containerClass) => {
                    return containerClass !== 'is-floating';
                });
            }
        });

	});
</script>

<div class={containerClass}>
    <label for={id}>{label}</label>
    <input
        type={type}
        id={id}
        value={value}
        bind:this={input}
    >
</div>

<style>
    .floating-label {
        position: relative;
    }
    .floating-label input {
        font-size: 1.125rem;
        color: #d4d9de;
        line-height: 2;
        width:100%;
        padding:0.625rem 1.5rem;
        border: 1px solid #fff;
        border-radius: 1.8125rem / 50%;
        background-color: transparent;
        margin-bottom: 15px;
    }
    .floating-label.has-focus input {
        box-shadow: 0 0 0 2px #fff, 0 0 7px 0 rgba(0,0,0,0.2);
        outline: 0 none;
    }
    .floating-label label {
        position: absolute;
        left: 1.5rem;
        top: 1rem;
        font-size: 1.125rem;
        color: #d4d9de;
        pointer-events: none;
        background-color: transparent;
        transition: all .3s ease-in-out;
    }
    .floating-label.is-floating label {
        top: 0.25rem;
        font-size: 0.6875rem;
        color: #d4d9de;
        text-transform: uppercase;
        line-height: 1.2;
    }
</style>