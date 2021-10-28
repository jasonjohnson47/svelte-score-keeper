<h1>Round 1</h1>
<div>
    <a href="#history">View Scoring History</a>
    <a href="#game-setup">Start New Game</a>
</div>
<form action="">
    <section>
        <h2>Score Card</h2>
        <ul>
            <li>
                <dl>
                    <dt>Abby <span class="sr-only">score</span></dt>
                    <dd>0</dd>
                </dl>
                <div role="group" aria-label="points this round">
                    <fieldset>
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input type="radio" id="add-0" name="add-0" value="add">
                            <label for="add-0">Add</label>
                        </div>
                        <div>
                            <input type="radio" id="subtract-0" name="subtract-0" value="subtract">
                            <label for="subtract-0">Subtract</label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="points-0">Points</label>
                        <input type="text" id="points-0" name="points-0" value="">
                    </div>
                </div>
            </li>
            <li>
                <dl>
                    <dt>Jason <span class="sr-only">score</span></dt>
                    <dd>0</dd>
                </dl>
                <div role="group" aria-label="points this round">
                    <fieldset>
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input type="radio" id="add-1" name="add-1" value="add">
                            <label for="add-1">Add</label>
                        </div>
                        <div>
                            <input type="radio" id="subtract-1" name="subtract-1" value="subtract">
                            <label for="subtract-1">Subtract</label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="points-1">Points</label>
                        <input type="text" id="points-1" name="points-1" value="">
                    </div>
                </div>
            </li>
        </ul>
    </section>

    <!--<table>
        <caption>Score Card</caption>
        <thead>
            <tr>
                <th scope="col">Player</th>
                <th scope="col">Current Score</th>
                <th scope="col">Points This Round</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Abby</th>
                <td>0</td>
                <td>
                    <fieldset>
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input type="radio" id="add-0" name="add-0" value="add">
                            <label for="add-0">Add</label>
                        </div>
                        <div>
                            <input type="radio" id="subtract-0" name="subtract-0" value="subtract">
                            <label for="subtract-0">Subtract</label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="points-0"></label>
                        <input type="text" id="points-0" name="points-0" value="">
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row">Jason</th>
                <td>0</td>
                <td>
                    <fieldset>
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input type="radio" id="add-1" name="add-1" value="add">
                            <label for="add-1">Add</label>
                        </div>
                        <div>
                            <input type="radio" id="subtract-1" name="subtract-1" value="subtract">
                            <label for="subtract-1">Subtract</label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="points-1"></label>
                        <input type="text" id="points-1" name="points-1" value="">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>-->
    <div>
        <button type="submit">Submit Round</button>
    </div>
</form>
