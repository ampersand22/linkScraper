import puppeteer from "puppeteer";

const getTeams = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "{url}" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.basketball-reference.com/leagues/NBA_2023_standings.html", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const teams = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    const teamList = document.querySelectorAll("table#confs_standings_E tbody tr");

    // Convert the teamList to an iterable array
    //
    return Array.from(teamList).map((team) => {
      const teamName = team.querySelector("th[data-stat='team_name'] a")?.innerText || "N/A";
      const wins = team.querySelector("td[data-stat='wins']")?.innerText || "N/A";
      const losses = team.querySelector("td[data-stat='losses']")?.innerText || "N/A";
      const winLoss = team.querySelector("td[data-stat='win_loss_pct']")?.innerText || "N/A";
      // const gamesBack = team.querySelector("td[data-stat='gb']")?.innerText || "N/A";

      return { teamName, wins, losses, winLoss };
    });
  });

  // Display the quotes
  console.log(teams);

  await new Promise(resolve => setTimeout(resolve, 10000));

  // Close the browser
  await browser.close();
};

// Start the scraping
getTeams();
