<script lang="ts">
    import { Sparkle } from "$lib/sim/characters/Sparkle";
    import { Game } from "$lib/sim/system/Game";
    import { Penacony } from "$lib/sim/relics/planars/Penacony";
    import { Element } from "$lib/sim/system/Character";
    import { EarthlyEscapede } from "$lib/sim/lightcones/harmony/EarthlyEscapade";

    let game = new Game([]);

    const sparkle = new Sparkle(
        new EarthlyEscapede(),
        {
            speed: 7,
            critDamage: 10,
        },
        [new Penacony(Element.Quantum)],
    );

    game.addCharacter(sparkle);

    game.run();
</script>

<span>energy calcs</span><br />

{#each game.players.sort((a, b) => a.stats.speed - b.stats.speed) as p}
    <span>{p.name}: {p.stats.speed} speed</span><br />
{/each}
<div class="container">
    <table>
        <tr>
            <th>actor</th>
            <th>action</th>
            <th>energy</th>
        </tr>
        {#each game.actions.filter((a) => a.name == "Sparkle") as a}
            <tr>
                <td>{a.name}</td>
                <td>{a.action}</td>
                <td>{Math.floor(a.energy * 100) / 100}</td>
            </tr>
        {/each}
    </table>
</div>

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
