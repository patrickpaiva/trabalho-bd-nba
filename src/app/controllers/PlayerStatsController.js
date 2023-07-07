const PlayerStats = require('../models/PlayerStats')

module.exports = {
    async show(req, res) {
        try {
            let playerStats = await PlayerStats.findByPlayerId(req.params.id)

            if (!playerStats) {
                return res.redirect('/not-found')
            }
      
            return res.render("public/player-stats", { playerStats })
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    },
    async searchPlayer(req, res) {
        try {
            const { search } = req.query
            let players = await PlayerStats.findPlayer(search)

            if (!players) {
                return res.redirect('/not-found')
            }
      
            return res.render("public/select-player", { players })
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    },
    async moreThanHundredSeasons(req, res) {
        try {
            let teams = await PlayerStats.moreThanHundredSeasons()

            if (!teams) {
                return res.redirect('/not-found')
            }
      
            return res.render("public/more-than-hundred-seasons", { teams })
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    },
    async moreThanThirtySeasons(req, res) {
        try {
            let players = await PlayerStats.moreThanThirtySeasons()

            if (!players) {
                return res.redirect('/not-found')
            }
      
            return res.render("public/more-than-thirty-seasons", { players })
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    },
    async bestPlayers(req, res) {
        try {
            let players = await PlayerStats.bestPlayers()

            if (!players) {
                return res.redirect('/not-found')
            }
      
            return res.render("public/best-players", { players })
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    },
    async bestTeams(req, res) {
        try {
            let teams = await PlayerStats.bestTeams()

            if (!teams) {
                return res.redirect('/not-found')
            }
      
            return res.render("public/best-teams", { teams })
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    },
    async index(req, res) {
        try {
            return res.render("public/index")
        }
        catch (error) {
            console.error(error)
            return res.redirect('/error')
        }
    }
}