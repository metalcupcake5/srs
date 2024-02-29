<script lang="ts">
    import Modal from "$lib/Modal.svelte";

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

    let game = new Game([new Enemy("enemy", 158.4)]);

    const fx = new FuXuan(
        new SheAlreadyShutHerEyes(),
        {
            percentHealth: 12,
            percentDefense: 6,
            speed: 6,
        },
        [],
        game
    );

    const qq = new Qingque(
        new TodayIsAnotherPeacefulDay(),
        {
            // percentAttack: 3,
            speed: 1,
            critRate: 10,
            critDamage: 12,
        },
        [new Genius(4), new Rutilant()],
        true
    );

    const sparkle = new Sparkle(
        new EarthlyEscapede(),
        {
            speed: 7,
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

    let showAttackModal = false;
    let showStatModal = false;
    let displayedAttack: Attack | null = null;
    let displayedStats: {
        stats?: Stats;
        effects?: any[];
    } = {};
</script>

<span>test</span><br />

{#each game.players.sort((a, b) => a.stats.speed - b.stats.speed) as p}
    <span>{p.name}: {p.stats.speed} speed</span><br />
{/each}
<div class="container">
    <table>
        <tr>
            <th>av</th>
            <th>actor</th>
            <th>action</th>
            <th>damage</th>
            <th>sp</th>
            <th>energy</th>
        </tr>
        {#each game.actions as a}
            <tr>
                <td>{Math.floor(a.av * 100) / 100}</td>
                <td
                    class="clickable"
                    on:click={() => {
                        showStatModal = true;
                        displayedStats = {
                            stats: a?.stats,
                            effects: a?.effects,
                        };
                    }}>{a.name}</td>
                <td>{a.action}</td>
                {#if a.attack}
                    <td
                        class="clickable"
                        on:click={() => {
                            showAttackModal = true;
                            displayedAttack = a.attack;
                        }}>
                        {a.damage || "n/a"}
                    </td>
                {:else}
                    <td>n/a</td>
                {/if}
                <td>{a.skillPoints}</td>
                <td>{a.energy}</td>
            </tr>
        {/each}
    </table>
    <div class="stats">
        <span>qq</span>
        <span>total damage: {qq.getTotalDamage().total}</span>
        <span>
            basic damage: {qq.getTotalDamage().basic} ({Math.floor(
                (qq.getTotalDamage().basic / qq.getTotalDamage().total) * 1000
            ) / 1000})
        </span>
        <span>
            ult damage: {qq.getTotalDamage().ult} ({Math.floor(
                (qq.getTotalDamage().ult / qq.getTotalDamage().total) * 100
            ) / 100})
        </span>
    </div>
</div>

<Modal bind:showModal={showAttackModal}>
    <h2 slot="header">Attack Breakdown</h2>
    <div class="stats">
        <span><b>types</b>: {displayedAttack?.types}</span>
        <span><b>element</b>: {displayedAttack?.element}</span>
        <h3>Modifiers</h3>
        {#if displayedAttack?.modifiers}
            {@const mods = displayedAttack?.modifierTotals()}
            <span>base: {mods.base}</span>
            <span>damage boost: {mods.damage}</span>
            <ul>
                {#each displayedAttack.modifiers.filter((m) => m.type == AttackModifierType.DamageBoost) as mod}
                    <li>{mod.tag}: {mod.value}</li>
                {/each}
            </ul>
            <span>weaken: {mods.weaken}</span>
            <ul>
                {#each displayedAttack.modifiers.filter((m) => m.type == AttackModifierType.Weaken) as mod}
                    <li>{mod.tag}: {mod.value}</li>
                {/each}
            </ul>
            <span>def multiplier: {mods.defMultiplier}</span>
            <ul>
                {#each displayedAttack.modifiers.filter((m) => m.type == AttackModifierType.DefenseDown) as mod}
                    <li>{mod.tag}: {mod.value}</li>
                {/each}
            </ul>
            <span>resistance: {mods.resistance}</span>
            <ul>
                {#each displayedAttack.modifiers.filter((m) => m.type == AttackModifierType.Resistance || m.type == AttackModifierType.ResistanceReduction) as mod}
                    <li>
                        {mod.tag}: {mod.type == AttackModifierType.Resistance
                            ? "-"
                            : ""}{mod.value}
                    </li>
                {/each}
            </ul>
            <span>vuln: {mods.vulnerability}</span>
            <ul>
                {#each displayedAttack.modifiers.filter((m) => m.type == AttackModifierType.Vulnerability) as mod}
                    <li>{mod.tag}: {mod.value}</li>
                {/each}
            </ul>
            <span>dmg reduction: {mods.damageReduction}</span>
            <ul>
                {#each displayedAttack.modifiers.filter((m) => m.type == AttackModifierType.DamageReduction) as mod}
                    <li>{mod.tag}: -{mod.value}</li>
                {/each}
            </ul>
        {/if}
    </div>
</Modal>

<Modal bind:showModal={showStatModal}>
    <h2 slot="header">Character Info</h2>
    <div class="stats">
        {#if displayedStats.stats}
            <span><b>atk</b>: {displayedStats?.stats.totalAttack()}</span>
            <span>
                <b>cr</b>:
                {Math.floor(displayedStats?.stats.critRate * 10000) / 100}%
            </span>
            <span>
                <b>cd</b>:
                {Math.floor(displayedStats?.stats.critDamage * 10000) / 100}%
            </span>
        {/if}
        <h3>Effects</h3>
        {#if displayedStats.effects}
            {#each displayedStats?.effects as e}
                <span>
                    {e.name}: {e.duration} turns remaining ({e.stacks} stacks) (ticks
                    down {e.tickDownTime == 0 ? "before turn" : "after turn"})
                </span>
            {/each}
        {/if}
    </div>
</Modal>

<style>
    table {
        width: 50%;
        text-align: center;
    }

    .container {
        display: flex;
        gap: 20px;
    }

    .stats {
        display: flex;
        flex-direction: column;
    }

    .clickable {
        cursor: pointer;
    }
</style>
