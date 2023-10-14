import puppeteer from "puppeteer";

const getTeamLinks = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://www.basketball-reference.com/leagues/NBA_2023_standings.html", {
    waitUntil: "domcontentloaded",
  });

  const teamLinks = await page.evaluate(() => {
    // East Conference
    const teamEastList = document.querySelectorAll("table#confs_standings_E tbody tr");
    // West Conference
    const teamWestList = document.querySelectorAll("table#confs_standings_W tbody tr");

    const links = [];

    // for loop to bring back each team link
    teamEastList.forEach((team) => {
      const teamEastLink = team.querySelector("th[data-stat='team_name'] a");
      if (teamEastLink) {
        links.push(teamEastLink.href);
      }
    });

    teamWestList.forEach((team) => {
      const teamWestLink = team.querySelector("th[data-stat='team_name'] a");
      if (teamWestLink) {
        links.push(teamWestLink.href);
      }
    });

    return links;
  });

  console.log(teamLinks);

  await new Promise(resolve => setTimeout(resolve, 10000));

  await browser.close();
};

// Start the scraping
getTeamLinks();








