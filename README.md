# Project0 / Project0-AI
Simple online game of Noughts & Crosses, either two player or human vs. computer (easy version).

## Get it running:
* Open in your browser using: https://katshaze.github.io/project0
* The page has a link to the AI (Easy) version, but if you're specifically looking for the AI version, it's here: https://katshaze.github.io/project0-AI
* (Tested browsers so far include Chrome, Firefox & Safari)

## Built with:
* JavaScript (& jQuery)
* HTML & CSS

## Game features include:
* Alternating starting player
* Winner of each game displayed on screen (inc. special effects)
* Wins tallied (until a screen refresh)
* Reset button plus click anywhere reset function each time a game ends
* Play against the computer (easy) version (the two versions are separate web pages with a button linking them)

## Extra snazzy bits
* Blowfish puffs up for a win.

## Problematic bits
* Winning combinations are a bit hardcoded; not very efficient for scaling into a larger board.
* Updates to style & functionality involve updating both versions since they've been separated, causing extra work

## Code approach and structure
* The approach was to separate the javascript containing the game logic and 'state of play', from the javascript interacting with the DOM and rendering the state of play onscreen following refresh.
* This approach was maintained when modifying the code to create the human vs. computer version.

## TODO
* Players to be able to choose their icons
* Link two player and AI version into single webpage
* Maaaaaybe have a crack at creating an AI (hard) version
* Expand to a 4x4 board for a 'Connect Four'-style game

## Licensing

Dual licensed under the MIT and GPL licenses.

## Thanks to

Joel Turnbull, the WDi26 instruction team (John and Theo), and my classmates, for help with approach and debugging.
