<script lang="ts">

    export let id: string = '';
    export let name: string = '';
    export let group: string = '';

</script>

<fieldset class="add-sub-btn">
    <legend class="sr-only">Add or Subtract</legend>
    <div>
        <input
            type="radio"
            value={'add'}
            id="add-{id}"
            {name}
            bind:group={group}
        >
        <label for="add-{id}" class="btn btn-secondary" aria-label="currently adding, click to subtract"><span>-</span></label>
    </div>
    <div>
        <input
            type="radio"
            value={'subtract'}
            id="subtract-{id}"
            {name}
            bind:group={group}
        >
        <label for="subtract-{id}" class="btn btn-secondary" aria-label="currently subtracting, click to add"><span>+</span></label>
    </div>
</fieldset>

<style>
    .add-sub-btn {
        padding: 0;
        border: 0 none;
        margin: 0;
    }
    .add-sub-btn input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
    }
    .add-sub-btn label {
        /* undo sr-only */
        position: static;
        width: auto;
        min-width: 1.375rem;
        height: auto;
        padding: 0.6875rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: nowrap;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 1.8125rem / 50%;
    }
    .add-sub-btn label span {
        display: inline-block;
        min-width: 1.5rem;
        font-size: 1.625rem;
        line-height: 2.125rem;
        margin-left:5px;
        margin-right:5px;
    }
    .add-sub-btn :checked + label {
        /* sr-only */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    .add-sub-btn:focus-within label {
        background-color: #d4d9de;
        border-color: #fff;
        color: #212529;
        box-shadow: 0 0 0 0.1875rem rgba(255, 255, 255, 0.33) !important;
    }
</style>