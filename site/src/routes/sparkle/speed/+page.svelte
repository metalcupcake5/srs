<script lang="ts">
    import { Attack } from "$lib/sim/system/attacks/Attack";
    import { Enemy } from "$lib/sim/system/Enemy";
    import { FuXuan } from "$lib/sim/characters/FuXuan";
    import { SheAlreadyShutHerEyes } from "$lib/sim/lightcones/preservation/SheAlreadyShutHerEyes";
    import { Qingque } from "$lib/sim/characters/Qingque";
    import { Rutilant } from "$lib/sim/relics/planars/Rutilant";
    import { Genius } from "$lib/sim/relics/relic_sets/Genius";
    import { AttackModifierType } from "$lib/sim/system/attacks/AttackModifier";
    import { Sparkle } from "$lib/sim/characters/Sparkle";
    import { Game } from "$lib/sim/system/Game";
    import type { Stats } from "$lib/sim/system/Stats";
    import { SilverWolf } from "$lib/sim/characters/SilverWolf";
    import { Penacony } from "$lib/sim/relics/planars/Penacony";
    import { Element } from "$lib/sim/system/Character";
    import { TodayIsAnotherPeacefulDay } from "$lib/sim/lightcones/erudition/TodayIsAnotherPeacefulDay";
    import { EarthlyEscapede } from "$lib/sim/lightcones/harmony/EarthlyEscapade";
    import { Tutorial } from "$lib/sim/lightcones/nihility/Tutorial";

    let games = [];

    let combinations = [];

    for (let speed = 1; speed < 11; speed++) {
        for (let critRate = 1; critRate < 11; critRate++) {
            for (let critDamage = 1; critDamage < 11; critDamage++) {
                if (speed + critRate + critDamage <= 24) {
                    combinations.push({
                        speed: speed,
                        critRate: critRate,
                        critDamage: critDamage,
                    });
                }
            }
        }
    }

    for (let sparkleSpeedSubs = 0; sparkleSpeedSubs < 10; sparkleSpeedSubs++) {
        for (let combo of combinations) {
            let game = new Game([new Enemy("enemy", 158.4)]);

            const fx = new FuXuan(
                new SheAlreadyShutHerEyes(),
                {
                    percentHealth: 10,
                    percentDefense: 6,
                    speed: 6,
                },
                [],
                game
            );

            const qq = new Qingque(
                new TodayIsAnotherPeacefulDay(),
                {
                    speed: combo.speed,
                    critRate: combo.critRate,
                    critDamage: combo.critDamage,
                },
                [new Genius(4), new Rutilant()],
                true
            );

            const sparkle = new Sparkle(
                new EarthlyEscapede(),
                {
                    speed: sparkleSpeedSubs,
                    critDamage: 10,
                },
                [new Penacony(Element.Quantum)]
            );

            const sw = new SilverWolf(
                new Tutorial(),
                {
                    speed: 10,
                },
                [new Penacony(Element.Quantum)]
            );

            game.addCharacter(sparkle);
            game.addCharacter(qq);
            game.addCharacter(fx);
            game.addCharacter(sw);

            game.run();

            games.push({
                damage: qq.getTotalDamage(),
                game: game,
                sparkleSpeedSubs: sparkleSpeedSubs,
                qqSubs: combo,
            });
        }
    }

    games.sort((a, b) => a.damage.total - b.damage.total);
</script>

<div class="main">
    <h1>Sparkle/QQ Speed Calcs</h1>
    {#each games as g}
        <div class="game">
            {g.damage.total}
        </div>
    {/each}
</div>

<!-- <div class="tabs">
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
</div> -->

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
