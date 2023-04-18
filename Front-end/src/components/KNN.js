/**
 * this function is used to recommend plants based on
 * the weather and the user's posts
 * it uses the KNN algorithm to find the nearest neighbors
 * @param {*} posts
 * @param {*} weather
 * @returns recommended plants
 *
 */

const Recommender = (posts, weather) => {
  const results = posts
    .filter((post) => {
      if (post.optimal_temperature.min <= weather.main.temp) {
        if (post.optimal_temperature.max >= weather.main.temp) {
          return true;
        }
      }
    })
    .map((post) => {
      return { rank: 0, ...post };
    })
    .map((post) => {
      switch (post.water_needs) {
        case "low":
          post.rank += 4;
          break;
        case "low to moderte":
          post.rank += 3;
          break;
        case "moderte":
          post.rank += 2;
          break;
        case "High":
          post.rank += 1;
          break;
      }
      switch (post.sun_needs) {
        case "partiDal shade":
          post.rank += 4;
          break;
        case "partial shade to full sun":
          post.rank += 3;
          break;
        case "full sun to partial shade":
          post.rank += 2;
          break;
        case "full sun":
          post.rank += 1;
          break;
      }
      return post;
    })
    .sort((a, b) => b.rank - a.rank);
  return results;
};
export default Recommender;
