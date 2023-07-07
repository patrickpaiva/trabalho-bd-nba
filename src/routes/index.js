const express = require('express')
const routes = express.Router()
const PlayerStatsController = require('../app/controllers/PlayerStatsController');


routes.get("/playerStats/:id", PlayerStatsController.show)
routes.get("/search", PlayerStatsController.searchPlayer)
routes.get("/more-than-hundred-seasons", PlayerStatsController.moreThanHundredSeasons)
routes.get("/more-than-thirty-seasons", PlayerStatsController.moreThanThirtySeasons)
routes.get("/best-players", PlayerStatsController.bestPlayers)
routes.get("/best-teams", PlayerStatsController.bestTeams)
routes.get("/", PlayerStatsController.index)


module.exports = routes
