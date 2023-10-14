import puppeteer from "puppeteer";

const getTeams = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://www.basketball-reference.com/leagues/NBA_2023_standings.html", {
    waitUntil: "domcontentloaded",
  });

  const teams = await page.evaluate(() => {
    // East Conference
    const teamEastList = document.querySelectorAll("table#confs_standings_E tbody tr");

    // West Conference
    const teamWestList = document.querySelectorAll("table#confs_standings_W tbody tr");

    // Combine data from both conferences
    const combinedData = [];

    for (let i = 0; i < teamEastList.length; i++) {
      const teamEast = teamEastList[i];
      const teamWest = teamWestList[i];

      const teamEastName = teamEast.querySelector("th[data-stat='team_name'] a")?.innerText || "N/A";
      const winsEast = teamEast.querySelector("td[data-stat='wins']")?.innerText || "N/A";
      const lossesEast = teamEast.querySelector("td[data-stat='losses']")?.innerText || "N/A";
      const winLossEast = teamEast.querySelector("td[data-stat='win_loss_pct']")?.innerText || "N/A";

      const teamWestName = teamWest.querySelector("th[data-stat='team_name'] a")?.innerText || "N/A";
      const winsWest = teamWest.querySelector("td[data-stat='wins']")?.innerText || "N/A";
      const lossesWest = teamWest.querySelector("td[data-stat='losses']")?.innerText || "N/A";
      const winLossWest = teamWest.querySelector("td[data-stat='win_loss_pct']")?.innerText || "N/A";

      combinedData.push({ 
        teamEastName, 
        winsEast, 
        lossesEast, 
        winLossEast,
        teamWestName, 
        winsWest, 
        lossesWest, 
        winLossWest, 
      });
    }

    return combinedData;
  });

  console.log(teams);

  // tried to get the page to stop quitting
  await new Promise(resolve => setTimeout(resolve, 10000));

  await browser.close();
};

// Start the scraping
getTeams();