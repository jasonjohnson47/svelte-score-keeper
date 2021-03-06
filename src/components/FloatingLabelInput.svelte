<svelte:options accessors={true}/>

<script lang="ts">

    import { onMount, afterUpdate } from 'svelte';
    
    export let id: string = '';
    export let label: string = '';
    export let type: string = 'text';
    export let value: string = '';
    export let min = null;
    export let ariaDescribedby = null;
    export let required = null;
    export let hasError = null;
    export let errorMsg = null;

    let input: HTMLInputElement;

    $: containerClasses = ['floating-label'];
    $: containerClass = containerClasses.join(' ');

    onMount(() => {

        if (value != null) {
            containerClasses = ['floating-label', 'is-floating'];
        }

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

    afterUpdate(() => {
        if (hasError) {
            ariaDescribedby = 'error-message-' + id;
            if (!containerClasses.includes('has-error')) {
                containerClasses = [...containerClasses, 'has-error'];
            }
        } else {
            containerClasses = containerClasses.filter((containerClass) => {
                return containerClass !== 'has-error';
            });
        }
    });

    const handleInput = (e) => {
        // in here, you can switch on type and implement whatever behavior you need
        value = type.match(/^(number|range)$/)
        ? +e.target.value
        : e.target.value;
    };
</script>

<div class={containerClass}>
    <label for={id}>{label}</label>
    <input
        {type} {id} {value} {min}
        aria-required={required}
        aria-describedby="{ariaDescribedby}"
        data-errorMsg={errorMsg}
        data-error={hasError}
        bind:this={input}
        on:input={handleInput}
    >
    {#if hasError}
        <span id="error-message-{id}" class="error-message" role="alert">{errorMsg}</span>
    {/if}
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
        padding:0.875rem 1.5rem 0.375rem 1.5rem;
        border: 1px solid #34393e;
        border-radius: 1.8125rem / 50%;
        background-color: rgba(255,255,255,0.025);
        margin-bottom: 15px;
        box-shadow: inset 0 4px 0 0 rgba(0,0,0,0.25);
    }
    .floating-label.has-focus input {
        /*border-color: #94999e;*/
        border-color: #bacc4c;
        outline: 0 none;
    }
    .floating-label.has-error input {
        border-color: #f97583;
    }
    .error-message {
        font-size:0.875rem;
        font-weight: 400;
        margin-left:1rem;
        position:relative;
        top:-0.75em;
    }
    .floating-label label {
        position: absolute;
        left: 1.5rem;
        top: 1rem;
        font-size: 1.125rem;
        color: #94999e;
        pointer-events: none;
        background-color: transparent;
        transition: all .3s ease-in-out;
    }
    .floating-label.is-floating label {
        top: 0.4375rem;
        font-size: 0.6875rem;
        text-transform: uppercase;
        line-height: 1.2;
    }
</style>