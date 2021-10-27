<h1>Edit Round 1</h1>

<form action="">
    <table>
        <thead>
            <tr>
                <th scope="col">Player</th>
                <th scope="col">Score</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row"><label for="score-0">Abby</label></th>
                <td>
                    <input type="text" id="score-0" name="score-0" value="10" aria-describedby="score-0-description">
                    <span id="score-0-description" class="sr-only">Abby's Score</span>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="score-1">Jason</label></th>
                <td>
                    <input type="text" id="score-1" name="score-1" value="5" aria-describedby="score-1-description">
                    <span id="score-1-description" class="sr-only">Jason's Score</span>
                </td>
            </tr>
        </tbody>
    </table>
    <div>
        <button type="submit">Cancel</button>
        <button type="submit">Update Round</button>
    </div>
</form>
