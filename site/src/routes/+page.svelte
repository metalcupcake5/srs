<script lang="ts">
    import DefaultSim from "$lib/sims/DefaultSim.svelte";
    import NoSpeedBoots from "$lib/sims/NoSpeedBoots.svelte"
    import TestSim from "$lib/sims/TestSim.svelte";
    

    let currentTab = 0;
    let tabs = [
        {
            title: "baseline",
            component: DefaultSim,
        },
        {
            title: "qq no speed boots",
            component: NoSpeedBoots,
        },
        {
            title: "test",
            component: TestSim,
        },
    ];
</script>

<h1>TODO WEAKNESS BREAK, SW BUGS</h1>

<div class="main">
    <h1>Sparkle Calcs</h1>
    <span>general assumptions</span>
    <ul>
        <li>level 80 characters, max level skills/traces</li>
        <li>subs: 24 fixed, 24 fluid</li>
        <li>mono quantum team with qq, sw, fx</li>
        <li>1 level 95 enemy at 158.4 speed</li>
        <li>enemies not initially weak to quantum</li>
        <li>no energy gain from enemies</li>
    </ul>
    <span>character assumptions</span>
    <ul>
        <li>sparkle</li>
        <ul>
            <li>always targets qq with skill</li>
            <li>ults when available</li>
        </ul>
        <li>qingque</li>
        <ul>
            <li>4pc genius, peaceful day s1</li>
            <li>qq always takes 3 skills to get hidden hand</li>
            <li>qq skills until hidden hand or no more skill points</li>
            <li>qq ult used immedately after skill if available</li>
        </ul>
        <li>silver wolf</li>
        <ul>
            <li>always implants when needed</li>
            <li>ult is considered negligible damage</li>
        </ul>
        <li>fu xuan</li>
        <ul>
            <li>skills enough to keep matrix uptime</li>
            <li>ult is considered negligible damage and is not used</li>
        </ul>
    </ul>
</div>

<div class="tabs">
    <div class="tabs-header">
        {#each tabs as t, i}
            <div
                class="tab"
                class:active={i == currentTab}
                on:click={() => (currentTab = i)}>
                {t.title}
            </div>
        {/each}
    </div>

    <div class="tab-content">
        <svelte:component this={tabs[currentTab].component}></svelte:component>
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
    }

    .tabs {
        display: flex;
        flex-direction: column;
        margin: 0 2.5em;
    }

    .tabs-header {
        display: flex;
        flex-direction: row;
    }

    .tab {
        cursor: pointer;
        padding: 5px 30px;
        border-top: 0;
        border: 0.5px solid transparent;
        border-radius: 5px 5px 0 0;
    }

    .tab:hover {
        border-color: grey;
    }

    .active {
        background-color: grey;
        border-color: grey;
        border-radius: 5px 5px 0 0;
    }

    .tab-content {
        border: 0.5px solid grey;
        padding: 10px;
    }
</style>
