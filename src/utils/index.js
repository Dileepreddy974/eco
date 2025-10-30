export const createPageUrl = (pageName) => {
  const pageRoutes = {
    Dashboard: '/',
    Tasks: '/tasks',
    Leaderboard: '/leaderboard',
    Learn: '/learn',
    Profile: '/profile'
  };
  
  return pageRoutes[pageName] || '/';
};